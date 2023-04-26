import React from "react";
import { Card } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./CommonCard2.module.css";

function CommonCard2({ id, title, img, price, path }) {
  let navigate = useNavigate();

  return (
    <div className={styles.commonCard} onClick={() => navigate(path)}>
      <Card className={styles.card}>
        <div className="h-100 w-100 overflow-hidden">
          <NavLink to={`/products/${id}`}>
            <Card.Img variant="top mw-100" src={img} loading="lazy" />
          </NavLink>
        </div>
        <NavLink to={`/products/${id}`}>
          <Card.Body className={`card-body ${styles.cardInfo}`}>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <div className={styles.splitHr}></div>
            <div>
              {price ? (
                <p className={`fw-bold fs-5 mb-0 ${styles.price}`}>${price}</p>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </NavLink>
      </Card>
    </div>
  );
}

export default CommonCard2;
