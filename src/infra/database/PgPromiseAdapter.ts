import pgp from 'pg-promise'
import DatabaseConnection from "../../application/contracts/DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
	connection: any;

	async connect(): Promise<void> {
		this.connection = pgp()("postgres://postgres:281204@localhost:5432/app");
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}