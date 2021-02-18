CREATE TABLE thingful_reviews (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    thing_id INTEGER
        REFERENCES thingful_things(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES thingful_users(id) ON DELETE CASCADE NOT NULL
);
