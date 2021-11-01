import { AbstractRepository } from "sdz-agent-types";
export default class MySQLRepository extends AbstractRepository {
    execute(query: string, page?: number, limit?: number): Promise<any>;
}
