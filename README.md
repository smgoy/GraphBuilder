# Graph Builder

Graph builder is a simple way to make graphs with nodes and edges.

The application uses JavaScript's D3 force layout, which applies force between nodes as well as attracting the nodes to the center of the page. Force layout also allows for smooth visual transition—keeping the data and the visual experience in sync—when dragging the nodes around the page.

### Build some graphs!

[Live Link](https://smgoy.github.io/GraphBuilder/)

## Initialization

The graph builder initializes to a simple graph with 3 nodes and 2 edges

Here's the data:

```
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
```

## Dragging Nodes

D3's force layout uses a tick function to listen for any node movement. The tick function adjusts nodes positions and insures that they maintain in the bounds of the determined force and charge.

```
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
```

## Adding, Selecting and Deleting Nodes

Users can simply add nodes by clicking the mouse. Additionally users can select a specific node by clicking directly on that node. Nodes have click events that utilize D3 transitions, giving the node to a growing and shrinking effect as well as a thicker border. Users can simply delete these selected nodes by pressing the delete key.

## Adding and Deleting Edges

Edges can be added by selecting a node and subsequently selecting a different node (that does not have a shared edge) in the graph's structure. Deleting edges can be achieved by deleting nodes, where all associated edges will be automatically removed.
