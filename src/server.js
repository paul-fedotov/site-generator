const express = require('express');
const next = require('next');
const nextRoutes = require('next-routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const routes = (module.exports = nextRoutes());
routes.add('index', '*');

const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  return app.renderToHTML(req, res, route, query);
});

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});