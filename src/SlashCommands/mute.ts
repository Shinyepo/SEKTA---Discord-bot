import { SlashCommandBuilder } from "@discordjs/builders";
import { DiscordAPIError } from "@discordjs/rest";
import { SlashCommandType } from "../../types";

export = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute selected user for a given time.")
    .addUserOption((o) =>
      o.setName("user").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("time").setDescription("Mute duration in minutes")
    )
    .addStringOption((o) =>
      o.setName("reason").setDescription("Specify a reason")
    ),

  permissionLevel: "mod",
  async execute(_, interaction) {
    try {
      const user = interaction.options.getUser("user");
      if (user?.bot) return;
      const member = interaction.guild?.members.cache.find(
        (x) => x.id === user?.id
      );

      const time = interaction.options.getString("time") ?? "";
      const reason = interaction.options.getString("reason") ?? "";

      const parsed = parseInt(time);
      const duration = parsed * 60 * 1000;
      const res = await member?.timeout(duration, reason);
      if (!duration) {
        interaction.reply(
          member?.toString() + " został siłą wyciągniety z przerwy."
        );
        return;
      }
      interaction.reply(
        member?.toString() +
          " wysłany na przerwe do " +
          res?.communicationDisabledUntil?.toLocaleString()
      );
    } catch (e) {
      const err = e as DiscordAPIError;
      interaction.reply(err.message);
    }
  },
} as SlashCommandType;
