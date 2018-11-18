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
    let names = {};
    this.state.rosterArr.forEach(elem => {
      let height = Object.values(elem)[0]["ht"];
      let num = Object.values(elem)[0]["num"];
      let name =
        Object.values(elem)[0]["fn"] + " " + Object.values(elem)[0]["ln"];
      names[num] = name;
      let inches =
        Number(height.split("-")[0]) * 12 + Number(height.split("-")[1]);
      heights[num] = inches;
    });
    let result = Object.keys(heights).map(key => ({
      x: key,
      y: Number(heights[key]),
      names: names[key]
    }));
    return result;
  }

  // groupHeightsScatter() {
  //   let groups = {
  //     SixtyFiveTo70: [],
  //     SeventyTo75: [],
  //     SeventyFiveAndUp: []
  //   };
  //   this.state.rosterArr.forEach(elem => {
  //     let height = Object.values(elem)[0]["ht"];
  //     let inches =
  //       Number(height.split("-")[0]) * 12 + Number(height.split("-")[1]);
  //     if (inches < 70) {
  //       groups["SixtyFiveTo70"].push(Object.values(elem)[0]["inches"]);
  //     } else if (inches >= 70 && inches < 75) {
  //       groups["SeventyTo75"].push(Object.values(elem)[0]["inches"]);
  //     } else {
  //       groups["SeventyFiveAndUp"].push(Object.values(elem)[0]["inches"]);
  //     }
  //   });
  //   let result = Object.keys(groups).map(elem => {
  //     if (elem.startswith('Sixty')) {

  //     }
  //     // x: elem,
  //     // y: Number(groups[elem].length)

  //   }));
  //   return result;
  // }

  getYearsPieChart() {
    let years = {};
    this.state.rosterArr.forEach(elem => {
      let yr = Object.values(elem)[0]["y"];
      if (years[yr]) {
        years[yr].push(
          `${Object.values(elem)[0]["fn"]} ${Object.values(elem)[0]["ln"]}`
        );
      } else {
        years[yr] = [
          `${Object.values(elem)[0]["fn"]} ${Object.values(elem)[0]["ln"]}`
        ];
      }
    });
    let result = Object.keys(years).map(key => ({
      x: `${Number(key)} yrs`,
      y: years[key].length,
      label: `${Number(key)} yr(s)`,
      names: years[key].join("\n")
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
      // this.groupHeightsScatter();
    }
  }

  render() {
    let yearsPie = this.getYearsPieChart();
    let heightsBar = this.getHeightsBarChart();
    // let heightsScatter = this.groupHeightsScatter();
    return (
      <div>
        <h3>CT-Sun by Years on Team</h3>
        {Object.keys(this.state.rosterArr).length && yearsPie && (
          <VictoryPie
            data={yearsPie}
            height={300}
            style={{ labels: { fontSize: 6 } }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: props => {
                          return props.text.length < 8
                            ? { text: `${props.text}: ${props.datum.names}` }
                            : { text: `${props.text.split(": ")[0]}` };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
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
        <br />
        <h3>CT-Sun by Height</h3>
        {Object.keys(this.state.rosterArr).length && heightsBar && (
          <div>
            <VictoryChart
              domainPadding={{ x: 50 }}
              sortKey={heightsBar["y"]}
              domain={{ x: [0, 12], y: [0, 80] }}
            >
              <VictoryAxis
                tickValues={heightsBar["x"]}
                label={"Players (Jersey #)"}
                style={{
                  tickLabels: { fontSize: 6 },
                  axisLabel: { fontSize: 12, padding: 20 }
                }}
                tickLabelComponent={<VictoryLabel angle={330} fontSize={5} />}
              />
              <VictoryAxis
                dependentAxis
                label="Height (in)"
                style={{ axisLabel: { padding: 35 } }}
              />
              <VictoryBar
                height={300}
                width={300}
                data={heightsBar}
                barWidth={12}
                animate={{ onEnter: { duration: 2000 } }}
                labels={d => ""}
                style={{
                  labels: { fontSize: 10 },
                  data: {
                    fillOpacity: 0.7,
                    strokeWidth: 3,
                    fill: "navy"
                  }
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onClick: () => {
                        return [
                          {
                            target: "labels",
                            mutation: props => {
                              console.log(props);
                              return props.text.length
                                ? { text: "" }
                                : {
                                    text: `${parseInt(
                                      props.datum.y / 12
                                    )}'${parseInt(props.datum.y % 12)}''\n ${
                                      props.datum.names
                                    }`
                                  };
                            }
                          }
                        ];
                      }
                    }
                  }
                ]}
              />
            </VictoryChart>
            {/* <VictoryChart
              theme={VictoryTheme.material}
              domain={{ y: [60, 80] }}
            >
              <VictoryScatter
                // style={{ data: { fill: "#c43a31" } }}
                data={heightsScatter}
                // bubbleProperty="y"
                // maxBubbleSize={25}
                // minBubbleSize={5}
              />
            </VictoryChart> */}
          </div>
        )}
      </div>
    );
  }
}

export default Roster;
