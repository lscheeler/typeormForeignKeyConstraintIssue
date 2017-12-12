import * as bodyParser from 'body-parser';
import cookieParser = require('cookie-parser');
import express = require('express');
import * as session from 'express-session';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import Environment from './util/Environment';
import connectFlash = require('connect-flash');
import { createConnection, ConnectionOptions } from 'typeorm';
import Parent from './entity/Parent';
import Child from './entity/Child';
import ParentRepository from './repository/ParentRepository';
import * as InitializeDatabase from './util/StartupTasks';
import ChildRepository from './repository/ChildRepository';
import * as uuid from 'uuid';

(async () => {

  const basePath = (Environment.NODE_ENV === 'development') ? process.cwd() : '/var/lib/interface';

  // CONFIGURE DATABASE CONNECTION OPTIONS
  const databaseOptions: ConnectionOptions = {
    type: 'sqlite',
    database: path.join(basePath, 'db.sqlite'),
    entities: [
      Parent,
      Child,
    ],
    logging: true,
    logger: 'advanced-console',
    synchronize: true,
  };

  // INITIALIZE DATABASE
  const databaseConnection = await createConnection(databaseOptions);
  const parentRepository = databaseConnection.getCustomRepository(ParentRepository);
  InitializeDatabase.initialize(parentRepository);

  // *TEST* ADD NEW CHILD WITH NEW PARENT
  const childRepository = databaseConnection.getCustomRepository(ChildRepository);
  const child = await childRepository.findOrCreate("sally.may@test.com", "Sally May", uuid());

  const app = express();

  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const viewDir = path.join(rootDir, 'views');
  const nodeModulesDir = path.join(rootDir, 'node_modules');
  const bootstrapDir = path.join(nodeModulesDir, 'bootstrap', 'dist');
  const jqueryDir = path.join(nodeModulesDir, 'jquery', 'dist');
  const clipboardDir = path.join(nodeModulesDir, 'clipboard', 'dist');
  const normalizeDir = path.join(nodeModulesDir, 'normalize.css', 'normalize.css');

  app.use(express.static(publicDir));
  app.use('/bootstrap', express.static(bootstrapDir));
  app.use('/jquery', express.static(jqueryDir));
  app.use('/clipboard', express.static(clipboardDir));
  app.use('/stylesheets/normalize.css', express.static(normalizeDir));

  function normalizePort(val: string | undefined, defaultPort: number = 3000): number {
    if (val) {
      const port = parseInt(val, 10);
      if (isNaN(port)) {
        return defaultPort;
      } else {
        return port;
      }
    } else {
      return defaultPort;
    }
  }

  const port = normalizePort(process.env.PORT);

  const server = app.listen(port, 'localhost');

  server.on('listening', () => {
    const addr = server.address();
    console.log(`App is running in ${app.get('env')} mode.`);
    console.log(`Listening on ${addr.family} http://${addr.address}:${addr.port}`);
    console.log('Press CTRL-C to stop\n');
  });
})();
