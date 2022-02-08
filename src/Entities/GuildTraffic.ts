import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "guildtraffic" })
export class GuildTraffic {
  @PrimaryKey()
  id: number;

  @Property()
  guildId: string;

  @Property()
  userId: string;

  @Property()
  username: string;

  @Property({nullable: true})
  nickname: string;

  @Property()
  joined: boolean;

  @Property()
  createdAt: Date = new Date();
}
