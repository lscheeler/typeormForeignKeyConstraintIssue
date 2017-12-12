"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const Environment_1 = require("./util/Environment");
const typeorm_1 = require("typeorm");
const Parent_1 = require("./entity/Parent");
const Child_1 = require("./entity/Child");
const ParentRepository_1 = require("./repository/ParentRepository");
const InitializeDatabase = require("./util/StartupTasks");
const ChildRepository_1 = require("./repository/ChildRepository");
const uuid = require("uuid");
(async () => {
    const basePath = (Environment_1.default.NODE_ENV === 'development') ? process.cwd() : '/var/lib/interface';
    const databaseOptions = {
        type: 'sqlite',
        database: path.join(basePath, 'db.sqlite'),
        entities: [
            Parent_1.default,
            Child_1.default,
        ],
        logging: true,
        logger: 'advanced-console',
        synchronize: true,
    };
    const databaseConnection = await typeorm_1.createConnection(databaseOptions);
    const parentRepository = databaseConnection.getCustomRepository(ParentRepository_1.default);
    InitializeDatabase.initialize(parentRepository);
    const childRepository = databaseConnection.getCustomRepository(ChildRepository_1.default);
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
    function normalizePort(val, defaultPort = 3000) {
        if (val) {
            const port = parseInt(val, 10);
            if (isNaN(port)) {
                return defaultPort;
            }
            else {
                return port;
            }
        }
        else {
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
//# sourceMappingURL=server.js.map