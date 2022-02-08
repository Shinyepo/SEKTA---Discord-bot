import { CommandType, ReactionRoleConfig } from "../../types";
import { MessageEmbed } from "discord.js";
import { createConfig } from "../Services/ReactionRoleService";

export = {
  data: {
    name: "reactionroles",
    description: "-",
  },
  permissionLevel: "admin",
  async execute(client, message, type) {
    const roles = message.guild?.roles.cache.filter((x) =>
      x.name.includes(type === "main" ? "[Main]" : "[ALT]")
    )!;
    var desc = "";
    const emojis: Array<{ str: string; id: string; name: string }> = [];
    for (const role of roles) {
      const name = role[1].name.split(
        type === "main" ? "[Main] " : "[ALT] "
      )[1];
      const emoji = message.guild?.emojis.cache.find(
        (x) => x.name?.toLowerCase() === name.toLowerCase()
      );
      emojis.push({
        str: emoji!.toString(),
        id: emoji!.id,
        name: emoji!.name!,
      });
      desc += emoji?.toString() + " - " + name + "\n";
    }

    const em = new MessageEmbed();
    em.setTitle(
      "Wybierz swoją " +
        (type === "main" ? "główną" : "alternatywną") +
        " klasę(limit " +
        (type === "main" ? "1" : "5") +
        ")."
    )
      .setDescription(desc)
      .setColor("#36393f");
    const msg = await message.channel.send({ embeds: [em] });
    const config: Array<ReactionRoleConfig> = [];
    for (const emo of emojis) {
      await msg.react(emo.str);
      config.push({
        emojiId: emo.id,
        roleId: roles.find((x) =>
          x.name.includes((type === "main" ? "[Main] " : "[ALT] ") + emo.name)
        )?.id!,
      });
    }

    await createConfig(
      client.em,
      msg.guildId!,
      msg.id,
      JSON.stringify(config),
      type === "main" ? 1 : 5
    );
  },
} as CommandType;
