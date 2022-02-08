import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { getClassHistory } from "../Services/ClassTrackerService";

export = {
  data: new SlashCommandBuilder()
    .setName("classhistory")
    .setDescription("Check users class history")
    .addUserOption((o) =>
      o.setName("user").setDescription("Select a user").setRequired(true)
    ),

  permissionLevel: "mod",
  async execute({ em }, interaction) {
    const user = interaction.options.getUser("user", true);
    if (user.bot) return;
    const member = interaction.guild?.members.cache.find(
      (x) => x.id === user?.id
    );
    if (!member) return interaction.reply("Nie ma takiego użytkownika");

    const reply = await getClassHistory(
      em.fork(),
      interaction.guildId!,
      member.id
    );
    if (reply === "")
      return interaction.reply("Nie ma historii postaci dla tego użytkownika");
    return interaction.reply(reply);
  },
} as SlashCommandType;
