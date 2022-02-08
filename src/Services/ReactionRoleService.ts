import { EntityManager } from "@mikro-orm/postgresql";
import {
  GuildEmoji,
  GuildMember,
  Message,
  PartialMessage,
  ReactionEmoji,
  Role,
  User,
} from "discord.js";
import { ReactionRoleConfig } from "../../types";
import { ReactionRoles } from "../Entities/ReactionRoles";

export const getRole = async (
  em: EntityManager,
  guildId: string,
  emojiId: string,
  messageId: string
) => {
  const config = await em.findOne(ReactionRoles, { guildId, messageId });
  if (!config) return null;
  const roleConfig = JSON.parse(config.config) as ReactionRoleConfig[];
  var role;
  for (const item of roleConfig) {
    if (item.emojiId === emojiId) {
      role = item.roleId;
    }
  }

  return { role: role, limit: config.limit };
};

export const createConfig = async (
  em: EntityManager,
  guildId: string,
  messageId: string,
  config: string,
  limit?: number
) => {
  const newEntity = em.create(ReactionRoles, {
    guildId,
    messageId,
    config,
    limit
  });
  await em.persistAndFlush(newEntity);
  return newEntity;
};

export const addConfig = async (
  em: EntityManager,
  guildId: string,
  messageId: string,
  emojiId: string,
  roleId: string
) => {
  const config = await em.findOne(ReactionRoles, { guildId, messageId });
  if (!config) {
    var newRoleConfig: Array<ReactionRoleConfig> = [
      {
        emojiId,
        roleId,
      },
    ];
    await createConfig(em.fork(), guildId, messageId, JSON.stringify(newRoleConfig));
    return;
  }
  var roleConfig = JSON.parse(config.config) as ReactionRoleConfig[];
  if (roleConfig.find((x) => x.roleId === roleId || x.emojiId === emojiId))
    return console.log("configuration exists");
  if (roleConfig)
    roleConfig.push({
      emojiId,
      roleId,
    });
  config.config = JSON.stringify(roleConfig);
  await em.flush();
  return;
};

export const validateRoleConfig = async (
  em: EntityManager,
  { guild, id }: Message | PartialMessage,
  user: User,
  emoji: GuildEmoji | ReactionEmoji
): Promise<{ role: Role; member: GuildMember, limit: number } | null> => {
  const config = await getRole(em.fork(), guild!.id, emoji.id ?? emoji.name!, id);
  
  if (!config) return null;

  const role = guild?.roles.cache.find((x) => x.id === config.role);

  if (!role) {
    console.log("nie ma takiej roli");
    return null;
  }

  var member = guild?.members.cache.find((x) => x.id === user.id);
  if (!member) {
    console.log("nie ma user");
    return null;
  }

  return {
    role: role,
    member: member,
    limit: config.limit ?? 0
  };
};
