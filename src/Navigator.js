import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import Cart from "./container/cart/cart";
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
      cart: [],
    };
  }

  componentDidMount() {
    localStorage.getItem("cart") &&
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });

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

  updateCart = async (product, productAttributes) => {
    // this.state.cart.some(
    //   (item) =>
    //     // let itemQuantity = item.quantity;
    //     (item.name === product.name) & (item.attributes === productAttributes)
    // )
    //   ? this.state.cart.find(
    //       (item) =>
    //         (item.name === product.name) &
    //         (item.attributes === productAttributes)
    //     ) :
    await this.setState({
      cart: [
        ...this.state.cart,
        {
          brand: product.brand,
          name: product.name,
          gallery: product.gallery[0],
          prices: product.prices,
          attributes: productAttributes,
          quantity: 1,
        },
      ],
    });
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  // updateQuantity = () => {
  //   this.state.cart.some((item) => {
  //     let itemQuantity = item.quantity;
  //     (item.name === product.name) & (item.attributes === productAttributes) &&
  //       itemQuantity++;
  //   });
  // };
  render() {
    console.log(this.state.cart);
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

          <Route
            path="/product-detail"
            element={
              <ProductDetail
                cart={this.state.cart}
                updateCart={this.updateCart}
                activeCurrencySymbol={this.state.activeCurrencySymbol}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={this.state.cart}
                activeCurrencySymbol={this.state.activeCurrencySymbol}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default Navigator;
