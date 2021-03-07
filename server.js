// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true
      }
    })
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use(async (req, res) => {
    try {
      const url = req.originalUrl
      const path = req.path
      let json = {}

      if (path === '/') {
        json = await getPosts()
      }

      let template, render
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const context = {}
      const _html = render(url, context, json)

      if (context.url) {
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--takurinton-->`, _html).replace(`_takurinton`, JSON.stringify(json))
      res.status(200).set({ 'Content-Type': 'text/html' })
      res.send(html)

    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  const getPosts = async () => {
    return await fetch('https://api.takurinton.com/blog/v1/')
    .then(res => res.json())
  } 

  return { app, vite }
}


if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
}
// hoge
exports.createServer = createServer
