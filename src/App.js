import React, { Component } from "react";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import client from "./services/graphqlService";
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
      activeCurrencyIndex: 0,
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

  updateActiveCurrencyIndex = (index) => {
    this.setState({ activeCurrencyIndex: index });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          updateActiveCategoryIndex={this.updateActiveCategoryIndex}
          updateActiveCurrencyIndex={this.updateActiveCurrencyIndex}
          categories={this.state.categories}
          currencies={this.state.currencies}
          activeCategoryIndex={this.state.activeCategoryIndex}
          activeCurrencyIndex={this.state.activeCurrencyIndex}
        />
        <Product
          categories={this.state.categories}
          activeCategoryIndex={this.state.activeCategoryIndex}
          activeCurrencyIndex={this.state.activeCurrencyIndex}
        />
      </div>
    );
  }
}

export default App;
