import React from "react";

import axios from "axios";
import { EuiStat } from "@elastic/eui";

export default class StatsBox extends React.Component {
  state = {
    monthSum: 0,
    color: "subdued",
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/stats/${this.props.from}/${this.props.to}`)
      .then((res) => {
        const monthSum = res.data;
        let color;
        if (parseFloat(monthSum) < 0) color = "danger";
        else color = "secondary";
        this.setState({ monthSum, color });
      });
  }

  render() {
    return (
      <EuiStat
        title={this.state.monthSum}
        description={this.props.description}
        titleColor={this.state.color}
      />
    );
  }
}
