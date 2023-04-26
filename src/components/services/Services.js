import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./services.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useHttp from "../../hook/use-http";
import CommonCard2 from "../CommonCard2/CommonCard2";
const Services = ({ dataFlag }) => {
  const { t, i18n } = useTranslation();
  ////

  const { isLoading, error, requestFn } = useHttp();
  const getServicesApi = `https://adminpanel.hyperfinition.com/api/public/services`;
  const [services, setServices] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setServices(data.data);
    };
    requestFn(
      {
        url: getServicesApi,
      },
      transformData
    );
  }, [requestFn, getServicesApi]);

  let updatedServices =
    dataFlag === "latest" ? services?.slice(-3) : services;

  return (
    <div className={styles.services}>
      <Container className={dataFlag === "latest" ? "my-5" : ""}>
        <Row className={styles.heading}>
          <Col lg={12} className="">
            {dataFlag === "latest" ? (
              <h2>{t(["home.newServices.title"])}</h2>
            ) : (
              <h2>{t(["services.mainTitle"])}</h2>
            )}
          </Col>
        </Row>
      </Container>
      <Container className={dataFlag !== "latest" ? "my-5" : ""}>
        <Row className="justify-content-center">
          {updatedServices?.length > 0 ? (
            updatedServices.map((ele) => (
              <Col
                md={6}
                lg={4}
                xl={4}
                xxl={3}
                className={`px-1 py-1 text-center text-capitalize products`}
                key={ele.id}
              >
                <CommonCard2
                  id={ele.id}
                  title={ele.name}
                  price={ele.price}
                  img={ele.img}
                  path={`/services/${ele.id}`}
                />
              </Col>
            ))
          ) : (
            <Row
              className={`${styles.noServices} align-items-center justify-content-center fs-3`}
            >
              {t("home.newServices.noServices")}
            </Row>
          )}
        </Row>
        {dataFlag === "latest" ? (
          <NavLink to={`/services`} className={`d-block mt-3 text-end`}>
            <button className="common-btn-2">{t(["btns.viewAll"])}</button>
          </NavLink>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};
export default Services;
