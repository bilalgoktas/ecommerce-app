import React, { Component, Fragment } from "react";
import { productQuery } from "../../services/queries";
import client from "../../services/graphqlService";
import styles from "./productDetail.module.css";
import { withRouter } from "react-router";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      product: {},
      activeImageIndex: 0,
    };
  }

  componentDidMount() {
    const id = window.location.search.substr(4);
    client
      .query({
        query: productQuery,
        variables: { id },
      })
      .then((result) => this.setState({ product: result.data.product }));
  }

  updateActiveImageIndex = (index) => {
    this.setState({ activeImageIndex: index });
  };

  updateActiveColor = () => {
    console.log("active");
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.smallImages}>
          {this.state.product.gallery?.map((image, index) => (
            <img
              onClick={() => this.updateActiveImageIndex(index)}
              key={index}
              src={image}
              alt="product image"
            />
          ))}
        </div>
        {this.state.product?.gallery && (
          <div className={styles.largeImage}>
            <img
              src={this.state.product.gallery[this.state.activeImageIndex]}
            />
          </div>
        )}
        <div className={styles.detail}>
          <h1>{this.state.product.brand}</h1>
          <h2>{this.state.product.name}</h2>
          <div className={styles.attributes}>
            {this.state.product.attributes?.map((attribute, index) => (
              <Fragment key={index}>
                <p className={styles.attributeName} key={index}>
                  {attribute.name.toUpperCase()}:
                </p>
                {attribute.type === "swatch" ? (
                  <div className={styles.colorPaletteContainer}>
                    {attribute.items.map((item, subIndex) => (
                      <div
                        tabindex={0}
                        onClick={this.updateActiveColor}
                        className={styles.colorPalette}
                        key={subIndex}
                        style={{ backgroundColor: item.displayValue }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.attributeValueContainer}>
                    {attribute.items.map((item) => (
                      <div className={styles.attributeValue}>
                        {item.displayValue}
                      </div>
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className={styles.price}>
            <p>PRICE:</p>
            <p>
              {this.state.product.prices
                ?.filter(
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
          <div className={styles.button}>
            <button>ADD TO CART</button>
          </div>
          <div className={styles.description}>
            <span
              dangerouslySetInnerHTML={{
                __html: this.state.product.description,
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
