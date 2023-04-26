import React from "react";

import { Outlet, useNavigation } from "react-router-dom";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import NavComponent from "../common/nav/NavComponent";
import ScrollToTop from "../components/scrollToTop"
import Footer from "../common/footer/Footer";
///

const Pages = () => {
  const navigation = useNavigation();

/////////
  return (
    <>
      <NavComponent />
      <ScrollToTop />
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </>
  );
};

export default Pages;
