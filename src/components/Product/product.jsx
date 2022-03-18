import React, { Component, Fragment } from "react";
import styles from "./product.module.css";
import GreenCart from "../../assets/svg/green-cart.svg";
import { Link } from "react-router-dom";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        className={styles.container}
        to={{
          pathname: "/product-detail",
          search: `?id=${this.props.id}`,
        }}
      >
        <div className={styles.card}>
          <img className={styles.greenCart} src={GreenCart} />
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={this.props.gallery[0]}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/380x445";
              }}
            />
          </div>

          <p className={styles.name}>
            <span>{this.props.brand}</span> <span>{this.props.name}</span>
          </p>
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
      </Link>
    );
  }
}

export default Product;
