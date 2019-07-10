import { h } from 'preact';
import App from './App';
import express from 'express';
import render from 'preact-render-to-string';
import Helmet from 'preact-helmet';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const markup = render(<App url={req.url} />);
    const head = Helmet.rewind();

    res.status(200).send(
    `<!doctype html>
    <html lang="">
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
      </head>
      <body>
        <div id="root">${markup}</div>
      </body>
    </html>`
    );
  });

export default server;
