import React, { Component } from "react";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import client from "./services/graphqlService";
import { categoriesQuery, productQuery } from "./services/queries";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], activeCategoryIndex: 0 };
  }

  componentDidMount() {
    client
      .query({
        query: categoriesQuery,
      })
      .then((result) => this.setState({ categories: result.data.categories }));

    // client.query({
    //   query: productQuery,
    //   variables: { id: "ps-5" },
    // });
  }

  updateActiveCategoryIndex = (index) => {
    this.setState({ activeCategoryIndex: index });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          updateActiveCategoryIndex={this.updateActiveCategoryIndex}
          categories={this.state.categories}
          activeCategoryIndex={this.state.activeCategoryIndex}
        />
        <Product />
        <div>
          {this.state.categories[this.state.activeCategoryIndex]?.products?.map(
            (product, index) => (
              <div key={index}>
                <img src={product.gallery} />
                {product.name}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
