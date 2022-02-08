import { SlashCommandBuilder } from "@discordjs/builders";
import { EntityManager } from "@mikro-orm/knex";
import { Client, Collection, CommandInteraction, Message } from "discord.js";

export type SlashCommandType = {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  permissionLevel: "all" | "guildMember" | "mod" | "admin" | "owner";
  execute: (client: SektaClient, interaction: CommandInteraction) => void;
};

export type CommandType = {
  data: {
    name: string;
    description: string;
  };
  permissionLevel: "all" | "guildMember" | "mod" | "admin" | "owner";
  execute: (client: SektaClient, message: Message, ...args: string[]) => void;
};

export type EventType = {
  name: string;
  on?: boolean;
  once?: boolean;
  execute: (...args: any[]) => void;
};

export type SektaClient = {
  em: EntityManager;
  commands: Collection<string, CommandType | SlashCommandType>;
} & Client;

export class IgnoredLogObject {
  users?: String[];
  channels?: String[];
}

export class LogObject {
  id: string;
  name: String;
  on?: Boolean;
  channel?: String;
  ignored?: IgnoredLogObject;
}

export class ReactionRoleConfig {
  emojiId: string;
  roleId: string;
}

export class Names {
  name: string;
  roleId: string;
}

export class ClassEntry {
  name: string;
  added: boolean;
}

export class BlacklistEntry {
  id: string;
  name?: string;
}
