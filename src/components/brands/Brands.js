import React, { useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import styles from "./Brands.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Brands = ({ dataFlag }) => {
  const { t, i18n } = useTranslation();

  const { isLoading, error, requestFn } = useHttp();
  const getBrandsApi = `https://adminpanel.hyperfinition.com/api/public/brands`;
  const [brands, setBrands] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setBrands(data.data);
    };
    requestFn(
      {
        url: getBrandsApi,
      },
      transformData
    );
  }, [requestFn, getBrandsApi]);

  let updatedBrands = dataFlag === "latest" ? brands?.slice(-5) : brands;

  return (
    <div className={`${styles.brands}`}>
      
      <Container className={dataFlag === "latest" ? "my-5" : ""}>
        <Row className={styles.heading}>
          <Col lg={12}>
          {dataFlag === "latest" ? (
              <h2>{t(["home.newBrands.title"])}</h2>
            ) : (
              <h2>{t(["brands.mainTitle"])}</h2>
            )}
          </Col>
        </Row>
      </Container>
      
      <Container className={dataFlag !== "latest" ? "my-5" : ""}>
        <div
          className={`d-flex align-items-center justify-content-center flex-wrap mb-4`}
        >
          {brands?.length > 0 ? (
            updatedBrands.map((brand) => (
              <div
                key={brand.id}
                className={`d-flex flex-column align-items-center justify-content-center ${styles.brand}`}
              >
                <img src={brand.image} alt="Brand" />
                <p>{brand.name}</p>
              </div>
            ))
          ) : (
            <Row
              className={`${styles.noBrands} align-items-center justify-content-center fs-3`}
            >
              {t(["home.newBrands.noBrands"])}
            </Row>
          )}
        </div>

        {dataFlag === "latest" ? (
          <NavLink to={`/brands`} className={`d-block mt-3 text-end mb-5`}>
            <button className="common-btn-2">{t(["btns.viewAll"])}</button>
          </NavLink>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default Brands;
