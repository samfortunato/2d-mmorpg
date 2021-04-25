import { h, render } from 'preact';
import { BrowserRouter } from 'react-router-dom';

import { App } from './ui/app';

render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.querySelector('#game')
);
