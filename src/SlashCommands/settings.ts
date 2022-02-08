import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { changeSetting } from "../Services/SettingsService";

export = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Configure basic settings for guild")
    .addStringOption((x) =>
      x
        .setName("setting")
        .setDescription("Choose a setting to edit")
        .setRequired(true)
        .addChoice("Guest role", "guestRole")
        .addChoice("Friend role", "friendRole")
        .addChoice("Recruit role", "recruitRole")
        .addChoice("Guild member role", "guildRole")
        .addChoice("Moderator role", "modRole")
        .addChoice("Administrator role", "adminRole")
    )
    .addRoleOption((x) =>
      x
        .setName("value")
        .setDescription("Set value for a setting.")
        .setRequired(false)
    ),

  permissionLevel: "admin",
  async execute(client, interaction) {
    const key = interaction.options.getString("setting");
    var value = interaction.options.getRole("value");
    if(!value) value = null;
    const res = await changeSetting(client, interaction.guild!, key!, value!.id);
    if (res) interaction.reply("Pomyślnie zmieniono ustawienia.");
  },
} as SlashCommandType;
