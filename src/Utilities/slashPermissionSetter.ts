import { ApplicationCommandPermissionData, Guild } from "discord.js";
import { SektaClient, SlashCommandType } from "../../types";
import { Settings } from "../Entities/Settings";
import { getSettings } from "../Services/SettingsService";
import { consoleTimestamp } from "./timestamp";

export const setSlashPermissions = async (client: SektaClient, guild?: Guild) => {  
  if (!guild) guild = client.guilds.cache.find((x) => x.id === process.env.SEKTA);
  const commands = await guild!.commands.fetch();
  console.log(consoleTimestamp() + " Setting permissions for Slash Commands.");
  const settings = await getSettings(client.em.fork(), guild!);
  const permissions = await preparePermissions(settings!, client);

  commands.forEach(async (command) => {
    const permLevel = client.commands.find(
      (x) => x.data.name === command.name
    ) as SlashCommandType;
    
    if (permLevel.permissionLevel !== "all") {
      command.setDefaultPermission(false);
      const a = permissions[0][permLevel.permissionLevel];

      command.permissions.add({ permissions: a });
    }
  });
};

const preparePermissions = async (
  { modRole, adminRole, guildRole }: Settings,
  client: SektaClient
) => {
  const template: Array<ApplicationCommandPermissionData> = [];
  const id = await client.application?.fetch();
  if (guildRole)
    template.push({
      id: guildRole,
      type: "ROLE",
      permission: true,
    });
  if (modRole)
    template.push({
      id: modRole,
      type: "ROLE",
      permission: true,
    });
  if (adminRole)
    template.push({
      id: adminRole,
      type: "ROLE",
      permission: true,
    });
  if (id)
    template.push({
      id: id.owner!.id,
      type: "USER",
      permission: true,
    });
  const guildMember = template;
  const mod = template.filter((x) => x.id !== guildRole);
  const admin = mod.filter((x) => x.id !== modRole);
  const owner = admin.filter((x) => x.id !== adminRole);

  return [
    {
      guildMember: guildMember,
      mod: mod,
      admin: admin,
      owner: owner,
    },
  ];
};
