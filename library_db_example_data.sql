--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

-- Started on 2024-06-20 23:57:38 CEST

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

DROP DATABASE library_db;
--
-- TOC entry 3437 (class 1262 OID 66916)
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

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 66917)
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
-- TOC entry 210 (class 1259 OID 66920)
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
-- Dependencies: 210
-- Name: authors_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;


--
-- TOC entry 211 (class 1259 OID 66921)
-- Name: authors_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors_resources (
    fk_author integer NOT NULL,
    fk_resource integer NOT NULL
);


ALTER TABLE public.authors_resources OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 66924)
-- Name: publishers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publishers (
    publisher_id integer NOT NULL,
    address character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.publishers OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 66927)
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
-- Dependencies: 213
-- Name: publishers_publisher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;


--
-- TOC entry 214 (class 1259 OID 66928)
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
    CONSTRAINT reservations_reservation_status_check CHECK (((reservation_status)::text = ANY (ARRAY[('ACTIVE'::character varying)::text, ('CANCELLED'::character varying)::text, ('BORROWED'::character varying)::text, ('COMPLETED'::character varying)::text, ('EXPIRED'::character varying)::text])))
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 66933)
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
-- Dependencies: 215
-- Name: reservations_reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_reservation_id_seq OWNED BY public.reservations.reservation_id;


--
-- TOC entry 216 (class 1259 OID 66934)
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
-- TOC entry 217 (class 1259 OID 66939)
-- Name: resources_instances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources_instances (
    resource_instance_id integer NOT NULL,
    instance_status character varying(255),
    is_reserved boolean DEFAULT false NOT NULL,
    fk_resource integer NOT NULL,
    CONSTRAINT resources_instances_instance_status_check CHECK (((instance_status)::text = ANY (ARRAY[('ACTIVE'::character varying)::text, ('WITHDRAWN'::character varying)::text, ('AWAITING_WITHDRAWAL'::character varying)::text])))
);


ALTER TABLE public.resources_instances OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 66944)
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
-- TOC entry 219 (class 1259 OID 66945)
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
-- Dependencies: 219
-- Name: resources_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resources_resource_id_seq OWNED BY public.resources.resource_id;


