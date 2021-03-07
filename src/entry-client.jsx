import hydrate from 'preact-iso/hydrate';
import { Router } from 'preact-router'
import { App } from './App'

const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));

hydrate(
  <Router>
    <App {...json} />
  </Router>,
  document.getElementById('takurinton')
)
