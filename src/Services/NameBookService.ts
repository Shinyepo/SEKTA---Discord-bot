import { EntityManager } from "@mikro-orm/postgresql";
import { Names } from "../../types";
import { NameBook } from "../Entities/NameBook";

export const setName = async (
  em: EntityManager,
  guildId: string,
  userId: string,
  roleId: string,
  name: string
) => {
  const entry = await em.findOne(NameBook, { guildId, userId, roleId });
  if (!entry) {
    const newEntry = em.create(NameBook, {
      guildId,
      roleId,
      userId,
      name,
    });

    await em.persistAndFlush(newEntry);
    return;
  }
  entry.name = name;
  await em.flush();
  return;
};

export const getNames = async (
  em: EntityManager,
  guildId: string,
  userId: string
) => {
  const entries = await em.find(NameBook, { guildId, userId });
  var names: Array<Names> = [];
  for (const entry of entries) {
    names.push({
      name: entry.name,
      roleId: entry.roleId,
    });
  }

  return names;
};
