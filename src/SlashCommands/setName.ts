import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";
import { setName } from "../Services/NameBookService";

export = {
  data: new SlashCommandBuilder()
    .setName("setname")
    .setDescription("Set a name for your character")
    .addRoleOption((x) =>
      x.setName("class").setDescription("Choose class").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("name").setDescription("Your characters name").setRequired(true)
    ),
  permissionLevel: "guildMember",

  async execute({ em }, interaction) {
    const role = interaction.options.getRole("class", true);
    const name = interaction.options.getString("name", true);
    if (interaction.user.bot) return;

    if (!role.name.includes("[Main]") && !role.name.includes("[ALT]")) {
      return await interaction.reply("To nie jest prawidłowa klasa postaci.");
    }

    await setName(
      em.fork(),
      interaction.guildId!,
      interaction.user.id,
      role.id,
      name
    );

    await interaction.reply("Pomyślnie zapisano nick postaci");
    return;
  },
} as SlashCommandType;
