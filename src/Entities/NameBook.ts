import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "namebook" })
export class NameBook {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property()
  userId: string;

  @Property()
  roleId: string;

  @Property()
  name: string;

  @Property()
  createdAt: Date = new Date();
}
