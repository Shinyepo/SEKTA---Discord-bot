import { SlashCommandBuilder } from "@discordjs/builders";
import { Role } from "discord.js";
import { SlashCommandType } from "../../types";
import { getSettings } from "../Services/SettingsService";

export = {
  data: new SlashCommandBuilder()
    .setName("addtoguild")
    .setDescription("Add a new user to the guild")
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
    const { guestRole, friendRole, recruitRole, guildRole } = settings!;
    const settingsRoles = [
      guestRole ?? null,
      friendRole ?? null,
      recruitRole ?? null,
    ];

    const rolesToRemove: Array<Role> = [];
    for (const role of settingsRoles) {

      const foundRole = interaction.guild?.roles.cache.find(
        (x) => x.id === role
      );

      if (foundRole) rolesToRemove.push(foundRole);
    }

    if (rolesToRemove.length < 1)
      await interaction.reply("Role do usunięcia nie zostały skonfigurowane.");

    await member.roles.remove(rolesToRemove);

    const roleToAdd = interaction.guild?.roles.cache.find(
      (x) => x.id === guildRole
    );
    if (!roleToAdd) return interaction.reply("Rola gildii nie istnieje.");
    await member.roles.add(roleToAdd);

    await interaction.reply(
      member.toString() +
        ", witaj w gildii SEKTA. Wejdź na <#940236219000971315> i wybierz klasy którymi grasz!"
    );
  },
} as SlashCommandType;
