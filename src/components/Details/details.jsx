import React, { Component, Fragment } from "react";
import styles from "./details.module.css";

class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.product.gallery);
    return (
      <div className={styles.container}>
        <div className={styles.galleryContainer}>
          <img src={this.props.product.gallery[0]} />
          <img src={this.props.product.gallery[1]} />
          <img src={this.props.product.gallery[2]} />
        </div>
        <div className={styles.definitonContainer}>
          <p>{this.props.product.brand}</p>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.attributes[0]?.name}:</p>
          <p>
            {this.props.product.attributes[0]?.items.map((item) => (
              <span>{item.displayValue}</span>
            ))}
          </p>
          <p>Price:</p>
          <p>
            {this.props.product.prices
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
          <button>Add to Cart</button>
          {this.props.product.description}
        </div>
      </div>
    );
  }
}
export default Details;
