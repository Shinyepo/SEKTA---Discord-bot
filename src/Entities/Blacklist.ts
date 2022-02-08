import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "blacklist" })
export class Blacklist {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property({type: "text", nullable: true})
  blacklist?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
