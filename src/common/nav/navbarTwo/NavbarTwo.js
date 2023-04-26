import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch } from "react-icons/fa";
import styles from "./navbarTwo.module.css";
import makeAnimated from "react-select/animated";
import { Container, Col, Row } from "react-bootstrap";
import { GrLanguage } from "react-icons/gr";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function NavbarTwo() {
  /////////
  const { t, i18n } = useTranslation();
  const langOptions = [
    { value: "Arabic", label: "ar" },
    { value: "English", label: "en" },
    { value: "French", label: "fr" },
  ];
  
  let [searchedWord, setSearchedWord] = useState("")
  
  const [openLangState, setOpenLang] = useState(false);
  const language = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en";
  const [langState, setLang] = useState(language);

  const filterLang = (id) => {
    setLang(id);
    i18n.changeLanguage(id);
    setOpenLang(false);
    localStorage.setItem("language", id);
  };
  //////////

  let navigate = useNavigate();
  
  let handleSearch = (e)=>{
    e.preventDefault();
    if(searchedWord?.trim().length > 0){
      navigate(`/search/${searchedWord}`)
    }
    setSearchedWord("")
  }

  return (
    <Navbar bg="light" expand="lg" className="h-auto">
      <Container className="w-100">
        <Row className="w-100 mx-0 px-0 mx-auto justify-content-between align-items-center">
          <Col xs={12} md={9}>
            <Form className="d-flex w-100 h-100 justify-content-between">
              <input
                type="search"
                onChange={e => setSearchedWord(e.target.value)}
                value={searchedWord}
                placeholder={t(["navTwo.search"])}
                className={`${styles.searchInput} mt-2 mt-md-0 ${
                  i18n.dir() === "ltr" ? "ps-2" : "pe-2"
                }`}
              />
              <button
                className={`${styles.searchButton} mt-2 mt-md-0 d-flex justify-content-center align-items-center`}
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </Form>
          </Col>
          <Col
            xs={12}
            md={3}
            className="mt-2 mt-md-0 ms-auto d-flex justify-content-center"
          >
            <button className={`${styles.iconButton}`}>
              <GrLanguage onClick={() => setOpenLang(!openLangState)} />
              <ul
                className={
                  openLangState
                    ? `${styles.langDropdown2} list-unstyled`
                    : `${styles.langDropdown2} list-unstyled d-none`
                }
              >
                {langOptions.map((ele) => (
                  <li
                    key={ele.value}
                    id={ele.label}
                    className={
                      langState === ele.label ? styles.selectedLang : ""
                    }
                    onClick={(e) => filterLang(e.target.id)}
                  >
                    {ele.label}
                  </li>
                ))}
              </ul>
            </button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavbarTwo;
