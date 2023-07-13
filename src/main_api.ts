import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import InMemoryRepositoryFactory from "./infra/factory/InMemoryRepositoryFactory";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpControllerServer from "./infra/http/HttpControllerServer";

const connection = new PgPromiseAdapter();
connection.connect();
const httpServer = new ExpressAdapter();
// const repositoryFactory = new DatabaseRepositoryFactory(connection);
const repositoryFactory = new InMemoryRepositoryFactory();
const usecaseFactory = new UsecaseFactory(repositoryFactory);
new HttpControllerServer(httpServer, usecaseFactory);
httpServer.listen(3000);