import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandType } from "../../types";

export = {
  data: new SlashCommandBuilder()
    .setName("addtoguild")
    .setDescription("Add a new user to the guild")
    .addUserOption((o) =>
      o.setName("user").setDescription("Select a user").setRequired(true)
    ),

    permissionLevel: "all",
  async execute(__, _) {
    
  },
} as SlashCommandType;
