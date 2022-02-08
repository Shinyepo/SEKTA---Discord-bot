import { Guild, TextChannel } from "discord.js";
import { CommandType, SektaClient } from "../../types";
import { Settings } from "../Entities/Settings";
import { addConfig } from "../Services/ReactionRoleService";

export = {
  data: {
    name: "esp",
    description: "Testing ground",
  },
  permissionLevel: "owner",
  async execute(client, message, type, messageId, emoji, role) {
    const context = client.em.fork();
    if (type === "generate") {
      const newEntry = context.create(Settings, {
        guildId: "871135618061709384",
        prefix: "+",
      });

      await context.persistAndFlush(newEntry);
      message.reply("dodaned");
    }

    if (type === "emit") {
      client.emit("guildMemberAdd", message.member!);
    }

    if (type === "emoji") {
      await (await (message.channel as TextChannel).messages.fetch())
        .find((x) => x.id === "940375872383373353")
        ?.react("👍");
    }

    if (type === "roleconfig") {
      const roleCheck = validateRole(message.guild!, role);
      if (!roleCheck) return console.log("rola nie istnieje");
      const emojiCheck = validateEmoji(client, emoji);
      if (!emojiCheck) return console.log("emoji nie istnieje");
      await addConfig(context, message.guildId!, messageId, emoji, role);
      return;
    }

    return;
  },
} as CommandType;

const validateRole = (guild: Guild, roleId: string) => {
  return guild.roles.cache.find((x) => x.id === roleId);
};
const validateEmoji = (client: SektaClient, emojiId: string) => {
  return client.emojis.cache.find((x) => x.id === emojiId);
};
