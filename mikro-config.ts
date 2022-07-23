import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export default {
  entities: [],
  type: "",
  host: "",
  port: 5432,
  user: "",
  password: "",
  dbName: ""
} as Options<PostgreSqlDriver>;
