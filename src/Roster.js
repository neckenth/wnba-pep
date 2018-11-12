import React from "react";
import axios from "axios";
import { VictoryPie, VictoryBar, VictoryTheme } from "victory";

class Roster extends React.Component {
  constructor() {
    super();
    this.state = {
      roster: {},
      rosterArr: []
    };
  }

  async getData() {
    const res = await axios.get("/api/players");
    const roster = await res.data;
    let newArr = [];
    for (let key in roster) {
      let newObj = { [key]: roster[key] };
      newArr.push(newObj);
    }
    return this.setState({ rosterArr: newArr });
  }

  getHeightsBarChart() {
    let heights = {};
    this.state.rosterArr.forEach(elem => {
      let height = Object.values(elem)[0]["ht"];
      let name =
        Object.values(elem)[0]["fn"] + " " + Object.values(elem)[0]["ln"];
      let inches =
        Number(height.split("-")[0]) * 12 + Number(height.split("-")[1]);
      heights[name] = inches;
    });
    let result = Object.keys(heights).map(key => ({
      x: key,
      y: heights[key]
    }));
    return result;
  }

  getYearsPieChart() {
    let years = {};
    this.state.rosterArr.forEach(elem => {
      let yr = Object.values(elem)[0]["y"];
      if (years[yr]) {
        years[yr]++;
      } else {
        years[yr] = 1;
      }
    });
    let result = Object.keys(years).map(key => ({
      x: Number(key),
      y: years[key]
    }));
    return result;
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevState) {
    if (this.state.rosterArr.length) {
      this.getYearsPieChart();
      this.getHeightsBarChart();
    }
  }

  render() {
    let yearsPie = this.getYearsPieChart();
    let heightsBar = this.getHeightsBarChart();
    return (
      <div>
        {Object.keys(this.state.rosterArr).length && yearsPie && (
          <VictoryPie
            data={yearsPie}
            colorScale={[
              "navy",
              "yellow",
              "green",
              "orange",
              "cyan",
              "red",
              "pink"
            ]}
          />
        )}
        {Object.keys(this.state.rosterArr).length && heightsBar && (
          <VictoryBar
            data={heightsBar}
            animate={{ onEnter: { duration: 2000 } }}
            height={200}
            theme={VictoryTheme.material}
            labels={d => `${d.y}`}
            sortOrder="ascending"
          />
        )}
      </div>
    );
  }
}

export default Roster;
