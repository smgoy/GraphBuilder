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

const radius = 16;

class ForceLayout extends React.Component {

  componentDidMount() {
    const { width, height } = this.props;
    const center = [width/2, height / 2];

    this.simulation = d3.forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(-300))
      .force("link", d3.forceLink(data.links).strength(1).distance(150))
      .force("center", d3.forceCenter(center[0], center[1]));

    const svg = this.placeSVG(width, height);
    const link = this.placeLinks(svg);
    const node = this.placeNodes(svg);

    this.simulation.on("tick", () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    });

  }

  placeSVG(width, height) {
    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    return svg;
  }

  placeNodes(svg) {
    const node = svg.selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', radius)
      .classed('node', true)
      .call(d3.drag()
        .on("start", this.dragStarted.bind(this))
        .on("drag", this.dragged.bind(this))
        .on("end", this.dragEnded.bind(this)));

    return node;
  }

  dragStarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragEnded(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  placeLinks(svg) {
    const link = svg.selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .classed('link', true);

    return link;
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
