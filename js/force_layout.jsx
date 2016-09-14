import React from 'react';
import * as d3 from 'd3';

const data = {
  nodes: [
    {index: 0},
    {index: 1},
    {index: 2}
  ],
  links: [
    {source: 0, target: 1},
    {source: 1, target: 2}
  ]
};

class ForceLayout extends React.Component {

  componentDidMount() {
    const { width, height } = this.props;

    const simulation = d3.forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(-500))
      .force("link", d3.forceLink(data.links).distance(150));

    this.placeSVG(width, height);

    simulation.on("tick", (e) => {

    });

  }

  placeSVG(width, height) {
    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  render() {
    const { width, height } = this.props;
    const style = {
      height,
      width
    };

    return <div className="canvas" style={style} ref="mountPoint" />;
  }
}

export default ForceLayout;
