import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { BsFacebook, BsTwitter, BsGoogle, BsYoutube, BsWhatsapp, BsInstagram } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import useHttp from "../../hook/use-http";
const Footer = () => {
  const { t, i18n } = useTranslation();

  const { isLoading, error, requestFn } = useHttp();
  const getSettingsApi = `https://adminpanel.hyperfinition.com/api/public/settings`;
  const [settingsData, setSettingsData] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setSettingsData(data.data);
    };
    requestFn(
      {
        url: getSettingsApi,
      },
      transformData
    );
  }, [requestFn, getSettingsApi]);

  return (
    <footer className="position-relative bottom-0">
      <Container>
        <Row className="">
          <Col
            lg={6}
            xl={2}
            className={`mb-sm-4 mb-md-4 text-center ${styles.logo}`}
          >
            {/* <div className=""> */}
            <NavLink to={"/"}>
              <img src={logo} alt="logo" />
              {/* <span>A</span>bdjan */}
            </NavLink>
            {/* </div> */}
          </Col>
          <Col lg={6} xl={3} className="d-flex justify-content-evenly">
            <ul className="mt-1 p-0">
              {/* <li className="mb-2">
                <NavLink to={"/categories"}>{t(["footer.links.categories"])}</NavLink>
              </li> */}
              <li className="mb-2">
                <NavLink to={"/products"}>
                  {t(["footer.links.products"])}
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/about"}>{t(["footer.links.about"])}</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/services"}>
                  {t(["footer.links.services"])}
                </NavLink>
              </li>
            </ul>
            <ul className="mt-1 p-0">
              <li className="mb-2">
                <NavLink to={"/brands"}>{t(["footer.links.brands"])}</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/contactUs"}>
                  {t(["footer.links.contact"])}
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col lg={6} xl={4}>
            <p className={`mx-auto ${styles.award}`}>{settingsData?.name}</p>
          </Col>
          <Col lg={6} xl={3} className="text-center">
            <p
              tel=""
              className={styles.phone}
              style={{ direction: i18n.dir === "rtl" ? "ltr" : "ltr" }}
            >
              <span>{settingsData?.phones.split('/')}</span>
            </p>
            <p>{settingsData?.email}</p>
            <address>{settingsData?.address}</address>
          </Col>
        </Row>
        <hr className="my-5"></hr>
        <Row className={`text-center text-md-start ${styles.copyright}`}>
          <Col
            md={6}
            className={`${
              i18n.dir() === "rtl"
                ? "text-center text-md-end"
                : "text-center text-md-start"
            }`}
          >
            <p className="mb-2 mb-md-0 text-break">
              {t(["footer.copyright"])} {new Date().getFullYear()}{" "}
              <span>Dr Code. </span>
              {t(["footer.rights"])}
            </p>
          </Col>
          <Col md={6}>
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-end">
              <li className="me-3">
                <a href={settingsData?.facebook}>
                  <BsFacebook />
                </a>
              </li>
              <li className="me-3">
                <a href={settingsData?.instagram}>
                  <BsInstagram />
                </a>
              </li>
              <li className="me-3">
                <a href={settingsData?.whatsapp}>
                  <BsWhatsapp />
                </a>
              </li>
              <li className="me-3">
                <a href={settingsData?.youtube}>
                  <BsYoutube />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
