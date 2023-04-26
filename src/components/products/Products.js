import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./products.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useHttp from "../../hook/use-http";
import CommonCard from "../CommonCard/CommonCard";
const Products = ({ dataFlag, api }) => {
  const { t, i18n } = useTranslation();
  ////

  const { isLoading, error, requestFn } = useHttp();
  const getProductssApi = api;
  const [products, setProducts] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setProducts(data.data);
    };
    requestFn(
      {
        url: getProductssApi,
      },
      transformData
    );
  }, [requestFn, getProductssApi]);

  let updatedProducts = dataFlag === "latest" ? products?.slice(-8) : products;

  return (
    <div className={styles.products}>
      <Container className={dataFlag === "latest" ? "my-5" : ""}>
        <Row className={styles.heading}>
          <Col lg={12} className="">
            {dataFlag === "latest" ? (
              <h2>{t(["home.newProducts.title"])}</h2>
            ) : dataFlag === "searched" ? (
              <h2>{t(["search.mainTitle"])}</h2>
            ) : (
              <h2>{t(["products.mainTitle"])}</h2>
            )}
          </Col>
        </Row>
      </Container>
      <Container className={dataFlag !== "latest" ? "my-5" : ""}>
        <Row className="justify-content-center">
          {updatedProducts?.length > 0 ? (
            updatedProducts.map((ele) => (
              <Col
                md={6}
                lg={4}
                xl={4}
                xxl={3}
                className={`px-1 py-1 text-center text-capitalize products`}
                key={ele.id}
              >
                <CommonCard
                  id={ele.id}
                  title={ele.name}
                  price={ele.price}
                  img={ele.img}
                  path={`/products/${ele.id}`}
                />
              </Col>
            ))
          ) : (
            <Row
              className={`${styles.noProducts} align-items-center justify-content-center fs-3`}
            >
              {t(["home.newProducts.noProducts"])}
            </Row>
          )}
        </Row>

        {dataFlag === "latest" ? (
          <NavLink to={`/products`} className={`d-block mt-3 text-end`}>
            <button className="common-btn-2">{t(["btns.viewAll"])}</button>
          </NavLink>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};
export default Products;
