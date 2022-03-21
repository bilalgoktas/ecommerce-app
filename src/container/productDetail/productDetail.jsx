import React, { Component, Fragment } from "react";
import { productQuery } from "../../services/queries";
import client from "../../services/graphqlService";
import styles from "./productDetail.module.css";
import classNames from "classnames";
import { withRouter } from "react-router";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import Attribute from "../../components/Attribute/attribute";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      product: {},
      activeImageIndex: 0,
      activeColorIndex: 0,
      productAttributes: {},
    };
  }

  componentDidMount() {
    const id = window.location.search.substr(4);
    client
      .query({
        query: productQuery,
        variables: { id },
      })
      .then((result) => {
        const existColor = result.data.product.attributes.find(
          (attribute) => attribute.type === "swatch"
        );
        let color = "";
        if (existColor) {
          color = existColor.items[0].displayValue;
        }
        this.setState({
          product: result.data.product,
          productAttributes: { color },
        });
      });
  }

  updateActiveImageIndex = (index) => {
    this.setState({ activeImageIndex: index });
  };

  updateActiveColor = (color) => {
    this.setState({
      productAttributes: { ...this.state.productAttributes, color },
    });
    console.log(color);
  };

  render() {
    console.log(this.state);
    return (
      <div className={styles.container}>
        <div className={styles.smallImages}>
          {this.state.product.gallery?.map((image, index) => (
            <img
              tabIndex={0}
              onClick={() => this.updateActiveImageIndex(index)}
              key={index}
              src={image}
              alt="product"
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
                {attribute.type === "swatch" && (
                  <div className={styles.colorPaletteContainer}>
                    {attribute.items.map((item, subIndex) => (
                      <div
                        onClick={() =>
                          this.updateActiveColor(item.displayValue)
                        }
                        className={classNames(
                          styles.colorPalette,
                          this.state.productAttributes.color ===
                            item.displayValue
                            ? styles.active
                            : ""
                        )}
                        key={subIndex}
                        style={{ backgroundColor: item.displayValue }}
                      ></div>
                    ))}
                  </div>
                )}
                {/* {attribute.type === "swatch" ? (
                  <div className={styles.colorPaletteContainer}>
                    {attribute.items.map((item, subIndex) => (
                      <div
                        onClick={() => this.updateActiveColorIndex(subIndex)}
                        className={classNames(
                          styles.colorPalette,
                          this.state.activeColorIndex === subIndex
                            ? styles.active
                            : ""
                        )}
                        key={subIndex}
                        style={{ backgroundColor: item.displayValue }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.attributeValueContainer}>
                    {attribute.items.map((item, subIndex) => (
                      <Attribute
                        key={subIndex}
                        item={item}
                        subIndex={subIndex}
                      />
                    ))}
                  </div>
                )} */}
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
