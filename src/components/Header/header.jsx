import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";
import Logo from "../../assets/svg/logo.svg";
import Arrow from "../../assets/svg/down-arrow.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switcherClicked: false,
    };
  }

  handleSwitcher = () => {
    this.setState((prevState) => ({
      switcherClicked: !prevState.switcherClicked,
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
            <div className={styles.currenciesCard}>
              {this.state.switcherClicked
                ? this.props.currencies.map((currency, index) => (
                    <div
                      onClick={() =>
                        this.props.updateActiveCurrencySymbol(currency.symbol)
                      }
                      className={styles.currencyItem}
                      key={index}
                    >
                      <span>{currency.symbol}</span>
                      <span>{currency.label}</span>
                    </div>
                  ))
                : ""}
            </div>
            <span>
              {
                this.props.currencies?.find(
                  (currency) =>
                    currency.symbol === this.props.activeCurrencySymbol
                )?.symbol
              }
            </span>
            <img src={Arrow} />
          </div>
          <div className={styles.miniCart}>
            <img src={Cart} alt="cart" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
