import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpControllerServer from "./infra/http/HttpControllerServer";
import IdGenerator from "./infra/utils/id-generator";

const connection = new PgPromiseAdapter();
connection.connect();
const httpServer = new ExpressAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const idGenerator = new IdGenerator();
const usecaseFactory = new UsecaseFactory(repositoryFactory, idGenerator);
new HttpControllerServer(httpServer, usecaseFactory);
httpServer.listen(3000);