const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.NODE_PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/d/:id', (req, res) => {
    const actualPage = '/destination'
    const queryParams = { ...{ slug: req.params.id }, ...req.query }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/d/:id/:category', (req, res) => {
    const actualPage = '/destination'
    const queryParams = { ...{ slug: req.params.id, category:req.params.category }, ...req.query }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/hotel/:id', (req, res) => {
    const actualPage = '/single-item'
    const queryParams = { slug: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on port ',port)
  })

  server.use(express.static(__dirname + '/static'));
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})