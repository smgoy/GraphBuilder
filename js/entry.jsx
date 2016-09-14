import React from 'react';
import ReactDOM from 'react-dom';
import ForceLayout from './force_layout';

import * as d3 from 'd3';
window.d3 = d3;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<ForceLayout height={575} width={850} />, root);
});
