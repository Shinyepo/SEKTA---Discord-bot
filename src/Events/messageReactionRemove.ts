import { MessageReaction, User } from "discord.js";
import { EventType, SektaClient } from "../../types";
import { classTrackerEntry } from "../Services/ClassTrackerService";
import { validateRoleConfig } from "../Services/ReactionRoleService";
import { deleteThread, trackRecruit } from "../Services/RecruitService";
import { getSettings } from "../Services/SettingsService";

export = {
  name: "messageReactionRemove",
  on: true,
  async execute(
    client: SektaClient,
    { message, emoji }: MessageReaction,
    user: User
  ) {
    if (user.bot) return;
    const config = await validateRoleConfig(client.em.fork(), message, user, emoji);
    if (!config) return;
    const settings = await getSettings(client.em.fork(), message.guild!)

    const role = config.member.roles.cache.find((x) => x.id === config.role.id);
    if (!role) {
      return;
    }

    config?.member.roles.remove(role);
    if (config.role.id === settings.recruitRole) {
      await trackRecruit(
        client.em.fork(),
        message.guildId!,
        config.member.id,
        false
      );
      await deleteThread(config.member, message);
      return;
    }
    await classTrackerEntry(client.em.fork(), message.guildId!, config.member.id, config.role.name, false);

    console.log("removed");
  },
} as EventType;
