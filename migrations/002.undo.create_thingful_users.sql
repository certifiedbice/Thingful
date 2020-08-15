ALTER TABLE thingful_things
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS thingful_users CASCADE;
