const data = {
  nodes: [
    {index: 0},
    {index: 1},
    {index: 2}
  ],
  node_count: 3,
  links: [
    {source: 0, target: 1},
    {source: 1, target: 2}
  ]
};

const radius = 16;

const width = 850;
const height = 575;
const center = [width/2, height / 2];

d3.select('body').on('keydown', deleteNode);

const force = d3.layout.force()
  .nodes(data.nodes)
  .links(data.links)
  .size([width, height])
  .linkDistance(150)
  .charge(-500);

const links = force.links();
const nodes = force.nodes();

const svg = d3.select("body")
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'canvas')
  .on('mousedown', addNode);

const link = svg.selectAll('line')
  .data(data.links)
  .enter()
  .append('line')
  .classed('link', true);

let node = svg.selectAll('circle')
  .data(data.nodes)
  .enter()
  .append('circle')
  .attr('r', radius)
  .attr('stroke-width', 1.5)
  .classed('node', true)
  .on('mousedown', nodeMouseDown);

force.on("tick", () => {
  link
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);

  node
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .call(force.drag());
});

function nodeMouseDown() {
  d3.event.stopPropagation();

  clearSelection();

  const node = d3.select(this);

  node.classed('selected', true);
  node.transition()
    .duration(100)
    .attr('r', 19)
    .transition()
    .duration(100)
    .attr('r', radius)
    .duration(300)
    .attr('stroke-width', 3);
}

function clearSelection() {
  d3.selectAll('.selected').transition()
    .duration(500)
    .attr('stroke-width', 1.5);
}

function addNode() {
  const pos = d3.mouse(this);
  data.nodes.push({index: data.node_count++, x: pos[0], y: pos[1]});
  clearSelection();
  update();
}

function deleteNode() {
  if(d3.event.code === 'Backspace') {
    d3.event.preventDefault();

    const nodeIndex = d3.selectAll('.selected').data()[0].index;
    data.nodes = data.nodes.filter( nodeObj => nodeObj.index != nodeIndex);

    update();
  }
}

function update() {
  // const linkToUpdate = svg.selectAll(".link")
  //           .data(links, d =>  d.source.id + "-" + d.target.id);
  //
  // linkToUpdate.enter()
  //   .append("line")
  //   .attr("class", "link");

  node = node.data(data.nodes);

  node.enter()
    .append("circle")
    .attr("class", 'node')
    .attr("r", radius)
    .attr('stroke-width', 1.5)
    .on('mousedown', nodeMouseDown);

  node.exit().remove();

  force.start();

}

force.start();


//   placeSVG(width, height) {
//     this.svg = d3.select(this.refs.mountPoint)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .on('mousedown', this.addNode.bind(this));
//   }
//
//   placeNodes() {
//     this.node = this.svg.selectAll('circle')
//       .data(this.state.data.nodes)
//       .enter()
//       .append('circle')
//       .attr('r', radius)
//       .attr('stroke-width', 1.5)
//       .classed('node', true)
//       .on('mousedown', this.nodeMouseDown)
//       .call(d3.drag()
//         .on("start", this.dragStarted.bind(this))
//         .on("drag", this.dragged)
//         .on("end", this.dragEnded.bind(this)));
//   }
//
//   placeLinks() {
//     this.link = this.svg.selectAll('line')
//       .data(this.state.data.links)
//       .enter()
//       .append('line')
//       .classed('link', true);
//   }
//
//   dragStarted(d) {
//     if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }
//
//   dragged(d) {
//     console.log(d3.selectAll('.node').data()[0]);
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//   }
//
//   dragEnded(d) {
//     if (!d3.event.active) this.simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//   }
//
//   addNode() {
//     this.state.data.nodes = this.state.data.nodes.concat({index: this.state.i++});
//     this.placeNodes();
//     this.simulation.nodes(this.state.data.nodes);
//     // this.simulation.force('link').links(this.state.data.links);
//     this.simulation.restart();
//   }
//
//   nodeMouseDown() {
//     d3.event.stopPropagation();
//
//     d3.selectAll('.selected').transition()
//       .duration(500)
//       .attr('stroke-width', 1.5);
//
//     const node = d3.select(this);
//
//     node.classed('selected', true);
//     node.transition()
//       .duration(100)
//       .attr('r', 19)
//       .transition()
//       .duration(100)
//       .attr('r', radius)
//       .duration(300)
//       .attr('stroke-width', 3);
//   }
//
//   render() {
//     const { width, height } = this.props;
//     const style = {
//       height,
//       width
//     };
//
//     return <div className="canvas" style={style} ref="mountPoint" />;
//   }
// }
//
// export default ForceLayout;
