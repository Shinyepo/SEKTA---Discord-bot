import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "reactionroles" })
export class ReactionRoles {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property({ unique: true })
  messageId: string;

  @Property({ type: "text" })
  config: string;

  @Property({ nullable: true })
  limit?: number;
  
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
