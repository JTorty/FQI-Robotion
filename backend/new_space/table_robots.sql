--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-27 15:32:00

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16423)
-- Name: robots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.robots (
    model text NOT NULL,
    status text,
    battery integer,
    longitude numeric,
    latitude numeric,
    x_pixel integer,
    y_pixel integer
);


ALTER TABLE public.robots OWNER TO postgres;

--
-- TOC entry 3315 (class 0 OID 16423)
-- Dependencies: 214
-- Data for Name: robots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.robots (model, status, battery, longitude, latitude, x_pixel, y_pixel) FROM stdin;
S-00	operative	82	41.404145601695674	2.174113136255988	449	176
S-01	operative	71	41.40415147079839	2.174127922389432	478	250
S-02	operative	63	41.4040910610308	2.174187032245044	176	545
S-03	operative	87	41.404065775699	2.174166741663468	50	444
S-04	operative	46	41.40422173147334	2.174103930246913	829	130
S-05	operative	17	41.404133671241254	2.174084639414838	389	34
S-06	operative	77	41.40416758397068	2.1741472931502805	558	347
S-07	operative	55	41.40411627395595	2.1741173240377125	302	197
S-08	operative	61	41.404102391656856	2.174084930416212	233	36
S-09	operative	45	41.40419048549106	2.174122569197058	673	223
\.


--
-- TOC entry 3172 (class 2606 OID 16429)
-- Name: robots robot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.robots
    ADD CONSTRAINT robot_pkey PRIMARY KEY (model);


-- Completed on 2023-06-27 15:32:00

--
-- PostgreSQL database dump complete
--

