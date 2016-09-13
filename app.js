//height and width constants of svg canvas
const width = 850;
const height = 575;
let nodeId = 0;

const dataset = [];

//setting node radius constant
const radius = 16;

//creating svg canvas
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

  startLine(d3.mouse(this));

  node.on('mousedown', toggleSelection);
  svg.on('mousemove', stretchLine);

}

function deselectAll(nodes) {
  nodes.classed('selected', false);
}

function placeNode() {
  let coords = d3.mouse(this);

  dataset.push(coords);

  deselectAll(d3.selectAll('.selected'));

  svg.selectAll('circle')
     .data(dataset)
     .enter()
     .append('circle')
     .attr('cx', d => d[0])
     .attr('cy', d => d[1])
     .attr('r', radius)
     .attr('id', nodeId)
     .on('mousedown', toggleSelection);

  nodeId++;
}

function deleteNode() {
  if (d3.event.code === 'Backspace') {
    d3.event.preventDefault();

    const dataToDelete = d3.selectAll('.selected')
                           ._groups[0][0]
                           .__data__;
    const index = dataset.indexOf(dataToDelete);
    dataset.splice(index, 1);
    d3.selectAll('.selected').remove();
  }
}

function startLine(coord) {

  const line = svg.append('line')
     .attr('x1', coord[0])
     .attr('y1', coord[1])
     .attr('x2', coord[0])
     .attr('y2', coord[1])
     .attr('stroke-width', 2)
     .attr('stroke', 'black');

}

function stretchLine() {

  const updateCoords = d3.mouse(this);

  const line = d3.select(this)._groups["0"]["0"].lastChild;
  d3.select(line).attr('x2', updateCoords[0])
                 .attr('y2', updateCoords[1])
                 .classed('drawing', true);

}

function endLine() {
  const coordsToCheck = d3.mouse(this);
  let withinNode = false;
  dataset.forEach( coords => {
    if (coordsToCheck[0] < coords[0] + radius
          && coordsToCheck[0] > coords[0] - radius
          && coordsToCheck[1] < coords[1] + radius
          && coordsToCheck[1] > coords[1] - radius) {
      withinNode = true;
    }
  });

  const line = d3.select(d3.select(this)._groups["0"]["0"].lastChild);
  if (line.classed('drawing') && !withinNode) {
    line.remove();
  }

  svg.on('mousemove', null);
}

svg.on('mousedown', placeNode)
   .on('mouseup', endLine);
d3.select('body').on('keydown', deleteNode)
