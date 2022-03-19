import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import Home from "./container/home/home";
import ProductDetail from "./container/productDetail/productDetail";
import client from "./services/graphqlService";
import { categoriesQuery, currenciesQuery } from "./services/queries";
class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      categories: [],
      activeCategoryIndex: 0,
      activeCurrencySymbol: "$",
    };
  }

  componentDidMount() {
    client
      .query({
        query: categoriesQuery,
      })
      .then((result) => this.setState({ categories: result.data.categories }));

    client
      .query({
        query: currenciesQuery,
      })
      .then((result) => this.setState({ currencies: result.data.currencies }));
  }

  updateActiveCategoryIndex = (index) => {
    this.setState({ activeCategoryIndex: index });
  };

  updateActiveCurrencySymbol = (symbol) => {
    this.setState({ activeCurrencySymbol: symbol });
  };
  render() {
    return (
      <Router>
        <Header
          updateActiveCategoryIndex={this.updateActiveCategoryIndex}
          updateActiveCurrencySymbol={this.updateActiveCurrencySymbol}
          categories={this.state.categories}
          currencies={this.state.currencies}
          activeCategoryIndex={this.state.activeCategoryIndex}
          activeCurrencySymbol={this.state.activeCurrencySymbol}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                categories={this.state.categories}
                activeCategoryIndex={this.state.activeCategoryIndex}
                activeCurrencySymbol={this.state.activeCurrencySymbol}
              />
            }
          />
          <>
            <Route
              path="/product-detail"
              element={
                <ProductDetail
                  activeCurrencySymbol={this.state.activeCurrencySymbol}
                />
              }
            />
          </>
        </Routes>
      </Router>
    );
  }
}

export default Navigator;
