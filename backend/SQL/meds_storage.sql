-- Table: public.meds_storage

-- DROP TABLE IF EXISTS public.meds_storage;

CREATE TABLE IF NOT EXISTS public.meds_storage
(
    med_id serial,
    med_name character varying(50),
    storage_id integer NOT NULL,
    mfd timestamp with time zone NOT NULL,
    expd timestamp with time zone NOT NULL,
    manufacturer character varying(50),
    pref_min_temp numeric(5,2) NOT NULL,
    pref_min_hum numeric(5,2) NOT NULL,
    pref_min_light numeric(7,2),
    pref_max_temp numeric(5,2) NOT NULL,
    pref_max_hum numeric(5,2) NOT NULL,
    pref_max_light numeric(7,2),
    CONSTRAINT meds_storage_pkey PRIMARY KEY (med_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.meds_storage
    OWNER to postgres;