import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { getNames } from "../Services/NameBookService";

export = {
  data: new SlashCommandBuilder()
    .setName("getnames")
    .setDescription("Check user character names(if the user set any).")
    .addUserOption((o) =>
      o.setName("user").setDescription("Select a user").setRequired(true)
    ),
  permissionLevel: "mod",

  async execute({ em }, interaction) {
    const user = interaction.options.getUser("user", true);
    if (user.bot) return;
    var member =
      interaction.guild?.members.cache.find((x) => x.id == user.id) ??
      interaction.guild?.members.cache.find(
        (x) => x.id === interaction.user.id
      );

    const names = await getNames(em.fork(), interaction.guildId!, member!.id);
    if (names.length < 1)
      return interaction.reply("User has no character names set.");

    var reply = "";
    for (const entry of names) {
      const role = interaction.guild?.roles.cache.find(
        (x) => x.id === entry.roleId
      );
      if (!role) continue;
      reply += role.name + " -> " + entry.name + "\n";
    }

    interaction.reply(reply);
    return;
  },
} as SlashCommandType;
