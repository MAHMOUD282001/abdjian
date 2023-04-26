import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pages from "./pages/Pages";

import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Search from "./components/search/Search";
import ErrorPage from "./pages/Error";
import About from "./components/about/About";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Categories from "./components/categories/Categories";
import Services from "./components/services/Services";
import ServiceDetails from "./components/serviceDetails/ServiceDetails";
import ProductDetails from "./components/productDetails/ProductDetails";
import Products from "./components/products/Products";
import Brands from "./components/brands/Brands";

function App() {
  const { t, i18n } = useTranslation();
  console.log(i18n.language)
  document.body.dir = i18n.dir();
  const language = localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n,language])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Pages />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products/",
          element: <Products api = {`https://adminpanel.hyperfinition.com/api/public/products`}/>,
        },
        {
          path: "/services/",
          element: <Services />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/search/:searchedWord",
          element: <Search />,
        },
        { path: "/products/:productId", element: <ProductDetails /> },
        { path: "/services/:serviceId", element: <ServiceDetails/> },
        { path: "/about", element: <About /> },
        { path: "/contactUs", element: <Contact /> },
        { path: "/search/:searchValue", element: <Search /> },
      ],
    },
  ]);

  ///
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
