import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";
import Logo from "../../assets/svg/logo.svg";
import DownArrow from "../../assets/svg/down-arrow.svg";
import UpArrow from "../../assets/svg/up-arrow.svg";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switcherClicked: false,
      cartClicked: false,
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
        <div className={styles.leftContainer}>
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
        <div className={styles.centerContainer}>
          <a href="#">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className={styles.rightContainer}>
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

          <Link to={{ pathname: "/cart" }}>
            <div className={styles.miniCart}>
              <img src={Cart} alt="cart" />
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
