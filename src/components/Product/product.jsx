import React, { Component } from "react";
import styles from "./product.module.css";
import GreenCart from "../../assets/svg/green-cart.svg";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.categories[this.props.activeCategoryIndex]?.products?.map(
          (product, index) => (
            <div className={styles.card} key={index}>
              <img className={styles.greenCart} src={GreenCart} />
              <img
                className={styles.image}
                src={product.gallery}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/380x445";
                }}
              />
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>
                {
                  product.prices[this.props.activeCurrencyIndex]?.currency
                    .symbol
                }
                {product.prices[this.props.activeCurrencyIndex]?.amount}
              </p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Product;
