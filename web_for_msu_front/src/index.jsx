import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import store from './store/index.js';
import Root from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root/>
  </Provider>
);
