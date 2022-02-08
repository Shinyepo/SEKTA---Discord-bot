import { EventType, SektaClient } from "../../types";
import { setSlashPermissions } from "../Utilities/slashPermissionSetter";
import { consoleTimestamp } from "../Utilities/timestamp";

export = {
  name: "ready",
  once: true,
  execute(client: SektaClient) {
    console.log(consoleTimestamp() + " Logged in as " + client.user!.tag);

    // Load permissions for slash commands ./SlashCommands
    setSlashPermissions(client);
  },
} as EventType;
