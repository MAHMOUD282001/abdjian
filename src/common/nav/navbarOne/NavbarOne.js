import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "./navbarOne.module.css";
import classes from "./navbarOneAr.module.css";

const NavbarOne = () => {
  const { t, i18n } = useTranslation();
  const styleHandler = i18n.dir() === 'ltr' ? styles : classes
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Container className={`${styleHandler.navContainer} ms-auto me-auto align-items-center`}>
        <Navbar.Brand className={`${styleHandler.brand} w-25`}>
          <NavLink to={"/"}>
            <img src={logo} alt="logo" className={styleHandler.logo} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`${styleHandler.navCollapse}`}
        >
          <Nav>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.main"])}
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.products"])}
            </NavLink>
            <NavLink
              to={"/services"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.services"])}
            </NavLink>
            <NavLink
              to={"/brands"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.brands"])}
            </NavLink>
            <NavLink
              to={"/categories"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.categories"])}
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.about"])}
            </NavLink>
            <NavLink
              to={"/contactUs"}
              className={({ isActive }) =>
                isActive ? `${styleHandler.navlink} ${styleHandler.active}` : styleHandler.navlink
              }
              end
            >
              {t(["nav.contact"])}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarOne;
