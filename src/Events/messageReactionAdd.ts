import { MessageReaction, User } from "discord.js";
import { EventType, SektaClient } from "../../types";
import { classTrackerEntry } from "../Services/ClassTrackerService";
import { validateRoleConfig } from "../Services/ReactionRoleService";
import { createThread, trackRecruit } from "../Services/RecruitService";
import { getSettings } from "../Services/SettingsService";

export = {
  name: "messageReactionAdd",
  on: true,
  async execute(client: SektaClient, reaction: MessageReaction, user: User) {
    if (user.bot) return;
    const { message, emoji } = reaction;
    const config = await validateRoleConfig(
      client.em.fork(),
      message,
      user,
      emoji
    );

    if (!config) return;
    const settings = await getSettings(client.em.fork(), message.guild!);

    const role = config.member.roles.cache.find((x) => x.id === config.role.id);
    if (role) {
      console.log("juz ma ta role");
      return;
    }

    if (config.limit === 1) {
      const hasMain = config.member.roles.cache.filter((x) =>
        x.name.includes("[Main]")
      );
      if (hasMain.size > 0) {
        await (await message.fetch()).reactions
          .resolve(reaction)
          .users.remove(user);
        return (await user.createDM()).send(
          "Możesz wybrać tylko jedną główną klasę."
        );
      }
    } else if (config.limit === 5) {
      const hasAlt = config.member.roles.cache.filter((x) =>
        x.name.includes("[ALT]")
      );
      if (hasAlt.size > 4) {
        await (await message.fetch()).reactions
          .resolve(reaction)
          .users.remove(user);
        return (await user.createDM()).send(
          "Możesz wybrać maksymalnie pięć altów."
        );
      }
    }

    config?.member.roles.add(config.role);
    if (config.role.id === settings.recruitRole) {
      await trackRecruit(
        client.em.fork(),
        message.guildId!,
        config.member.id,
        true
      );
      await createThread(config.member, message, settings);
      return;
    }

    await classTrackerEntry(
      client.em.fork(),
      message.guildId!,
      config.member.id,
      config.role.name,
      true
    );

    console.log("added");
    return;
  },
} as EventType;
