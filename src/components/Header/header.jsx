import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";
import Logo from "../../assets/svg/logo.svg";
import Arrow from "../../assets/svg/down-arrow.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

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
          <div className={styles.currencySwitcher}>
            <span>$</span>
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
