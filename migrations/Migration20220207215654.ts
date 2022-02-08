import { Migration } from '@mikro-orm/migrations';

export class Migration20220207215654 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "blacklist" drop constraint if exists "blacklist_blacklist_check";');
    this.addSql('alter table "blacklist" alter column "blacklist" type text using ("blacklist"::text);');
    this.addSql('alter table "blacklist" alter column "blacklist" drop not null;');
  }

}
