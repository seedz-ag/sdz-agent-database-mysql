import {
  ConnectorInterface,
  DatabaseRow,
} from "sdz-agent-types";

import  mysql, { Connection, RowDataPacket } from "mysql2/promise";

export default class Connector implements ConnectorInterface {
  private connection: Connection;
  private config: any;

  constructor(config: any) {
    this.setConfig(config);
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      try {
        this.connection = await mysql.createConnection(
          { 
            user: this.config.username,
            password: this.config.password,
            host: this.config.host,
            database: this.config.database,
            port: this.config.port,
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  async close(): Promise<void> {
    if (this.connection) {
      try {
         await this.connection.end();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async execute(query: string): Promise<DatabaseRow[]> {
    let resultSet: DatabaseRow[] = [];
    if (!this.connection) {
      await this.connect();
    }
    try {
      const response = await this.connection.query<RowDataPacket[]>(query);
      if (response) {
        resultSet = response[0];
      }
    } catch (e) {
      console.log(e);
    }
    return resultSet;
  }

  private setConfig(config: any): this {
    this.config = config;
    return this;
  }
}
