import { EntityManager } from "@mikro-orm/postgresql";
import { GuildMember, Message, PartialMessage, TextChannel } from "discord.js";
import { RecruitTracer } from "../Entities/RecruitTracker";
import { Settings } from "../Entities/Settings";

export const trackRecruit = async (
  em: EntityManager,
  guildId: string,
  userId: string,
  added: boolean
) => {
  const newEntry = await em.create(RecruitTracer, {
    guildId,
    userId,
    started: added,
  });
  await em.persistAndFlush(newEntry);
};

export const createThread = async (
  user: GuildMember,
  message: PartialMessage | Message<boolean>,
  settings: Settings
) => {
  if (settings.modRole === null || settings.modRole === undefined) return;

  const channel = message.channel as TextChannel;
  const thread = await channel.threads.create({
    name: user.displayName ?? user.user.username,
    type: "GUILD_PRIVATE_THREAD",
    autoArchiveDuration: "MAX",
  });
  await thread.members.add(user);

  await thread.send(
    "Niedługo odezwie się do Ciebie <@&" +
      settings.modRole.toString() +
      "> i przeprowadzi z Tobą proces rekrutacji."
  );
  await thread.setInvitable(false);
  return;
};

export const deleteThread = async (
  user: GuildMember,
  message: PartialMessage | Message<boolean>
) => {
  const channel = message.channel as TextChannel;

  await channel.threads.cache
    .find((x) => x.name === user.displayName ?? user.user.username)
    ?.delete();
  return;
};
