import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';
import './index.css';
import App from './App';

Modal.setAppElement('#modal');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);