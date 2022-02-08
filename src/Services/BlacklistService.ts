import { EntityManager } from "@mikro-orm/postgresql";
import { BlacklistEntry } from "../../types";
import { Blacklist } from "../Entities/Blacklist";

export const addBlacklist = async (
  em: EntityManager,
  id: string,
  name: string,
  guildId: string
) => {
  var list = await getBlacklist(em, guildId);
  if (!list) list = await createBlacklist(em, guildId);

  const newEntry = {
    id,
    name,
  } as BlacklistEntry;
  if (!list.blacklist) {
    const newList: Array<BlacklistEntry> = [];
    newList.push(newEntry);
    list.blacklist = JSON.stringify(newList);
  } else {
    const config = JSON.parse(list.blacklist) as BlacklistEntry[];
    if (config.find((x) => x.id === newEntry.id)) return;
    config.push(newEntry);
    list.blacklist = JSON.stringify(config);
  }

  await em.flush();
  return true;
};

export const createBlacklist = async (em: EntityManager, guildId: string) => {
  const list = em.create(Blacklist, {
    guildId,
  });
  await em.persistAndFlush(list);
  return list;
};

export const getBlacklist = async (em: EntityManager, guildId: string) => {
  const list = await em.findOne(Blacklist, { guildId });
  return list;
};

export const removeBlacklist = async (
  em: EntityManager,
  guildId: string,
  id: string
) => {
  const list = await em.findOne(Blacklist, { guildId });
  if (!list) return;
  if (!list.blacklist) return;
  var config = JSON.parse(list.blacklist) as BlacklistEntry[];
  const idx = config.findIndex((x) => x.id === id);
  config.splice(idx,1);
  console.log(config);
  
  list.blacklist = JSON.stringify(config);
  await em.flush();
};
