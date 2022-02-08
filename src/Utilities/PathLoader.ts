import fs from "fs";
import { EventType, SektaClient, SlashCommandType } from "../../types";
import { consoleTimestamp } from "./timestamp";
import path from "path";
import { SlashCommandBuilder } from "@discordjs/builders";

export const loadCommands = async (
  client: SektaClient,
  folderPath: string,
  name?: string
): Promise<void> => {
  const start = Date.now();
  const joinedPath = path.join(__dirname, "..", folderPath);

  const commandFiles = fs
    .readdirSync(joinedPath)
    .filter((x) => x.endsWith(".js"));

  for (const file of commandFiles) {
    const fileName = file.split(".")[0];
    const command = (await import(
      joinedPath + "/" + fileName
    )) as SlashCommandType;

    if (command.permissionLevel) {
      if (command.data instanceof SlashCommandBuilder) {
        if (command.permissionLevel !== "all")
          command.data.setDefaultPermission(false);
      }
    }

    client.commands.set(command.data.name, command);
  }

  const end = Date.now();
  const sw = (end - start) / 1000;
  console.log(
    consoleTimestamp() +
      ` Finished loading ${name || folderPath} in ` +
      sw +
      "s"
  );
};

export const loadEvents = async (client: SektaClient): Promise<void> => {
  const start = Date.now();
  const joinedPath = path.join(__dirname, "..", "Events");
  const eventFiles = fs
    .readdirSync(joinedPath)
    .filter((x) => x.endsWith(".js"));
  var i = 0;
  for (const file of eventFiles) {
    const fileName = file.split(".")[0];
    const event = (await import(`${joinedPath}/${fileName}`)) as EventType;

    if (event.once) {
      client.once(event.name, (...args: any) => event.execute(...args));
      i++;
    } else if (event.on) {
      client.on(event.name, (...args: any) => event.execute(client, ...args));
      // client.on(event.name, event.execute.bind(null, client));
      i++;
    }
  }
  const end = Date.now();
  const sw = (end - start) / 1000;
  console.log(
    consoleTimestamp() + " Finished loading " + i + " Events in " + sw + "s"
  );
};
