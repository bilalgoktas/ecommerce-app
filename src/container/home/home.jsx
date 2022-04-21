import React, { PureComponent } from "react";
import Product from "../../components/Product/product";
import styles from "./home.module.css";

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
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
                cart={this.props.cart}
                updateCart={this.props.updateCart}
                product={product}
                key={index}
                id={product.id}
                brand={product.brand}
                name={product.name}
                gallery={product.gallery}
                prices={product.prices}
                inStock={product.inStock}
                activeCurrencySymbol={this.props.activeCurrencySymbol}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default Home;
