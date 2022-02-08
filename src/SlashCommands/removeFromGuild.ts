import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { getSettings } from "../Services/SettingsService";

export = {
  data: new SlashCommandBuilder()
    .setName("removefromguild")
    .setDescription("Remove user from guild")
    .addUserOption((o) =>
      o.setName("user").setDescription("Select a user").setRequired(true)
    ),

  permissionLevel: "mod",
  async execute({ em }, interaction) {
    const user = interaction.options.getUser("user", true);
    if (user.bot) return;
    const settings = await getSettings(em.fork(), interaction.guild!);
    const member = interaction.guild?.members.cache.find(
      (x) => x.id == user.id
    );

    if (!settings?.guildRole)
      return interaction.reply("Rola gildii nie została skonfigurowana.");

    if (!member) return interaction.reply("Nie znaleziono użytkownika");
    const { friendRole, guildRole, guestRole } = settings!;

    var role = interaction.guild?.roles.cache.find(x=>x.id === friendRole);
    if (!role) role = interaction.guild?.roles.cache.find(x=>x.id === guestRole)!;
    await member.roles.add(role);

    const roleToRemove = interaction.guild?.roles.cache.find(
      (x) => x.id === guildRole
    );
    if (!roleToRemove) return interaction.reply("Rola gildii nie istnieje.");
    await member.roles.remove(roleToRemove);

    await interaction.reply(
      member.toString() +
        ", został wyrzucony z gildii!"
    );
  },
} as SlashCommandType;
