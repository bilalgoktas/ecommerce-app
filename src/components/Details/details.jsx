import React, { Component, Fragment } from "react";
import styles from "./details.module.css";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0,
    };
  }

  updateActiveImageIndex = (index) => {
    this.setState({ activeImageIndex: index });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.galleryContainer}>
          {this.props.product.gallery?.map((image, index) => (
            <img
              onClick={() => this.updateActiveImageIndex(index)}
              src={image}
              key={index}
            />
          ))}
        </div>
        <div className={styles.largeImage}>
          <img src={this.props.product.gallery[this.state.activeImageIndex]} />
        </div>
        <div className={styles.definitonContainer}>
          <p>{this.props.product.brand}</p>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.attributes[0]?.name}:</p>
          <p>
            {this.props.product.attributes[0]?.items.map((item, index) => (
              <span key={index}>{item.displayValue}</span>
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
          <span
            dangerouslySetInnerHTML={{ __html: this.props.product.description }}
          ></span>
        </div>
      </div>
    );
  }
}
export default Details;
