import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "recruittracker" })
export class RecruitTracer {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property()
  userId: string;

  @Property()
  started: boolean;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
