import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./contact.module.css";
import { BiEnvelope } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import useHttp from "../../hook/use-http";
import { toast } from "react-toastify";
const Contact = () => {
  const { t, i18n } = useTranslation();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [message, setMessage] = useState("");

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

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    const postData = `https://adminpanel.hyperfinition.com/api/public/contact`;
    const transformData = (data) => {
      if (data.code === 200) {
        toast.success(t("contact.toastSuccessMessage"));
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        e.target.reset();
      } else {
        toast.error(t("contact.toastErrorMessage"));
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        e.target.reset();
      }
    };

    requestFn(
      {
        url: postData,
        method: "POST",
        body: {
          name: name,
          email: email,
          phone: phone,
          message: message,
        },
      },
      transformData
    );
  };

  return (
    <div className={styles.contact}>
      <Container className="mt-5">
        <Row>
          <Col lg={6}>
            <h1 className="fw-bold mb-3">{t(["contact.mainTitle"])}</h1>
            <div className={`${styles.contact1}`}>
              <div>
                <address>{settingsData?.address}</address>

                <p
                  tel=""
                  className={styles.phone}
                  style={{ direction: i18n.dir === "rtl" ? "ltr" : "ltr" }}
                >
                 <span>{settingsData?.phones.split('/')}</span>
                </p>
                <p className="fs-5">
                  <BiEnvelope /> {settingsData?.email}
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.contact2}>
              <form className="w-100" onSubmit={handleSubmit}>
                <div className="w-100 d-flex justify-content-between flex-column flex-md-row">
                  <Row>
                    <Col
                      md={4}
                      lg={12}
                      xl={4}
                      className="mb-3 mb-md-1 mb-lg-3 mb-xl-1"
                    >
                      <input
                        placeholder={t(["contact.fields.name"])}
                        type="text"
                        name="name"
                        className="w-100"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col
                      md={4}
                      lg={12}
                      xl={4}
                      className="mb-3 mb-md-1 mb-lg-3 mb-xl-1"
                    >
                      <input
                        placeholder={t(["contact.fields.email"])}
                        type="email"
                        name="email"
                        className="w-100"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col
                      md={4}
                      lg={12}
                      xl={4}
                      className="mb-3 mb-md-1 mb-lg-3 mb-xl-1"
                    >
                      <input
                        placeholder={t(["contact.fields.phone"])}
                        type="number"
                        name="phone"
                        className="w-100"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                    <Col md={12} className="mt-3">
                      <div className={`${styles.selectDiv} mb-3`}>
                        <textarea
                          id="message"
                          name={"message"}
                          required
                          placeholder={t(["contact.fields.message"])}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <button className="d-block common-btn-2" type="submit">
                  {t(["contact.send"])}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
