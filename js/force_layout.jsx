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
  constructor(props) {
    super(props);
    this.state = {
      i: data.nodes.length,
      data: data
    };
  }

  componentDidMount() {
    const { width, height } = this.props;
    const center = [width/2, height / 2];

    this.simulation = d3.forceSimulation(this.state.data.nodes)
      .force("charge", d3.forceManyBody().strength(-300))
      .force("link", d3.forceLink(this.state.data.links).strength(.5).distance(150))
      .force("center", d3.forceCenter(center[0], center[1]));

    this.placeSVG(width, height);
    this.placeLinks();
    this.placeNodes();

    this.simulation.on("tick", () => {
      this.link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      this.node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    });

  }

  placeSVG(width, height) {
    this.svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .on('mousedown', this.addNode.bind(this));
  }

  placeNodes() {
    this.node = this.svg.selectAll('circle')
      .data(this.state.data.nodes)
      .enter()
      .append('circle')
      .attr('r', radius)
      .attr('stroke-width', 1.5)
      .classed('node', true)
      .on('mousedown', this.nodeMouseDown)
      .call(d3.drag()
        .on("start", this.dragStarted.bind(this))
        .on("drag", this.dragged)
        .on("end", this.dragEnded.bind(this)));
  }

  placeLinks() {
    this.link = this.svg.selectAll('line')
      .data(this.state.data.links)
      .enter()
      .append('line')
      .classed('link', true);
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

  addNode() {
    this.simulation.stop();
    this.state.data.nodes.push({index: this.state.i++});

    const { width, height } = this.props;
    const center = [width/2, height / 2];

    this.simulation = d3.forceSimulation(this.state.data.nodes)
      .force("charge", d3.forceManyBody().strength(-300))
      .force("link", d3.forceLink(this.state.data.links).strength(.5).distance(150))
      .force("center", d3.forceCenter(center[0], center[1]));

      this.placeSVG(width, height);
      this.placeLinks();
      this.placeNodes();

      this.simulation.on("tick", () => {
        this.link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        this.node
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);
      });
  }

  nodeMouseDown() {
    d3.event.stopPropagation();

    d3.selectAll('.selected').transition()
      .duration(500)
      .attr('stroke-width', 1.5);

    const node = d3.select(this);

    node.classed('selected', true);
    node.transition()
      .duration(100)
      .attr('r', 19)
      .transition()
      .duration(100)
      .attr('r', 16)
      .duration(300)
      .attr('stroke-width', 3);
  }

  deselectAll() {
    this.nodes.transition()
      .duration(100)
      .attr('r', 16);
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
