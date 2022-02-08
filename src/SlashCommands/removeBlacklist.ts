import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { removeBlacklist } from "../Services/BlacklistService";

export = {
  data: new SlashCommandBuilder()
    .setName("removeblacklist")
    .setDescription("Remove a user from blacklist")
    .addStringOption((x) =>
      x.setName("id").setDescription("User's ID").setRequired(true)
    ),
  permissionLevel: "mod",

  async execute({ em }, interaction) {
    const id = interaction.options.getString("id", true);
    if (interaction.user.bot) return;

    await removeBlacklist(em.fork(), interaction.guildId!, id);
    const ban =(await interaction.guild?.bans.fetch())!.find(x=>x.user.id === id);
    
    if (ban) await interaction.guild?.bans.remove(id);
    await interaction.reply("Pomyślnie usunięto użytkownika z czarnej listy.");
    return;
  },
} as SlashCommandType;
