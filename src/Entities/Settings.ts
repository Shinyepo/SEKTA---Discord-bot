import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "settings" })
export class Settings {
  [key: string]: any;
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  guildId: string;

  @Property()
  prefix: string;

  @Property({ nullable: true })
  modRole?: string;

  @Property({ nullable: true })
  adminRole?: string;

  @Property({ nullable: true })
  guestRole?: string;

  @Property({ nullable: true })
  friendRole?: string;

  @Property({ nullable: true })
  recruitRole?: string;

  @Property({ nullable: true })
  guildRole?: string;

  @Property({ nullable: true, type: "text" })
  mainRoles?: string;

  @Property({ nullable: true, type: "text" })
  altRoles?: string;

  // @Property({ nullable: true, type: "text" })
  // disabledCommands: string;

  @Property({ nullable: true })
  systemNotice: Boolean;

  @Property({ nullable: true })
  cleanup: Boolean;
  
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
