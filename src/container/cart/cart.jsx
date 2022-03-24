import React, { Component, Fragment } from "react";
import styles from "./cart.module.css";
import Remove from "../../assets/svg/trash-bin.svg";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className={styles.title}>CART</h1>
        {this.props.cart.map((product, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.leftContainer}>
              <Link
                className={styles.link}
                to={{
                  pathname: "/product-detail",
                  search: `?id=${product.id}`,
                }}
              >
                <h1>{product.brand}</h1>
                <h2>{product.name}</h2>
              </Link>
              <div>
                {product.prices
                  ?.filter(
                    (price) =>
                      price.currency.symbol === this.props.activeCurrencySymbol
                  )
                  ?.map((price) => (
                    <p className={styles.price} key={price.currency.symbol}>
                      <span>{price.currency.symbol}</span>
                      {price.amount}
                    </p>
                  ))}
              </div>
              <div>
                {product.attributes.color && (
                  <div className={styles.colorAttribute}>
                    <p>Color: </p>
                    <div
                      className={styles.colorSample}
                      style={{ backgroundColor: product.attributes.color }}
                    ></div>
                    <p>{product.attributes.color}</p>
                  </div>
                )}
                {product.attributes.attributes.map((att, index) => (
                  <p key={index} className={styles.attribute}>
                    <span>{att.name}: </span>
                    <span>{att.value}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.quantityContainer}>
                <button
                  onClick={() => {
                    product.quantity < 99 && product.quantity++;
                    localStorage.setItem(
                      "cart",
                      JSON.stringify(this.props.cart)
                    );
                    this.forceUpdate();
                  }}
                >
                  +
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => {
                    product.quantity > 1 && product.quantity--;
                    localStorage.setItem(
                      "cart",
                      JSON.stringify(this.props.cart)
                    );
                    this.forceUpdate();
                  }}
                >
                  -
                </button>
              </div>

              <img className={styles.productImage} src={product.gallery} />
              <img
                className={styles.remove}
                src={Remove}
                onClick={() =>
                  window.confirm(
                    "Are you sure you want to remove the item from the cart?"
                  ) && this.props.removeFromCart(product)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cart;
