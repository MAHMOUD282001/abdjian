import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import "./productdetails.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ProductDetails() {
  const { t, i18n } = useTranslation();
  let { productId } = useParams();

  const { isLoading, error, requestFn } = useHttp();
  const getProductApi = `https://adminpanel.hyperfinition.com/api/public/products/${productId}`;
  const [product, setProduct] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setProduct(data.data);
    };
    requestFn(
      {
        url: getProductApi,
      },
      transformData
    );
  }, [requestFn, getProductApi]);
  

  return (
    <div className="product-details">
      <Container>
        <h2 className="mt-5 mb-5">
          {product ? product.name : ""}
        </h2>
        <Row className="mb-3 d-flex align-items-center">
          {product ? (
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
                    {product.images.map((img, index) => (
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
                <div className="details-product">
                  <p>
                    <span>{t(["productDetails.name"])}:</span> {product.name}
                  </p>
                  <p>
                    <span>{t(["productDetails.attributeName"])}:</span>{" "}
                    {product.attribute_name}
                  </p>
                  <p>
                    <span>{t(["productDetails.categoryName"])}:</span>{" "}
                    {product.category_name}
                  </p>
                  <p>
                    <span>{t(["productDetails.brandName"])}:</span>{" "}
                    {product.brand_name}
                  </p>
                  <p>
                    <span>{t(["productDetails.unitName"])}:</span>{" "}
                    {product.unit_name}
                  </p>
                  <p>
                    <span>{t(["productDetails.description"])}:</span>{" "}
                    {product.description}
                  </p>
                  <p>
                    <span>{t(["productDetails.quantity"])}:</span>{" "}
                    {product.quantity}
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

export default ProductDetails;
