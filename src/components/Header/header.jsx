import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";
import Logo from "../../assets/svg/logo.svg";
import DownArrow from "../../assets/svg/down-arrow.svg";
import UpArrow from "../../assets/svg/up-arrow.svg";
import Remove from "../../assets/svg/trash-bin.svg";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switcherClicked: false,
      cartClicked: false,
      totalPrice: 0,
    };
  }

  handleSwitcher = () => {
    this.setState((prevState) => ({
      switcherClicked: !prevState.switcherClicked,
    }));
  };

  handleCart = () => {
    this.setState((prevState) => ({
      cartClicked: !prevState.cartClicked,
    }));
  };

  render() {
    console.log(JSON.stringify(this.props.cart));
    return (
      <header className={styles.container}>
        <div className={styles.headerLeftContainer}>
          {this.props.categories?.map((category, index) => (
            <div
              onClick={() => this.props.updateActiveCategoryIndex(index)}
              key={index}
              className={classNames(
                styles.filterItem,
                this.props.activeCategoryIndex === index ? styles.active : ""
              )}
            >
              {category.name.toUpperCase()}
            </div>
          ))}
        </div>
        <div className={styles.headerCenterContainer}>
          <a href="#">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className={styles.headerRightContainer}>
          <div
            onClick={this.handleSwitcher}
            className={styles.currencySwitcher}
          >
            <span>
              {
                this.props.currencies?.find(
                  (currency) =>
                    currency.symbol === this.props.activeCurrencySymbol
                )?.symbol
              }
            </span>
            <img src={this.state.switcherClicked ? UpArrow : DownArrow} />
            {this.state.switcherClicked && (
              <div className={styles.currenciesCard}>
                {this.props.currencies.map((currency, index) => (
                  <p
                    onClick={() =>
                      this.props.updateActiveCurrencySymbol(currency.symbol)
                    }
                    className={styles.currencyItem}
                    key={index}
                  >
                    <span>{currency.symbol} </span>
                    <span>{currency.label}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* <Link to={{ pathname: "/cart" }}> */}
          <div className={styles.miniCartContainer}>
            <div onClick={this.handleCart} className={styles.cartIcon}>
              <img src={Cart} alt="cart" />
              {JSON.stringify(this.props.cart) !== "[]" && (
                <p className={styles.quantityOnCart}>
                  {this.props.cart
                    .map((item) => item.quantity)
                    ?.reduce((a, b) => a + b, 0)}
                </p>
              )}
            </div>
            {this.state.cartClicked && (
              <div className={styles.miniCart}>
                <p className={styles.cartTitle}>
                  My Cart,{" "}
                  {this.props.cart
                    .map((item) => item.quantity)
                    .reduce((a, b) => a + b, 0)}{" "}
                  items
                  <span onClick={this.handleCart} style={{ cursor: "pointer" }}>
                    X
                  </span>
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
                              <p
                                className={styles.price}
                                key={price.currency.symbol}
                              >
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

                        <img
                          className={styles.productImage}
                          src={product.gallery}
                        />
                        {/* <img
                        className={styles.remove}
                        src={Remove}
                        onClick={() =>
                          window.confirm(
                            "Are you sure you want to remove the item from the cart?"
                          ) && this.props.removeFromCart(product)
                        }
                      /> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.priceButtonContainer}>
                  <div className={styles.totalPriceContainer}>
                    <p>Total</p>
                    <p>
                      <span>{this.props.activeCurrencySymbol}</span>
                      {this.props.cart
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
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Link to={{ pathname: "/cart" }}>
                      <button
                        className={styles.viewBag}
                        onClick={this.handleCart}
                      >
                        VIEW BAG
                      </button>
                    </Link>
                    <button className={styles.checkOut}>CHECK OUT</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* </Link> */}
        </div>
      </header>
    );
  }
}

export default Header;
