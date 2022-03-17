import React, { Component } from "react";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import client from "./services/graphqlService";
import styles from "./App.module.css";
import {
  categoriesQuery,
  productQuery,
  currenciesQuery,
} from "./services/queries";

class App extends Component {
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

    // client.query({
    //   query: productQuery,
    //   variables: { id: "ps-5" },
    // });
  }

  updateActiveCategoryIndex = (index) => {
    this.setState({ activeCategoryIndex: index });
  };

  updateActiveCurrencySymbol = (symbol) => {
    this.setState({ activeCurrencySymbol: symbol });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          updateActiveCategoryIndex={this.updateActiveCategoryIndex}
          updateActiveCurrencySymbol={this.updateActiveCurrencySymbol}
          categories={this.state.categories}
          currencies={this.state.currencies}
          activeCategoryIndex={this.state.activeCategoryIndex}
          activeCurrencySymbol={this.state.activeCurrencySymbol}
        />

        <h1 className={styles.categoryTitle}>
          {this.state.categories[
            this.state.activeCategoryIndex
          ]?.name.toUpperCase()}
        </h1>
        <div className={styles.productsContainer}>
          {this.state.categories[this.state.activeCategoryIndex]?.products.map(
            (product, index) => (
              <Product
                key={index}
                name={product.name}
                gallery={product.gallery}
                prices={product.prices}
                activeCurrencySymbol={this.state.activeCurrencySymbol}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
