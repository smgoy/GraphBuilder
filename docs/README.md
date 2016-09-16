# Graph Builder

## Background

Graph builder is an interactive canvas where the user will be able to add and delete graph nodes and connections between nodes. The user will also be able to drag the graph by clicking and holding a node while moving the cursor. The graph structure will always move back to it's original position on the screen.

## Functionality and MVP

- [ ] Add and remove nodes from the canvas
- [ ] Add and remove node connections from the canvas
- [ ] Drag the graph structure by clicking and holding a node while moving the cursor
- [ ] The structure will always stay in original position
- [ ] Nodes and connections styled to make the structure visually appealing.

## Description

This app will consist of a single screen with a boxed in area where users can begin to build a graph. Nav links to the Github and my LinkedIn will be included at the bottom of the project—below the boxed in screen. Upon entry a modal will pop up with simple instructions on how to proceed with constructing and deconstructing a graph. Controls will include clicking on an area where a node will appear, selecting a node and pressing the delete key to remove a node, selecting and holding a node will drag the structure from the selected node, selecting one node followed by selecting another node will add a connection between to two nodes, and finally deleting a node will remove all connections. Additionally as a bonus feature, a selection form will be included where the user can select predetermined graphical structures to start out with. When selecting the structure the graph will be dynamically build for the user.

## Architecture and Technologies

This project will be implemented with the following technologies:

- `d3.js` for creating and removing node elements.

The project will consist of a css and single `app.js` file using the `d3.js` library.

## Implementation and Timeline

**Day 1:**  Render nodes on the screen when clicking in a particular spot on the canvas. Delete nodes when a node is selected and delete button is pressed. Style nodes.

**Day 2:** Add connections between nodes when a user clicks one node and subsequently clicks on another node. Connections are removed from nodes that are deleted. Style connections.

**Day 3:** Give nodes and the graph the ability to be dragged by a particular node when the user clicks and holds onto a node with the cursor. The graph will always spring back to center.

**Day 4:** Add additional styling and clean up if needed. As well as work on bonus features.

## Bonus Features:

To add some built in functionality to the graph builder, as a bonus feature, the user will be able to select some predetermined graphical figures that will be dynamically built for the user. From this state, the user will then be able to manipulate the graphical structure.
