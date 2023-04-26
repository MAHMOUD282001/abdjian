import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./categories.css";
import { useTranslation } from "react-i18next";
import useHttp from "../../hook/use-http";
import { BsArrowRight } from "react-icons/bs";
import CommonCard from "../CommonCard/CommonCard";
import leftDirection from "./leftdirection.module.css";
import rightDirection from "./rightdirection.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";

const Categories = () => {
  const { t, i18n } = useTranslation();
  let [cat, setCat] = useState(0);
  let [subCat, setSubCat] = useState(0);
  let [catActive, setCatActive] = useState(false);
  let [subCatActive, setSubCatActive] = useState(false);
  const [categories, setCategories] = useState();
  let [products, setProducts] = useState();

  const styleDirection = i18n.dir() === "ltr" ? leftDirection : rightDirection;

  const { isLoading, error, requestFn } = useHttp();
  const getCategoriesApi = `https://adminpanel.hyperfinition.com/api/public/category_with_children`;

  useEffect(() => {
    const transformData = (data) => {
      setCategories(data.data);
    };
    requestFn(
      {
        url: getCategoriesApi,
      },
      transformData
    );
  }, [requestFn, getCategoriesApi]);

  function handleCategory(id) {
    setCat(id);
    setCatActive(!catActive);
    setSubCatActive(false);
  }

  function handleSubCategory(id) {
    setSubCat(id);
    setSubCatActive(!subCatActive);
  }

  let handleGetProducts = (id) => {
    //Get Products

    const getSubCategoryProductsApi = `https://adminpanel.hyperfinition.com/api/public/products?category=${id}`;
    const transformData = (data) => {
      setProducts(data.data);
    };
    requestFn(
      {
        url: getSubCategoryProductsApi,
      },
      transformData
    );
  };

  return (
    <div>
      <Container className="mb-5">
        <Row>
          <Col lg={12} className="mt-5 mb-5">
            <h2>{t(["categories.mainTitle"])}</h2>
          </Col>
        </Row>
        <Row className="g-4">
          <Col className="filter-content" sm={12} md={12} lg={4}>
            {categories?.length > 0
              ? categories.map((category) => (
                  <div key={category.id}>
                    <div
                      className={`${
                        cat === category.id
                          ? styleDirection.cat__active
                          : "d-flex justify-content-between flex-column"
                      }
                        : `}
                    >
                      <div
                        className="d-flex align-items-center justify-content-between"
                        onClick={() => {
                          handleCategory(category.id);
                          handleGetProducts(category.id);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img src={category.img} alt={category.name} />
                          <p className={"mb-0"}>{category.name}</p>
                        </div>

                        <div>
                          <MdKeyboardArrowDown />
                        </div>
                      </div>

                      <div
                        className={catActive ? "drop-down active" : "drop-down"}
                      >
                        {cat === category.id ? (
                          <div className={`${styleDirection.sub__categories}`}>
                            {category.sub_categories?.length > 0
                              ? category.sub_categories.map((subCategory) => (
                                  <>
                                    <div
                                      className={`${styleDirection.sub__category}`}
                                      key={subCategory.id}
                                      onClick={() => {
                                        handleSubCategory(subCategory.id);
                                        handleGetProducts(subCategory.id);
                                      }}
                                    >
                                      {subCategory.name}
                                    </div>

                                    <div
                                      className={
                                        subCatActive
                                          ? "drop-down active"
                                          : "drop-down"
                                      }
                                    >
                                      {subCat === subCategory.id ? (
                                        <div
                                          className={`${styleDirection.sub__sub__categories}`}
                                        >
                                          {subCategory.sub_sub_categories
                                            ?.length > 0
                                            ? subCategory.sub_sub_categories.map(
                                                (subSubCategory) => (
                                                  <>
                                                    <div
                                                      className={`${styleDirection.sub__sub__category}`}
                                                      key={subSubCategory.id}
                                                      onClick={() =>
                                                        handleGetProducts(
                                                          subSubCategory.id
                                                        )
                                                      }
                                                    >
                                                      {subSubCategory.name}
                                                    </div>
                                                  </>
                                                )
                                              )
                                            : ""}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </>
                                ))
                              : ""}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              : ""}
          </Col>
          <Col sm={12} md={12} lg={8}>
            <div>
              <Row>
                {products?.length > 0 ? (
                  products.map((product) => (
                    <Col
                      lg={6}
                      md={12}
                      sm={12}
                      className={`px-1 py-1 text-center text-capitalize`}
                      key={product.id}
                    >
                      <CommonCard
                        id={product.id}
                        title={product.name}
                        price={product.price}
                        img={product.img}
                        path={`/products/${product.id}`}
                      />
                    </Col>
                  ))
                ) : (
                  <Row
                    className={`noSubCategories align-items-center justify-content-center fs-3`}
                  >
                    {t('categories.noCategoryProducts')}
                  </Row>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
