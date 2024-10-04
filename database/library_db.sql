--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

-- Started on 2024-06-20 19:56:35 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3437 (class 1262 OID 40692)
-- Name: library_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE library_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE library_db OWNER TO postgres;

\connect library_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 66818)
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    author_id integer NOT NULL,
    email character varying(40) NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 66817)
-- Name: authors_author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_author_id_seq OWNER TO postgres;

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 209
-- Name: authors_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;


--
-- TOC entry 211 (class 1259 OID 66824)
-- Name: authors_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors_resources (
    fk_author integer NOT NULL,
    fk_resource integer NOT NULL
);


ALTER TABLE public.authors_resources OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 66830)
-- Name: publishers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publishers (
    publisher_id integer NOT NULL,
    address character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.publishers OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 66829)
-- Name: publishers_publisher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publishers_publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publishers_publisher_id_seq OWNER TO postgres;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 212
-- Name: publishers_publisher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;


--
-- TOC entry 215 (class 1259 OID 66837)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    reservation_id integer NOT NULL,
    extension_count integer DEFAULT 0 NOT NULL,
    reservation_end date NOT NULL,
    reservation_start date NOT NULL,
    reservation_status character varying(255) NOT NULL,
    fk_resource_instance integer NOT NULL,
    fk_user integer NOT NULL,
    CONSTRAINT reservations_reservation_status_check CHECK (((reservation_status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'CANCELLED'::character varying, 'BORROWED'::character varying, 'COMPLETED'::character varying, 'EXPIRED'::character varying])::text[])))
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 66836)
-- Name: reservations_reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_reservation_id_seq OWNER TO postgres;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 214
-- Name: reservations_reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_reservation_id_seq OWNED BY public.reservations.reservation_id;


--
-- TOC entry 217 (class 1259 OID 66846)
-- Name: resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources (
    resource_id integer NOT NULL,
    description character varying(255),
    identifier character varying(20) NOT NULL,
    image_url character varying(255),
    title character varying(100) NOT NULL,
    fk_publisher integer
);


ALTER TABLE public.resources OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 66855)
-- Name: resources_instances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources_instances (
    resource_instance_id integer NOT NULL,
    instance_status character varying(255),
    is_reserved boolean DEFAULT false NOT NULL,
    fk_resource integer NOT NULL,
    CONSTRAINT resources_instances_instance_status_check CHECK (((instance_status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'WITHDRAWN'::character varying, 'AWAITING_WITHDRAWAL'::character varying])::text[])))
);


ALTER TABLE public.resources_instances OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 66854)
-- Name: resources_instances_resource_instance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resources_instances_resource_instance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resources_instances_resource_instance_id_seq OWNER TO postgres;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 218
-- Name: resources_instances_resource_instance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resources_instances_resource_instance_id_seq OWNED BY public.resources_instances.resource_instance_id;


--
-- TOC entry 216 (class 1259 OID 66845)
-- Name: resources_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resources_resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resources_resource_id_seq OWNER TO postgres;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 216
-- Name: resources_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resources_resource_id_seq OWNED BY public.resources.resource_id;


--
-- TOC entry 221 (class 1259 OID 66864)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(40) NOT NULL,
    image_url character varying(255),
    join_date date NOT NULL,
    name character varying(20),
    password character varying(255) NOT NULL,
    phone_number character varying(12),
    role character varying(255),
    status character varying(255),
    surname character varying(20),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['USER'::character varying, 'ADMIN'::character varying])::text[]))),
    CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'CLOSED'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 66863)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3236 (class 2604 OID 66821)
