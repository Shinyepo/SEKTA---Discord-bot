import { Message } from "discord.js";
import { CommandType, SektaClient } from "../../types";
import { getSettings } from "../Services/SettingsService";

export = {
  name: "messageCreate",
  on: true,

  async execute(client: SektaClient, message: Message) {
    if (message.author.bot) return;
    const settings = await getSettings(client.em.fork(), message.guild!);

    const prefix = settings?.prefix ?? "+";

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    const command = client.commands.find(
      (x) => x.data.name.toLowerCase() === commandName
    ) as CommandType;

    if (!command) return;

    //Permissions
    if (command.permissionLevel) {
      const perm = command.permissionLevel;
      
      const owner =
        message.author.id === (await client.application?.fetch())!.owner?.id;
      const admin = message.member?.roles.cache.find(
        (x) => x.id === settings.adminRole
      ) !== undefined;
      const mod = message.member?.roles.cache.find(
        (x) => x.id === settings.modRole
      ) !== undefined;
      const guildMember = message.member?.roles.cache.find(
        (x) => x.id === settings.guildRole
      ) !== undefined;
    

      if (perm === "owner") {
        if (!owner) return await missingPermission(message);
      } else if (perm === "admin") {
        if (!admin) {
          if (!owner) return message.reply("Missing permission");
        }
      } else if (perm === "mod") {
        if (!mod) {
          if (!admin) {
            if (!owner) return message.reply("Missing permission");
          }
        }
      } else if (perm === "guildMember") {
        if (!guildMember) {
          if (!mod) {
            if (!admin) {
              if (!owner) return message.reply("Missing permission");
            }
          }
        }
      }

    }
    

    return command.execute(client, message, ...args);
  },
};

const missingPermission = async (message: Message) => {
  return await message.reply("Missing permissions.");
};
