import { render as r } from 'preact-render-to-string' 
import { Router } from 'preact-router' 
import { App } from './App'

const customHistory = {
  location: { pathname: "/" },
  listen: () => {}
};

export function render(url, context, json) {
  return r(
    <Router url={url} history={customHistory}>
      <App {...json} />
    </Router>, 
    context
  )
}
