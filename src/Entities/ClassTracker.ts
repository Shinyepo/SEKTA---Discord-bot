import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "classtracker" })
export class ClassTracker {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property()
  userId: string;

  @Property()
  class: string;

  @Property()
  added: boolean;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
