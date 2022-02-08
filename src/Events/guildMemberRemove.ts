import { GuildMember } from "discord.js";
import { addTraffic } from "../Services/TrafficService";
import { EventType, SektaClient } from "../../types";

export = {
  name: "guildMemberRemove",
  on: true,
  async execute(client: SektaClient, member: GuildMember) {
    await addTraffic(client.em, member, false);
    console.log("Added new traffic");
  },
} as EventType;
