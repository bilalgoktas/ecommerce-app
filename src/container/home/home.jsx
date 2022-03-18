import React, { Component } from "react";
import Product from "../../components/Product/product";
import Details from "../../components/Details/details.jsx";
import styles from "./home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className={styles.categoryTitle}>
          {this.props.categories[
            this.props.activeCategoryIndex
          ]?.name.toUpperCase()}
        </h1>

        <div className={styles.productsContainer}>
          {this.props.categories[this.props.activeCategoryIndex]?.products.map(
            (product, index) => (
              <Product
                key={index}
                id={product.id}
                brand={product.brand}
                name={product.name}
                gallery={product.gallery}
                prices={product.prices}
                activeCurrencySymbol={this.props.activeCurrencySymbol}
              />
            )
          )}
        </div>

        <div className={styles.detailsContainer}>
          {this.props.categories[this.props.activeCategoryIndex]?.products.map(
            (product, index) => (
              <Details
                key={index}
                product={product}
                activeCurrencySymbol={this.props.activeCurrencySymbol}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

{
  /* <Details
      key={index + 100}
      product={product}
      activeCurrencySymbol={this.props.activeCurrencySymbol}
    /> */
}

export default Home;
