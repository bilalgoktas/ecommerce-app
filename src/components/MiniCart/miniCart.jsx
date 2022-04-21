import React, { PureComponent } from "react";
import styles from "./miniCart.module.css";
import { Link } from "react-router-dom";

class MiniCart extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  render() {
    if (!this.props.cartClicked) return null;

    return (
      <div ref={this.ref} className={styles.miniCart}>
        <p className={styles.cartTitle}>
          My Cart,{" "}
          {this.props.cart
            .map((item) => item.quantity)
            .reduce((a, b) => a + b, 0)}{" "}
          items
        </p>
        <div className={styles.items}>
          {this.props.cart.map((product, index) => (
            <div className={styles.itemContainer} key={index}>
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
                        price.currency.symbol ===
                        this.props.activeCurrencySymbol
                    )
                    ?.map((price) => (
                      <p className={styles.price} key={price.currency.symbol}>
                        <span>{price.currency.symbol}</span>
                        {Number(price.amount).toFixed(2)}
                      </p>
                    ))}
                </div>
                <div>
                  {product.attributes.color && (
                    <div className={styles.colorAttribute}>
                      <p>Color: </p>
                      <div
                        className={styles.colorSample}
                        style={{
                          backgroundColor: product.attributes.color,
                        }}
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
                      product.quantity > 1
                        ? product.quantity--
                        : window.confirm(
                            "Are you sure you want to remove the item from the cart?"
                          ) && this.props.removeFromCart(product);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(this.props.cart)
                      );
                    }}
                  >
                    -
                  </button>
                </div>

                <img className={styles.productImage} src={product.gallery} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.priceButtonContainer}>
          <div className={styles.totalPriceContainer}>
            <p>Total</p>
            <p>
              <span>{this.props.activeCurrencySymbol}</span>
              {Number(
                this.props.cart
                  .map(
                    (item) =>
                      item.quantity *
                      item.prices
                        ?.filter(
                          (price) =>
                            price.currency.symbol ===
                            this.props.activeCurrencySymbol
                        )
                        ?.map((price) => price.amount)
                  )
                  .reduce((a, b) => a + b, 0)
              ).toFixed(2)}
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Link to={{ pathname: "/cart" }}>
              <button
                className={styles.viewBag}
                onClick={this.props.handleCart}
              >
                VIEW BAG
              </button>
            </Link>
            <button className={styles.checkOut}>CHECK OUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
