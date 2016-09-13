//height and width constants of svg canvas
const width = 850;
const height = 575;

const dataset = [];

//setting node radius constant
const radius = 16;

const svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

function toggleSelection() {
  d3.event.stopPropagation();

  deselectAll(d3.selectAll('.selected'));

  const node = d3.select(this);
  const selected = node.classed('selected');

  if (selected) {
    node.classed('selected', false);
  } else {
    node.classed('selected', true);
  }

  node.on('click', toggleSelection);
}

function deselectAll(nodes) {
  nodes.classed('selected', false);
}

function placeNode() {
  let coords = d3.mouse(this);

  dataset.push(coords);

  svg.selectAll('circle')
     .data(dataset)
     .enter()
     .append('circle')
     .attr('cx', d => d[0])
     .attr('cy', d => d[1])
     .attr('r', radius)
     .on('click', toggleSelection);
}

svg.on('click', placeNode);