-- Name: authors author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 66833)
-- Name: publishers publisher_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 66840)
-- Name: reservations reservation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN reservation_id SET DEFAULT nextval('public.reservations_reservation_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 66849)
-- Name: resources resource_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources ALTER COLUMN resource_id SET DEFAULT nextval('public.resources_resource_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 66858)
-- Name: resources_instances resource_instance_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances ALTER COLUMN resource_instance_id SET DEFAULT nextval('public.resources_instances_resource_instance_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 66867)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3420 (class 0 OID 66818)
-- Dependencies: 210
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3421 (class 0 OID 66824)
-- Dependencies: 211
-- Data for Name: authors_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3423 (class 0 OID 66830)
-- Dependencies: 213
-- Data for Name: publishers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3425 (class 0 OID 66837)
-- Dependencies: 215
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3427 (class 0 OID 66846)
-- Dependencies: 217
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3429 (class 0 OID 66855)
-- Dependencies: 219
-- Data for Name: resources_instances; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3431 (class 0 OID 66864)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'admin@admin.com', NULL, '2024-06-20', NULL, '$2a$10$2vM/KRv0rtf8x.hNlMURYerntu/3YFqtlSMuHtek8eCvQvOHCEI3a', NULL, 'ADMIN', 'ACTIVE', NULL);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 209
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 1, false);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 212
-- Name: publishers_publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publishers_publisher_id_seq', 1, false);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 214
-- Name: reservations_reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_reservation_id_seq', 1, false);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 218
-- Name: resources_instances_resource_instance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_instances_resource_instance_id_seq', 1, false);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 216
-- Name: resources_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_resource_id_seq', 1, false);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- TOC entry 3249 (class 2606 OID 66823)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- TOC entry 3253 (class 2606 OID 66828)
-- Name: authors_resources authors_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT authors_resources_pkey PRIMARY KEY (fk_author, fk_resource);


--
-- TOC entry 3255 (class 2606 OID 66835)
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (publisher_id);


--
-- TOC entry 3261 (class 2606 OID 66844)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (reservation_id);


--
-- TOC entry 3269 (class 2606 OID 66862)
-- Name: resources_instances resources_instances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances
    ADD CONSTRAINT resources_instances_pkey PRIMARY KEY (resource_instance_id);


--
-- TOC entry 3263 (class 2606 OID 66853)
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (resource_id);


--
-- TOC entry 3265 (class 2606 OID 66883)
-- Name: resources uk_5bfjyjtrp1xst46403211pfwp; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT uk_5bfjyjtrp1xst46403211pfwp UNIQUE (title);


--
-- TOC entry 3271 (class 2606 OID 66885)
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- TOC entry 3257 (class 2606 OID 66877)
-- Name: publishers uk_6hfeubb8cqc6wuj84uu5k3u4v; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT uk_6hfeubb8cqc6wuj84uu5k3u4v UNIQUE (address);


--
-- TOC entry 3259 (class 2606 OID 66879)
-- Name: publishers uk_an1ucpx8sw2qm194mlok8e5us; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT uk_an1ucpx8sw2qm194mlok8e5us UNIQUE (name);


--
-- TOC entry 3267 (class 2606 OID 66881)
-- Name: resources uk_fbapi6df7j5g8vinmx5kmhlh5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT uk_fbapi6df7j5g8vinmx5kmhlh5 UNIQUE (identifier);


--
-- TOC entry 3251 (class 2606 OID 66875)
-- Name: authors uk_jmhavkj33euq43uhnucw7l5he; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT uk_jmhavkj33euq43uhnucw7l5he UNIQUE (email);


--
-- TOC entry 3273 (class 2606 OID 66873)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3278 (class 2606 OID 66906)
-- Name: resources fk4kesmiw44oj6edoawg9e17u9c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT fk4kesmiw44oj6edoawg9e17u9c FOREIGN KEY (fk_publisher) REFERENCES public.publishers(publisher_id);


--
-- TOC entry 3274 (class 2606 OID 66886)
-- Name: authors_resources fk87o0pwbsaxayi15khng4vv86g; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT fk87o0pwbsaxayi15khng4vv86g FOREIGN KEY (fk_author) REFERENCES public.authors(author_id);


--
-- TOC entry 3277 (class 2606 OID 66901)
-- Name: reservations fkdnoals0uwr5pcx0ow1afupm7j; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fkdnoals0uwr5pcx0ow1afupm7j FOREIGN KEY (fk_user) REFERENCES public.users(user_id);


--
-- TOC entry 3279 (class 2606 OID 66911)
-- Name: resources_instances fkk0s9xos0x78l9o3wpk5ammkea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances
    ADD CONSTRAINT fkk0s9xos0x78l9o3wpk5ammkea FOREIGN KEY (fk_resource) REFERENCES public.resources(resource_id);


--
-- TOC entry 3276 (class 2606 OID 66896)
-- Name: reservations fkl6tn1mxmh6agic5d0x9l05yih; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fkl6tn1mxmh6agic5d0x9l05yih FOREIGN KEY (fk_resource_instance) REFERENCES public.resources_instances(resource_instance_id);


--
-- TOC entry 3275 (class 2606 OID 66891)
-- Name: authors_resources fkpcyb703gvqr3cvgyr7ehvkorb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT fkpcyb703gvqr3cvgyr7ehvkorb FOREIGN KEY (fk_resource) REFERENCES public.resources(resource_id);


-- Completed on 2024-06-20 19:56:35 CEST

--
-- PostgreSQL database dump complete
--

