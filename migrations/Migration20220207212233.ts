import { Migration } from '@mikro-orm/migrations';

export class Migration20220207212233 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recruittracker" ("id" serial primary key, "guild_id" varchar(255) not null, "user_id" varchar(255) not null, "started" bool not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "blacklist" ("id" serial primary key, "guild_id" varchar(255) not null, "blacklist" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "classtracker" ("id" serial primary key, "guild_id" varchar(255) not null, "user_id" varchar(255) not null, "class" varchar(255) not null, "added" bool not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "namebook" ("id" serial primary key, "guild_id" varchar(255) not null, "user_id" varchar(255) not null, "role_id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "reactionroles" ("id" serial primary key, "guild_id" varchar(255) not null, "message_id" varchar(255) not null, "config" text not null, "limit" int4 null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "reactionroles" add constraint "reactionroles_message_id_unique" unique ("message_id");');

    this.addSql('create table "guildtraffic" ("id" serial primary key, "guild_id" varchar(255) not null, "user_id" varchar(255) not null, "username" varchar(255) not null, "nickname" varchar(255) null, "joined" bool not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "settings" ("id" serial primary key, "guild_id" varchar(255) not null, "prefix" varchar(255) not null, "mod_role" varchar(255) null, "admin_role" varchar(255) null, "guest_role" varchar(255) null, "friend_role" varchar(255) null, "recruit_role" varchar(255) null, "guild_role" varchar(255) null, "main_roles" text null, "alt_roles" text null, "system_notice" bool null, "cleanup" bool null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "settings" add constraint "settings_guild_id_unique" unique ("guild_id");');
  }

}
