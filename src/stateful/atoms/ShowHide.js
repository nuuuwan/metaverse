import { Component } from "react";
import "./ShowHide.css";

export default class ShowHide extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  render() {
    const { isVisible } = this.state;

    const onClickShow = function (e) {
      this.setState({ isVisible: true });
    }.bind(this);

    const onClickHide = function (e) {
      this.setState({ isVisible: false });
    }.bind(this);

    let renderedInner;
    if (isVisible) {
      renderedInner = (
        <div>
          <div className="div-hide" onClick={onClickHide}>
            ×
          </div>
          {this.props.children}
        </div>
      );
    } else {
      renderedInner = (
        <div>
          <div className="div-show" onClick={onClickShow}>
            {" "}
            {this.props.label}
          </div>
        </div>
      );
    }

    return <div className="div-show-hide">{renderedInner}</div>;
  }
}
