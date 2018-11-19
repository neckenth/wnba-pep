import React from "react";
import axios from "axios";
import {
  VictoryPie,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryTooltip
} from "victory";

class Stats extends React.Component {
  constructor() {
    super();
    this.state = {
      stats: {},
      statsArr: []
    };
  }

  async getData() {
    const res = await axios.get("/api/stats");
    const stats = await res.data;

  }

  componentDidMount() {
    this.getData();
  }

  render() {
      return (
          <div>
              <h3>Stats</h3>
          </div>
      )
  }
}

export default Stats;