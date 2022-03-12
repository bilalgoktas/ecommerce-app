import classNames from "classnames";
import React, { Component } from "react";
import styles from "./header.module.css";
import Cart from "../../assets/svg/cart.svg";

class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={classNames(styles.filterItem, styles.active)}>
            WOMEN
          </div>
          <div className={styles.filterItem}>MEN</div>
          <div className={styles.filterItem}>KIDS</div>
        </div>
        <div className={styles.centerContainer}>
          <a href="#">icon</a>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.currencySwitcher}>usd</div>
          <div className={styles.miniCart}>
            <img src={Cart} alt="cart" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
