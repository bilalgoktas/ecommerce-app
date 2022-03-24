import React, { Component, Fragment } from "react";
import { productQuery } from "../../services/queries";
import client from "../../services/graphqlService";
import styles from "./productDetail.module.css";
import classNames from "classnames";
import { withRouter } from "react-router";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
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
        let color = "",
          dynamicAttributes = [];
        const existColor = result.data.product.attributes.find(
          (attribute) => attribute.type === "swatch"
        );
        dynamicAttributes = result.data.product.attributes
          .filter((attribute) => attribute.type !== "swatch")
          .map((att) => ({
            name: att.name,
            value: att.items[0].displayValue,
          }));

        if (existColor) {
          color = existColor.items[0].displayValue;
        }
        this.setState({
          product: result.data.product,
          productAttributes: { color, attributes: [...dynamicAttributes] },
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
  };

  render() {
    // console.log(
    //   // this.props.cart.some(
    //   //   (item) =>
    //   //     (item.name === this.state.product.name) &
    //   //     (item.attributes.attributes[0] ===
    //   //       this.state.productAttributes.attributes)
    //   // )
    //   this.state.productAttributes.attributes
    // );

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
                {attribute.type === "swatch" ? (
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
                ) : (
                  <div className={styles.attributeValueContainer}>
                    {attribute.items.map((item, subIndex) => {
                      const defaultAttribute =
                        this.state.productAttributes?.attributes?.find(
                          (a) => a.name === attribute.name
                        );
                      return (
                        <div
                          key={subIndex}
                          className={classNames(
                            styles.attributeValue,
                            defaultAttribute.value ===
                              attribute.items[subIndex].displayValue
                              ? styles.active
                              : ""
                          )}
                          onClick={() => {
                            const newName = attribute.name;
                            const newDisplayValue =
                              attribute.items[subIndex].displayValue;
                            const newAttributes = [
                              ...this.state.productAttributes.attributes,
                            ];
                            newAttributes.forEach((att) => {
                              if (att.name === newName) {
                                att.value = newDisplayValue;
                              }
                            });
                            this.setState({
                              ...this.state,
                              productAttributes: {
                                color: this.state.productAttributes.color,
                                attributes: newAttributes,
                              },
                            });
                          }}
                        >
                          {item.displayValue}
                        </div>
                      );
                    })}
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
          <div
            onClick={
              // this.props.cart.some(
              //   (item) =>
              //     (item.name === this.state.product.name) &
              //     (item.attributes === this.state.productAttributes)
              // )
              //   ? () => {
              //       console.log(
              //         this.props.cart.find(
              //           (item) =>
              //             (item.name === this.state.product.name) &
              //             (item.attributes === this.state.productAttributes)
              //         )
              //       );
              //     } :
              async () => {
                await this.props.updateCart(
                  this.state.product,
                  this.state.productAttributes
                );
                window.location.reload(false);
              }
            }
          >
            <button className={styles.button}>ADD TO CART</button>
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
