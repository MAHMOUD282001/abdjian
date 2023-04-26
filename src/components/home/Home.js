import React from "react";
import Brands from "../brands/Brands";
import HomeTop from "../homeTop/HomeTop";
import Products from "../products/Products";
import Services from "../services/Services";

const Home = () => {
  return (
    <>
      <HomeTop />
      <Services dataFlag = "latest"/>
      <Products dataFlag = "latest" api = {`https://adminpanel.hyperfinition.com/api/public/products`}/>
      <Brands dataFlag = "latest"/>
    </>
  );
};

export default Home;
