import React, { PureComponent, Fragment } from "react";
import styles from "./product.module.css";
import GreenCart from "../../assets/svg/green-cart.svg";
import { Link } from "react-router-dom";
import classNames from "classnames";

class Product extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
  };

  updateQuantity = (product, productAttributes) => {
    this.props.cart.find(
      (item) =>
        (item.name === product.name) &
        (JSON.stringify(item.attributes) === JSON.stringify(productAttributes))
    ).quantity++;

    localStorage.setItem("cart", JSON.stringify(this.props.cart));
  };

  render() {
    return (
      <Link
        className={classNames(
          styles.container,
          !this.props.inStock && styles.outOfStock
        )}
        to={{
          pathname: "/product-detail",
          search: `?id=${this.props.id}`,
        }}
      >
        <div className={styles.card}>
          <img
            onClick={(e) => {
              this.handleClick(e);
              const productAttributes = {
                color:
                  this.props.product.attributes.find(
                    (att) => att.name === "swatch"
                  )?.items[0].displayValue || "",
                attributes: this.props.product.attributes
                  .filter((att) => att.type !== "swatch")
                  .map((a) => {
                    return {
                      name: a.name,
                      value: a.items[0].displayValue,
                    };
                  }),
              };

              return this.props.cart.some(
                (item) =>
                  (item.name === this.props.product.name) &
                  (JSON.stringify(item.attributes) ===
                    JSON.stringify(productAttributes))
              )
                ? (this.updateQuantity(this.props.product, productAttributes),
                  alert(
                    "The item has been added to cart with default options. In order to select different options (size, capacity, color etc.) please go to product detail page!"
                  ))
                : (this.props.updateCart(this.props.product, productAttributes),
                  alert(
                    "The item has been added to cart with default options. In order to select different options (size, capacity, color etc.) please go to product detail page!"
                  ));
            }}
            className={styles.greenCart}
            src={GreenCart}
          />

          <div
            className={classNames(
              styles.imageContainer,
              !this.props.inStock && styles.outOfStockImageContainer
            )}
          >
            {!this.props.inStock && (
              <p className={styles.outOfStockText}>OUT OF STOCK</p>
            )}
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
                  <span>{price.currency.symbol}</span>{" "}
                  {Number(price.amount).toFixed(2)}
                </Fragment>
              ))}
          </p>
        </div>
      </Link>
    );
  }
}

export default Product;
