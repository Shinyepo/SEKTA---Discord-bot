import { GuildMember } from "discord.js";
import { addTraffic } from "../Services/TrafficService";
import { BlacklistEntry, EventType, SektaClient } from "../../types";
import { getSettings } from "../Services/SettingsService";
import { getBlacklist } from "../Services/BlacklistService";

export = {
  name: "guildMemberAdd",
  on: true,
  async execute(client: SektaClient, member: GuildMember) {
    await addTraffic(client.em, member, true);
    console.log("Added new traffic");
    const settings = await getSettings(client.em, member.guild);
    if (!settings) return;
    const list = await getBlacklist(client.em.fork(), member.guild.id);
    if (list) {
      if (!list.blacklist) return;
      const config = JSON.parse(list.blacklist) as BlacklistEntry[];
      const isFound = config.find(x=>x.id === member.id);
      if (isFound) await member.ban({reason: "Blacklisted"});
      return;
    }
    if (!settings.guestRole) return;
    member.roles.add(settings.guestRole);
    
  },
} as EventType;
