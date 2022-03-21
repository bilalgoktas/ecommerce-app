import React, { Component } from "react";
import styles from "./attribute.module.css";
import classNames from "classnames";

class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAttributeIndex: 0,
    };
  }

  updateActiveAttributeIndex = (index) => {
    this.setState({ activeAttributeIndex: index });
  };

  render() {
    return (
      <div
        className={classNames(
          styles.attributeValue,
          this.state.activeAttributeIndex === this.props.subIndex
            ? styles.active
            : ""
        )}
        onClick={() => this.updateActiveAttributeIndex(this.props.subIndex)}
      >
        {this.props.item.displayValue}
      </div>
    );
  }
}

export default Attribute;
