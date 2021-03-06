import { Component } from "react";

import "./AbstractLayer.css";

export default class AbstractLayer extends Component {
  constructor(props) {
    super(props);
    this.state = { dataList: undefined };
  }

  async getDataList() {
    return [];
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getDataListAndUpdateState();
  }

  async getDataListAndUpdateState() {
    const dataList = await this.getDataList();
    if (this.isComponentMounted) {
      this.setState({ dataList });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  static getLayerClassID() {
    return "abstract";
  }

  static getLabel() {
    return "AbstractLayer";
  }

  static getDisplayMode() {
    return "max";
  }

  static getTableName() {
    return "";
  }

  static isMatch(text) {
    return this.getLabel().toLowerCase().includes(text.toLowerCase());
  }

  static getSource() {
    return "Source unknown";
  }

  static getRegionTypes() {
    return [];
  }

  renderDataList() {
    return null;
  }

  renderLegend() {
    return null;
  }

  render() {
    const { dataList } = this.state;
    if (!dataList) {
      return null;
    }
    return (
      <>
        {this.renderDataList()}
        {this.renderLegend()}
      </>
    );
  }
}
