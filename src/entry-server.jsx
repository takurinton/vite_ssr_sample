import { render as r } from 'preact-render-to-string' 
import { LocationProvider, Router } from 'preact-iso/router';
import { App } from './App'

export function render(url, context, json) {
  return r(
    <App {...json} />
  )
}
