import React from "react";
import "./commoncard.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CommonCard({ id, price, title, path, img }) {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  

  return (
    <div className="common-card" onClick={() => navigate(path)}>
      <div className="img">
        <img src={img} alt="Product Img" />
      </div>

      <div className="details">
        {price ? <p className="price">${price}</p> : ""}
        <p className="title">{title}</p>

        {path ? (
          <button className="btn w-100" onClick={() => navigate(path)}>
            {t(["btns.viewProduct"])}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CommonCard;
