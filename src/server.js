const express = require('express');
const next = require('next');
const baseUrl = require('./configs/base_url').baseUrl || '';
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routes = require('./routes');

const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.renderToHTML(req, res, route, query);
});

app.prepare().then(() => {
  const server = express();
  const appRouter = express.Router();
  appRouter.get('/cms', (req, res) => {
    res.status(200).send("Will be CMS!");
  });
  server.use(baseUrl, appRouter);
  server.use(baseUrl, handle);
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});