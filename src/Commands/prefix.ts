import { prefixChange } from "../Services/SettingsService";
import { CommandType } from "../../types";

export = {
  data: {
    name: "prefix",
    description: "You can change prefix with this command",
  },
  permissionLevel: "mod",
  async execute(client, message, arg) {
    await prefixChange(client.em.fork(), message, arg);
  },
} as CommandType;
