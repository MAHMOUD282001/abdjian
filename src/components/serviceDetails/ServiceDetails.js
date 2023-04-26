import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import "./servicedetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

function ServiceDetails() {
  let { serviceId } = useParams();
  
  const { t, i18n } = useTranslation();
  
  
  const { isLoading, error, requestFn } = useHttp();
  const getServiceApi = `https://adminpanel.hyperfinition.com/api/public/services/${serviceId}`;
  const [service, setService] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setService(data.data);
    };
    requestFn(
      {
        url: getServiceApi,
      },
      transformData
    );
  }, [requestFn, getServiceApi]);

  return (
    <div className="service-details">
      <Container>
        <h2 className="mt-5 mb-5">{service ? service.name : ""}</h2>
        <Row className="mb-3 d-flex align-items-center">
          {service ? (
            <>
              <Col lg="6">
                <div className="details-img">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                      delay: 5000,
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
                    {service.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="w-100 home-img"
                          src={img}
                          alt="Product Img"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Col>
              <Col>
                <div className="details-service">
                  <p>
                    <span>{t(["serviceDetails.name"])}:</span> {service.name}
                  </p>
                  <p>
                    <span>{t(["serviceDetails.phone"])}:</span> {service.phone}
                  </p>
                  <p>
                    <span>{t(["serviceDetails.price"])}:</span> {service.price}
                  </p>
                  <p>
                    <span>{t(["serviceDetails.categoryName"])}:</span> {service.category_name}
                  </p>
                  <p>
                    <span>{t(["serviceDetails.description"])}:</span> {service.description}
                  </p>
                </div>
              </Col>
            </>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </div>
  );
}

export default ServiceDetails;
