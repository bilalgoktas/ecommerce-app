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
      totalPrice: 0,
    };
  }

  componentDidMount() {
    localStorage.getItem("cart") &&
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });

    localStorage.getItem("activeCurrencySymbol") &&
      this.setState({
        activeCurrencySymbol: localStorage.getItem("activeCurrencySymbol"),
      });

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

    this.state.cart.forEach((item) => {
      this.state.totalPrice +=
        item.quantity *
        item.prices
          ?.filter(
            (price) => price.currency.symbol === this.props.activeCurrencySymbol
          )
          ?.map((price) => price.amount);
    });
  }

  updateActiveCategoryIndex = (index) => {
    this.setState({ activeCategoryIndex: index });
  };

  updateActiveCurrencySymbol = async (symbol) => {
    await this.setState({ activeCurrencySymbol: symbol });
    localStorage.setItem(
      "activeCurrencySymbol",
      this.state.activeCurrencySymbol
    );
  };

  updateCart = async (product, productAttributes) => {
    await this.setState({
      cart: [
        ...this.state.cart,
        {
          id: product.id,
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

  removeFromCart = async (product) => {
    await this.setState({
      cart: this.state.cart.filter(
        (a) =>
          JSON.stringify(a.attributes) !== JSON.stringify(product.attributes)
      ),
    });
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    window.location.reload(false);
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
          cart={this.state.cart}
          totalPrice={this.state}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                categories={this.state.categories}
                activeCategoryIndex={this.state.activeCategoryIndex}
                activeCurrencySymbol={this.state.activeCurrencySymbol}
                updateCart={this.updateCart}
                cart={this.state.cart}
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
                removeFromCart={this.removeFromCart}
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
