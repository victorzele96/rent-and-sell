import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ContextWrapper from './shared/context/ContextWrapper';

import App from "./App";

import './index.css';

ReactDOM.render(
  <ContextWrapper>
    <Router>
      <App />
    </Router>
  </ContextWrapper>,
  document.getElementById("root")
);
