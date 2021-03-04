import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
console.log('takurinton', json)

ReactDOM.hydrate(
  <BrowserRouter>
    <App {...json} />
  </BrowserRouter>,
  document.getElementById('takurinton')
)
