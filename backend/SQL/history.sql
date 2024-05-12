-- Table: public.history

-- DROP TABLE IF EXISTS public.history;

CREATE TABLE IF NOT EXISTS public.history
(
    history_id integer NOT NULL DEFAULT nextval('history_history_id_seq'::regclass),
    storage_id integer NOT NULL,
    temp numeric(5,2) NOT NULL,
    humidity numeric(5,2) NOT NULL,
    light numeric(7,2),
    "time" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT history_pkey PRIMARY KEY (history_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.history
    OWNER to postgres;