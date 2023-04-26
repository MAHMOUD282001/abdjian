import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";
import useHttp from "../../hook/use-http";

const About = () => {
  const { t, i18n } = useTranslation();
  
  const { isLoading, error, requestFn } = useHttp();
  const getAboutApi = `https://adminpanel.hyperfinition.com/api/public/about_us`;
  const [aboutData, setAboutData] = useState();
  useEffect(() => {
    const transformData = (data) => {
      setAboutData(data.data);
    };
    requestFn(
      {
        url: getAboutApi,
      },
      transformData
    );
  }, [requestFn, getAboutApi]);

  ///////
  return (
    <div className={styles.about}>
      <div className={styles.aboutHeader}>
        <h2 className="fw-bold">{t(["about.mainTitle"])}</h2>
      </div>
      <div className={styles.whoWeAre}>
        <Container className="">
          <h1 className="text-center mb-4">{aboutData?.name}</h1>
          <Row className="d-flex align-items-center">
            <Col md={12} lg="7">
              <p className={`${styles.firstP}`}>
                <span>Abdjan.com</span> {aboutData?.description}
              </p>
            </Col>
            <Col
              md={12}
              lg="5"
              className={`${styles.officeImg} d-none d-lg-block `}
            >
              <img src={aboutData?.image} alt="about Img"/>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
