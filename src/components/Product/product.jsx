import React, { Component, Fragment } from "react";
import styles from "./product.module.css";
import GreenCart from "../../assets/svg/green-cart.svg";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img className={styles.greenCart} src={GreenCart} />
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={this.props.gallery}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/380x445";
              }}
            />
          </div>

          <p className={styles.name}>{this.props.name}</p>
          <p className={styles.price}>
            {this.props.prices
              .filter(
                (price) =>
                  price.currency.symbol === this.props.activeCurrencySymbol
              )
              ?.map((price) => (
                <Fragment key={price.currency.symbol}>
                  <span>{price.currency.symbol}</span> {price.amount}
                </Fragment>
              ))}
          </p>
        </div>
      </div>
    );
  }
}

export default Product;
