"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
class Connector {
    constructor(config) {
        this.setConfig(config);
    }
    async connect() {
        if (!this.connection) {
            try {
                this.connection = await promise_1.default.createConnection({
                    user: this.config.username,
                    password: this.config.password,
                    host: this.config.host,
                    database: this.config.schema,
                    port: this.config.port,
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async close() {
        if (this.connection) {
            try {
                await this.connection.end();
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async execute(query) {
        let resultSet = [];
        if (!this.connection) {
            await this.connect();
        }
        try {
            const response = await this.connection.query(query);
            if (response) {
                resultSet = response[0];
            }
        }
        catch (e) {
            console.log(e);
        }
        return resultSet;
    }
    setConfig(config) {
        this.config = config;
        return this;
    }
}
exports.default = Connector;
