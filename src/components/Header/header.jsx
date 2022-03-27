import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";
import Logo from "../../assets/svg/logo.svg";
import DownArrow from "../../assets/svg/down-arrow.svg";
import UpArrow from "../../assets/svg/up-arrow.svg";
import { Link } from "react-router-dom";
import MiniCart from "../MiniCart/miniCart";

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
    return (
      <header className={styles.container}>
        <div className={styles.headerLeftContainer}>
          {this.props.categories?.map((category, index) => (
            <Link key={index} className={styles.link} to={{ pathname: "/" }}>
              <div
                onClick={() => this.props.updateActiveCategoryIndex(index)}
                className={classNames(
                  styles.filterItem,
                  this.props.activeCategoryIndex === index ? styles.active : ""
                )}
              >
                {category.name.toUpperCase()}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.headerCenterContainer}>
          <Link to={{ pathname: "/" }}>
            <img src={Logo} alt="logo" />
          </Link>
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
              <MiniCart
                cart={this.props.cart}
                handleCart={this.handleCart}
                activeCurrencySymbol={this.props.activeCurrencySymbol}
              />
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
