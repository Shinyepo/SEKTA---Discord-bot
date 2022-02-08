import { EntityManager } from "@mikro-orm/postgresql";
import { ClassTracker } from "../Entities/ClassTracker";

export const classTrackerEntry = async (
  em: EntityManager,
  guildId: string,
  userId: string,
  className: string,
  added: boolean
) => {
  if (className.includes("[ALT]") || className.includes("[Main]")) return;
  const entry = await em.create(ClassTracker, {
    guildId,
    userId,
    added,
    class: className,
  });
  await em.persistAndFlush(entry);
};

export const getClassHistory = async (
  em: EntityManager,
  guildId: string,
  userId: string
) => {
  const entries = await em.find(ClassTracker, { guildId, userId });
  var list = "";
  for (const entry of entries) {
    var icon = "";
    if (entry.added) icon = "✅";
    else icon = "❌";
    list += entry.class + " " + icon + "\n";
  }
  return list;
};
