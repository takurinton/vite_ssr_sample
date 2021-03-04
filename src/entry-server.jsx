import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'

export function render(url, context, json) {
  return ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={url} context={context}>
      <App {...json} />
    </StaticRouter>
  )
}
