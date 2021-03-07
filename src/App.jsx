import { Link } from 'preact-router/match'

const pages = import.meta.globEager('./pages/*.jsx')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default
  }
})

export function App(json) {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {routes.map(({ path, component: RouteComp }) => {
        return (
          <RouteComp href={path} {...json} />
        )
      })}
    </>
  )
}
