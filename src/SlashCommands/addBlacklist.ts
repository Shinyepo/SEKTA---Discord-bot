import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { addBlacklist } from "../Services/BlacklistService";

export = {
  data: new SlashCommandBuilder()
    .setName("addblacklist")
    .setDescription("Add a user to blacklist")
    .addStringOption((x) =>
      x.setName("id").setDescription("User's ID").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("name").setDescription("Username")
    ),
  permissionLevel: "mod",

  async execute({ em }, interaction) {
    const id = interaction.options.getString("id", true);
    const name = interaction.options.getString("name");
    if (interaction.user.bot) return;

    await addBlacklist(em.fork(), id, name?? "", interaction.guildId!);
    await interaction.guild?.bans.create(id,{reason: "Blacklisted"});

    await interaction.reply("Pomyślnie dodano użytkownika do czarnej listy.");
    return;
  },
} as SlashCommandType;
