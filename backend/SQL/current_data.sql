-- Table: public.current_data

-- DROP TABLE IF EXISTS public.current_data;

CREATE TABLE IF NOT EXISTS public.current_data
(
    temp_in_c numeric(5,2) NOT NULL,
    temp_in_f numeric(5,2) NOT NULL,
    light numeric(7,2),
    humidity numeric(5,2) NOT NULL,
    id integer NOT NULL DEFAULT nextval('cureent_data_id_seq'::regclass),
    CONSTRAINT cureent_data_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.current_data
    OWNER to postgres;