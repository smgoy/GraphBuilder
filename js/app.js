let data = {
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

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
      }
  });
};

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

let link = svg.selectAll('line')
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

  const firstNode = d3.selectAll('.selected').data()[0];

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

  addEdge(firstNode, d3.select(this).data()[0]);

}

function clearSelection() {
  d3.selectAll('.selected')
    .classed('selected', false)
    .transition()
    .duration(500)
    .attr('stroke-width', 1.5);

}

function addNode() {
  const pos = d3.mouse(this);
  data.nodes.push({index: data.node_count++, x: pos[0], y: pos[1]});

  update();
}

function deleteNode() {
  if(d3.event.code === 'Backspace') {
    d3.event.preventDefault();

    const nodeData = d3.selectAll('.selected').data()[0];
    if (!nodeData) return null;
    const nodeIndex = data.nodes.indexOf(nodeData);
    data.nodes.splice(nodeIndex, 1);
    const edges = data.links.filter(linkObj => {
      return (
        linkObj.source.index === nodeIndex || linkObj.target.index === nodeIndex
      );
    });
    edges.forEach( edge => {
      const edgeIndex = data.links.indexOf(edge);
      data.links.splice(edgeIndex, 1);
    });

    update();
  }
}

function addEdge(node1, node2) {
  if (!node1) return null;
  if (node1.index === node2.index) return null;
  let overlap = false;
  data.links.forEach( linkObj => {
    if (linkObj.source.index === node1.index && linkObj.target.index === node2.index
        || linkObj.source.index === node2.index && linkObj.target.index === node1.index) {
      overlap = true;
    }
  });
  if (overlap) return null;
  data.links.push({source: node1.index, target: node2.index});

  update();
}

function update() {
  link = link.data(data.links);

  link.enter()
    .append("line")
    .attr("class", "link");

  link.exit().remove();

  d3.selectAll('line')
    .moveToBack();

  node = node.data(data.nodes);

  node.enter()
    .append("circle")
    .attr("class", 'node')
    .attr("r", radius)
    .attr('stroke-width', 1.5)
    .on('mousedown', nodeMouseDown);

  node.exit().remove();

  force.start();
  clearSelection();

}

force.start();
