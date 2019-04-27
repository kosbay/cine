const express = require('express');
const next = require('next');
const compression = require('compression');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: 'app', dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    const androidLayout = path.join(__dirname, 'androidLayout');
    const androidLayoutIndexFile = path.join(
      __dirname,
      'androidLayout',
      'index.html'
    );
    server.use('/androidLayout/', express.static(androidLayout));
    server.get('/androidLayout/*', (_, res) => res.sendFile(androidLayoutIndexFile));
    server.get('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) throw err;
      /* eslint-disable-next-line */
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