--
-- TOC entry 220 (class 1259 OID 66946)
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
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('USER'::character varying)::text, ('ADMIN'::character varying)::text]))),
    CONSTRAINT users_status_check CHECK (((status)::text = ANY (ARRAY[('ACTIVE'::character varying)::text, ('CLOSED'::character varying)::text])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 66953)
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
-- Dependencies: 221
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3236 (class 2604 OID 66954)
-- Name: authors author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 66955)
-- Name: publishers publisher_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 66956)
-- Name: reservations reservation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN reservation_id SET DEFAULT nextval('public.reservations_reservation_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 66957)
-- Name: resources resource_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources ALTER COLUMN resource_id SET DEFAULT nextval('public.resources_resource_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 66958)
-- Name: resources_instances resource_instance_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances ALTER COLUMN resource_instance_id SET DEFAULT nextval('public.resources_instances_resource_instance_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 66959)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3419 (class 0 OID 66917)
-- Dependencies: 209
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors VALUES (1, 'B@mail.com', 'Ben', 'Counter');
INSERT INTO public.authors VALUES (2, 'D@mail.com', 'Dan', 'Abnett');
INSERT INTO public.authors VALUES (3, 'N@mail.com', 'Nick', 'Kyme');
INSERT INTO public.authors VALUES (4, 'CW@mail.com', 'Chris', 'Wraight');
INSERT INTO public.authors VALUES (5, 'AS@mail.com', 'Andrzej', 'Sapkowski');
INSERT INTO public.authors VALUES (6, 'MZ@mail.com', 'Marcin', 'Zwierzchowski');


--
-- TOC entry 3421 (class 0 OID 66921)
-- Dependencies: 211
-- Data for Name: authors_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors_resources VALUES (1, 1);
INSERT INTO public.authors_resources VALUES (2, 2);
INSERT INTO public.authors_resources VALUES (3, 3);
INSERT INTO public.authors_resources VALUES (2, 4);
INSERT INTO public.authors_resources VALUES (4, 5);
INSERT INTO public.authors_resources VALUES (2, 6);
INSERT INTO public.authors_resources VALUES (5, 7);
INSERT INTO public.authors_resources VALUES (6, 7);
INSERT INTO public.authors_resources VALUES (5, 8);
INSERT INTO public.authors_resources VALUES (5, 9);
INSERT INTO public.authors_resources VALUES (5, 10);
INSERT INTO public.authors_resources VALUES (5, 11);
INSERT INTO public.authors_resources VALUES (5, 12);


--
-- TOC entry 3422 (class 0 OID 66924)
-- Dependencies: 212
-- Data for Name: publishers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publishers VALUES (1, 'ul.sezamkowa', 'copcorp');
INSERT INTO public.publishers VALUES (2, 'sa', 'superNOWA');


--
-- TOC entry 3424 (class 0 OID 66928)
-- Dependencies: 214
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reservations VALUES (2, 0, '2024-07-04', '2024-06-20', 'ACTIVE', 4, 2);
INSERT INTO public.reservations VALUES (4, 0, '2024-07-04', '2024-06-20', 'ACTIVE', 14, 2);
INSERT INTO public.reservations VALUES (8, 0, '2024-07-04', '2024-06-20', 'ACTIVE', 23, 9);
INSERT INTO public.reservations VALUES (10, 0, '2024-07-04', '2024-06-20', 'ACTIVE', 18, 9);
INSERT INTO public.reservations VALUES (14, 0, '2024-07-04', '2024-06-20', 'ACTIVE', 2, 11);
INSERT INTO public.reservations VALUES (11, 0, '2024-08-27', '2024-08-21', 'ACTIVE', 22, 10);
INSERT INTO public.reservations VALUES (6, 0, '2024-12-28', '2024-09-28', 'ACTIVE', 6, 3);
INSERT INTO public.reservations VALUES (1, 0, '2024-02-29', '2024-02-27', 'ACTIVE', 1, 2);
INSERT INTO public.reservations VALUES (9, 0, '2024-07-04', '2024-06-20', 'BORROWED', 3, 9);
INSERT INTO public.reservations VALUES (7, 0, '2024-07-04', '2024-06-20', 'BORROWED', 20, 3);
INSERT INTO public.reservations VALUES (13, 0, '2024-07-04', '2024-06-20', 'BORROWED', 27, 11);
INSERT INTO public.reservations VALUES (3, 0, '2024-10-10', '2024-10-10', 'BORROWED', 21, 2);
INSERT INTO public.reservations VALUES (12, 0, '2024-07-04', '2024-06-20', 'CANCELLED', 15, 10);
INSERT INTO public.reservations VALUES (5, 0, '2024-07-04', '2024-06-20', 'CANCELLED', 12, 3);


--
-- TOC entry 3426 (class 0 OID 66934)
-- Dependencies: 216
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.resources VALUES (1, 'Po cudownym ozdrowieniu z ciężkich ran odniesionych na Davinie Mistrz Wojny wiedzie zwycięskie siły Imperium przeciw zbuntowanemu światu Isstvan III.', 'HH-03', 'http://localhost:9090/api/images/GalaktykaWPłomieniach.png', 'Galaktyka w płomieniach', 1);
INSERT INTO public.resources VALUES (2, 'Komisarz Gaunt i Duchy tym razem walczą na Hagii, świecie-świątyni, którego zdobycie ma istotne znaczenie taktyczne i duchowe. Gdy potężna flota Chaosu pojawia się w pobliżu planety, Gaunt i jego żołnierze zostają wysłani z misją uratowania najświętszych ', 'DG-04', 'http://localhost:9090/api/images/GwardiaHonorowa.jpg', 'Gwardia Honorowa', 1);
INSERT INTO public.resources VALUES (3, 'Po masakrze na Isstvanie V Astartes z Legionu Salamander długo i wytrwale poszukują poległego Prymarchy, jednak ich wysiłki nie przynoszą rezultatu. Nie wiedzą, że chociaż Vulkan nadal żyje, to życzyłby sobie śmierci…', 'HH-26', 'http://localhost:9090/api/images/VulkanŻyje.png', 'Vulkan Żyje', 1);
INSERT INTO public.resources VALUES (4, 'Imperator jest wściekły. Prymarcha Magnus Czerwony z Legionu Tysiąca Synów popełnił katastrofalny błąd i naraził Terrę na niebezpieczeństwo. Nie mając innego wyboru, Imperator powierza Kosmicznym Wilkom Lemana Russa zadanie pojmania jego brata z Prospero.', '	 HH-15', 'http://localhost:9090/api/images/ProsperoWPłomieniach.png', 'Prospero w płomieniach', 1);
INSERT INTO public.resources VALUES (5, 'Od czasu odkrycia Chogoris przez Imperium pełna mistycyzmu kultura wojowników Białych Szram nigdy nie była w pełni zgodna z ideałami Unifikacji. Gdy Wielka Krucjata wypala sobie ścieżkę przez gwiazdy, ich enigmatyczny Prymarcha, Jaghatai Khan.', 'PRYM-08', 'http://localhost:9090/api/images/JaghataiKhan.jpg', 'Jaghatai Khan: Sokół z Chogoris', 1);
INSERT INTO public.resources VALUES (6, 'Jest trzydzieste pierwsze tysiąclecie. Pod łaskawymi rządami nieśmiertelnego Imperatora, Imperium Człowieka rozciąga się na całą galaktykę. Nadeszła złota era odkryć i podboju.', '	 HH-01', 'http://localhost:9090/api/images/WywyższenieHorusa.png', 'Wywyższenie Horusa', 1);
INSERT INTO public.resources VALUES (7, '„No tak. Trzydzieści lat. Wiedźmin do wynajęcia za trzy tysiące orenów. Gdy pojawił się w Wyzimie, w karczmie „Pod Lisem” nie był młodzieniaszkiem. Pobielałe włosy, szrama na twarzy i ten charakterystyczny, paskudny uśmiech.', 'W1', 'http://localhost:9090/api/images/WiedźminSzponyIKły.webp', 'Wiedźmin. Szpony i Kły.', 2);
INSERT INTO public.resources VALUES (8, 'Oto nowy Sapkowski i nowy wiedźmin. Mistrz polskiej fantastyki znowu zaskakuje. "Sezon burz” nie opowiada bowiem o młodzieńczych latach białowłosego zabójcy potworów ani o jego losach po śmierci/nieśmierci kończącej ostatni tom sagi.', 'W8', 'http://localhost:9090/api/images/WiedźminSezonBurz.webp', 'Sezon burz. Wiedźmin. Tom 8', 2);
INSERT INTO public.resources VALUES (9, 'Tom 1. sagi o Wiedźminie to zbiór opowiadań, które pozwolą Ci poznać Geralta. Co ciekawe, książka „Ostatnie życzenie” ukazała się rok po drugim w chronologii wewnętrznej cyklu opowiadań – „Miecz przeznaczenia”.', 'W2', 'http://localhost:9090/api/images/WiedźminOstatnieŻyczenie.jpg', 'Ostatnie życzenie. Wiedźmin. Tom 1', 2);
INSERT INTO public.resources VALUES (10, 'Król Niedamir organizuje niebezpieczną wyprawę na smoka, który skrył się w jaskiniach Gór Pustulskich. Do śmiałków dołącza Geralt z Rivii i wraz z nimi rozpoczyna ryzykowną przygodę. Na swojej drodze spotyka trubadura Jaskra oraz czarodziejkę Yennefer.', 'W3', 'http://localhost:9090/api/images/WiedźminMieczPrzeznaczenia.jpg', 'Miecz przeznaczenia. Wiedźmin. Tom 2', 2);
INSERT INTO public.resources VALUES (11, 'Zagłębiając się w karty tego dzieła, zaczniesz odkrywać magiczny, wykreowany przez autora w sposób bardzo realistyczny, świat wiedźminów. Poznasz również samego Geralta, który postanawia zaopiekować się dzieckiem‑niespodzianką, którym jest dziewczyna Ciri', 'W4', 'http://localhost:9090/api/images/WiedźminKrewElfow.jpg', 'Krew elfów. Wiedźmin. Tom 3', 2);
INSERT INTO public.resources VALUES (12, 'Świat Ciri i wiedźmina ogarniają płomienie. Nastał zapowiadany przez Ithlinne czas miecza i topora. Czas pogardy. A w czasach pogardy na powierzchnię wypełzają Szczury. Szczury atakujące po szczurzemu, cicho, zdradziecko i okrutnie.', 'W5', 'http://localhost:9090/api/images/WiedźminCzasPogardy.webp', 'Czas pogardy. Wiedźmin. Tom 4', 2);


--
-- TOC entry 3427 (class 0 OID 66939)
-- Dependencies: 217
-- Data for Name: resources_instances; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.resources_instances VALUES (5, 'ACTIVE', false, 2);
INSERT INTO public.resources_instances VALUES (7, 'ACTIVE', false, 4);
INSERT INTO public.resources_instances VALUES (8, 'ACTIVE', false, 4);
INSERT INTO public.resources_instances VALUES (9, 'ACTIVE', false, 4);
INSERT INTO public.resources_instances VALUES (10, 'ACTIVE', false, 4);
INSERT INTO public.resources_instances VALUES (11, 'ACTIVE', false, 4);
INSERT INTO public.resources_instances VALUES (13, 'ACTIVE', false, 5);
INSERT INTO public.resources_instances VALUES (16, 'ACTIVE', false, 6);
INSERT INTO public.resources_instances VALUES (17, 'ACTIVE', false, 7);
INSERT INTO public.resources_instances VALUES (19, 'ACTIVE', false, 7);
INSERT INTO public.resources_instances VALUES (24, 'ACTIVE', false, 10);
INSERT INTO public.resources_instances VALUES (25, 'ACTIVE', false, 10);
INSERT INTO public.resources_instances VALUES (26, 'ACTIVE', false, 11);
INSERT INTO public.resources_instances VALUES (28, 'ACTIVE', false, 11);
INSERT INTO public.resources_instances VALUES (29, 'ACTIVE', false, 11);
INSERT INTO public.resources_instances VALUES (30, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (31, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (32, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (33, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (34, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (35, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (36, 'ACTIVE', false, 12);
INSERT INTO public.resources_instances VALUES (1, 'ACTIVE', true, 1);
INSERT INTO public.resources_instances VALUES (4, 'ACTIVE', true, 2);
INSERT INTO public.resources_instances VALUES (21, 'ACTIVE', true, 9);
INSERT INTO public.resources_instances VALUES (14, 'ACTIVE', true, 6);
INSERT INTO public.resources_instances VALUES (12, 'ACTIVE', true, 5);
INSERT INTO public.resources_instances VALUES (6, 'ACTIVE', true, 3);
INSERT INTO public.resources_instances VALUES (20, 'ACTIVE', true, 8);
INSERT INTO public.resources_instances VALUES (23, 'ACTIVE', true, 10);
INSERT INTO public.resources_instances VALUES (3, 'ACTIVE', true, 1);
INSERT INTO public.resources_instances VALUES (18, 'ACTIVE', true, 7);
INSERT INTO public.resources_instances VALUES (22, 'ACTIVE', true, 9);
INSERT INTO public.resources_instances VALUES (15, 'ACTIVE', true, 6);
INSERT INTO public.resources_instances VALUES (27, 'ACTIVE', true, 11);
INSERT INTO public.resources_instances VALUES (2, 'ACTIVE', true, 1);


--
-- TOC entry 3430 (class 0 OID 66946)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'admin@admin.com', NULL, '2024-06-20', NULL, '$2a$10$2vM/KRv0rtf8x.hNlMURYerntu/3YFqtlSMuHtek8eCvQvOHCEI3a', NULL, 'ADMIN', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (2, 'gszp@mail.com', NULL, '2024-12-20', 'Mateusz', '$2a$10$WTFZglWJvASYkknzYZ0rQ.Uk1S6Jzqz8NB6EBOCBSXHToVl/JXMBi', '111222333', 'USER', 'ACTIVE', 'Grzybek');
INSERT INTO public.users VALUES (3, 'gszpa@mail.com', NULL, '2024-04-20', NULL, '$2a$10$9bh9a3ykNVO3UdQJnW6UbuGla5ZN9etuz/lv/CQDOregQgnK8ijGW', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (4, 'gszpo@mail.com', NULL, '2024-03-20', NULL, '$2a$10$4Dj7JI5WyJmQaLGBY9/TG.uChXapvo8jFHFcj/zVcUkJt8/8L6WoS', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (5, 'geralt@mail.com', NULL, '2024-03-20', NULL, '$2a$10$YE4NRLwJmVlu6mkx2zvy8uRAUC8HJF/R.MEifM2lnFqi72R8sPKM.', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (6, 'ok@mail.com', NULL, '2024-03-20', NULL, '$2a$10$5HGw7GV3no2leilEMRU7ouKA.KzD3bHgTeGVTtI636HXspsDxD0FK', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (7, 'super@mail.com', NULL, '2024-06-20', NULL, '$2a$10$yelHJBOM/2nfg4fbzQkGEuQPo6/zubdOeZCncJTorSOeZJT54vVaG', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (8, 'abs@mail.com', NULL, '2024-06-20', NULL, '$2a$10$QE0OzGJqqNh6Y2J4N/q3vuDxfTI7AHjNyO2CcdaA0U8ksi/r1pEZ6', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (9, 'tytus@mail.com', NULL, '2024-06-20', NULL, '$2a$10$A1fwrQKfMHdheDRR2oOwN.35T1oBacT9sm5TP4xCHXM5X7oC3fTtu', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (10, 'romek@mail.com', NULL, '2024-06-20', NULL, '$2a$10$YB7e4vcSUAB0G1htubAri.Uwn7LrEMufWEPnoYAUp4rKRtgTL38lW', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (11, 'atomek@mail.com', NULL, '2024-06-20', NULL, '$2a$10$1YvysdXWLfhtTnxdYrzea.g9QENwORAjcI8JDedkHNoFjfcRfJdRm', NULL, 'USER', 'ACTIVE', NULL);
INSERT INTO public.users VALUES (12, 'szymekCzarodziej@mail.com', NULL, '2024-11-20', NULL, '$2a$10$9IwPJWNQ4nKskGR6fvDIa.QJd7Xo5Ima6p.xfjsb2fRX7V7VeqTYi', NULL, 'USER', 'ACTIVE', NULL);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 210
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 6, true);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 213
-- Name: publishers_publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publishers_publisher_id_seq', 2, true);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 215
-- Name: reservations_reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_reservation_id_seq', 14, true);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 218
-- Name: resources_instances_resource_instance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_instances_resource_instance_id_seq', 36, true);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 219
-- Name: resources_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_resource_id_seq', 12, true);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- TOC entry 3249 (class 2606 OID 66961)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- TOC entry 3253 (class 2606 OID 66963)
-- Name: authors_resources authors_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT authors_resources_pkey PRIMARY KEY (fk_author, fk_resource);


--
-- TOC entry 3255 (class 2606 OID 66965)
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (publisher_id);


--
-- TOC entry 3261 (class 2606 OID 66967)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (reservation_id);


--
-- TOC entry 3269 (class 2606 OID 66969)
-- Name: resources_instances resources_instances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances
    ADD CONSTRAINT resources_instances_pkey PRIMARY KEY (resource_instance_id);


--
-- TOC entry 3263 (class 2606 OID 66971)
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (resource_id);


--
-- TOC entry 3265 (class 2606 OID 66973)
-- Name: resources uk_5bfjyjtrp1xst46403211pfwp; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT uk_5bfjyjtrp1xst46403211pfwp UNIQUE (title);


--
-- TOC entry 3271 (class 2606 OID 66975)
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- TOC entry 3257 (class 2606 OID 66977)
-- Name: publishers uk_6hfeubb8cqc6wuj84uu5k3u4v; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT uk_6hfeubb8cqc6wuj84uu5k3u4v UNIQUE (address);


--
-- TOC entry 3259 (class 2606 OID 66979)
-- Name: publishers uk_an1ucpx8sw2qm194mlok8e5us; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT uk_an1ucpx8sw2qm194mlok8e5us UNIQUE (name);


--
-- TOC entry 3267 (class 2606 OID 66981)
-- Name: resources uk_fbapi6df7j5g8vinmx5kmhlh5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT uk_fbapi6df7j5g8vinmx5kmhlh5 UNIQUE (identifier);


--
-- TOC entry 3251 (class 2606 OID 66983)
-- Name: authors uk_jmhavkj33euq43uhnucw7l5he; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT uk_jmhavkj33euq43uhnucw7l5he UNIQUE (email);


--
-- TOC entry 3273 (class 2606 OID 66985)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3278 (class 2606 OID 66986)
-- Name: resources fk4kesmiw44oj6edoawg9e17u9c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT fk4kesmiw44oj6edoawg9e17u9c FOREIGN KEY (fk_publisher) REFERENCES public.publishers(publisher_id);


--
-- TOC entry 3274 (class 2606 OID 66991)
-- Name: authors_resources fk87o0pwbsaxayi15khng4vv86g; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT fk87o0pwbsaxayi15khng4vv86g FOREIGN KEY (fk_author) REFERENCES public.authors(author_id);


--
-- TOC entry 3276 (class 2606 OID 66996)
-- Name: reservations fkdnoals0uwr5pcx0ow1afupm7j; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fkdnoals0uwr5pcx0ow1afupm7j FOREIGN KEY (fk_user) REFERENCES public.users(user_id);


--
-- TOC entry 3279 (class 2606 OID 67001)
-- Name: resources_instances fkk0s9xos0x78l9o3wpk5ammkea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources_instances
    ADD CONSTRAINT fkk0s9xos0x78l9o3wpk5ammkea FOREIGN KEY (fk_resource) REFERENCES public.resources(resource_id);


--
-- TOC entry 3277 (class 2606 OID 67006)
-- Name: reservations fkl6tn1mxmh6agic5d0x9l05yih; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fkl6tn1mxmh6agic5d0x9l05yih FOREIGN KEY (fk_resource_instance) REFERENCES public.resources_instances(resource_instance_id);


--
-- TOC entry 3275 (class 2606 OID 67011)
-- Name: authors_resources fkpcyb703gvqr3cvgyr7ehvkorb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors_resources
    ADD CONSTRAINT fkpcyb703gvqr3cvgyr7ehvkorb FOREIGN KEY (fk_resource) REFERENCES public.resources(resource_id);


-- Completed on 2024-06-20 23:57:38 CEST

--
-- PostgreSQL database dump complete
--

