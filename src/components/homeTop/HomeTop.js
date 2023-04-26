import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./home-top.css";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useHttp from "../../hook/use-http";
import { Link } from "react-router-dom";

const HomeTop = () => {
  const { t, i18n } = useTranslation();

  const { isLoading, error, requestFn } = useHttp();
  const getAdsApi = `https://adminpanel.hyperfinition.com/api/public/ads`;
  const [ads, setAds] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setAds(data.data);
    };
    requestFn(
      {
        url: getAdsApi,
      },
      transformData
    );
  }, [requestFn, getAdsApi]);

  return (
    <div className="home-top">
      {ads?.length > 0 ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper home"
          style={{ direction: "ltr" }}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <img className="w-100 home-img" src={ad.image} alt="Home Img" />
              <div className="description-content">
                <Container>
                  <p className="office-paragraph">{ad.title}</p>
                  <h1>{ad.discount + t(["home.homeTop.off"])}</h1>
                  <p>{ad.description}</p>
                  <Link to="/products" className="common-btn">
                    {t(["home.homeTop.shopNow"])}
                  </Link>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Row
              className={`no-ads align-items-center justify-content-center fs-3`}
            >
              {t(["home.homeTop.noAds"])}
            </Row>
      )}
    </div>
  );
};

export default HomeTop;
