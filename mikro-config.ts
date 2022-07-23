import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [],
  type: "",
  host: "",
  port: 5432,
  user: "",
  password: "",
  dbName: ""
} as Options<PostgreSqlDriver>;
