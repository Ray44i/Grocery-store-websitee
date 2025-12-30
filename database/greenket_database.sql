--
-- PostgreSQL database dump
--

\restrict qFy4AVq9wNKTUK9LH8Df2QMbbUea8QicBWtLTDfBesqVbyUIimXrR9VWnhtqToi

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-29 09:54:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 17641)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    quantity integer NOT NULL,
    id bigint NOT NULL,
    line_total bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    unit_price bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17640)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 222 (class 1259 OID 17655)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    created_at timestamp(6) with time zone NOT NULL,
    id bigint NOT NULL,
    total_amount bigint NOT NULL,
    address character varying(2000),
    currency character varying(255) NOT NULL,
    order_status character varying(255),
    payment_intent_id character varying(255) NOT NULL,
    phone character varying(255),
    status character varying(255),
    user_email character varying(255),
    user_uid character varying(255) NOT NULL,
    CONSTRAINT orders_order_status_check CHECK (((order_status)::text = ANY ((ARRAY['NEW_ORDER'::character varying, 'SENT_OUT'::character varying, 'RETURNED'::character varying, 'COMPLETED'::character varying])::text[]))),
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'PAID'::character varying, 'FAILED'::character varying])::text[])))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17654)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 228 (class 1259 OID 18091)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(500),
    price numeric(10,2) NOT NULL,
    image_url character varying(512),
    featured boolean DEFAULT false NOT NULL,
    details text,
    category character varying(50) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18090)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 227
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 224 (class 1259 OID 17685)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    rating integer NOT NULL,
    created_at timestamp(6) with time zone NOT NULL,
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    comment text,
    user_email character varying(255),
    user_name character varying(255),
    user_uid character varying(255) NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17684)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 223
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 226 (class 1259 OID 17699)
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    created_at timestamp(6) with time zone NOT NULL,
    id bigint NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL,
    address character varying(2000),
    email character varying(255),
    phone character varying(255),
    user_uid character varying(255) NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17698)
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_profiles_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_profiles_id_seq OWNED BY public.user_profiles.id;


--
-- TOC entry 4876 (class 2604 OID 17644)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4877 (class 2604 OID 17658)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 18094)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 17688)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4879 (class 2604 OID 17702)
-- Name: user_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles ALTER COLUMN id SET DEFAULT nextval('public.user_profiles_id_seq'::regclass);


--
-- TOC entry 5045 (class 0 OID 17641)
-- Dependencies: 220
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (quantity, id, line_total, order_id, product_id, unit_price, name) FROM stdin;
\.


--
-- TOC entry 5047 (class 0 OID 17655)
-- Dependencies: 222
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (created_at, id, total_amount, address, currency, order_status, payment_intent_id, phone, status, user_email, user_uid) FROM stdin;
\.


--
-- TOC entry 5053 (class 0 OID 18091)
-- Dependencies: 228
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, image_url, featured, details, category) FROM stdin;
1	Apple	Fresh red apple	1.20	/images/products/fruits/apple.jpg	t	Crisp and sweet red apples	fruits
2	Banana	Ripe bananas	0.90	/images/products/fruits/banana.jpg	f	Naturally ripened bananas	fruits
3	Orange	Juicy oranges	1.10	/images/products/fruits/orange.jpg	f	Vitamin C rich oranges	fruits
4	Mango	Sweet mango	1.80	/images/products/fruits/mango.jpg	t	Fresh tropical mango	fruits
5	Strawberry	Fresh strawberries	2.50	/images/products/fruits/strawberry.jpg	f	Sweet and juicy strawberries	fruits
6	Grapes	Seedless grapes	2.20	/images/products/fruits/grapes.jpg	f	Fresh green grapes	fruits
7	Watermelon	Fresh watermelon	3.00	/images/products/fruits/watermelon.jpg	f	Hydrating summer fruit	fruits
8	Pineapple	Tropical pineapple	2.70	/images/products/fruits/pineapple.jpg	f	Sweet and tangy pineapple	fruits
9	Peach	Fresh peach	1.60	/images/products/fruits/peach.jpg	f	Soft and sweet peach	fruits
10	Pear	Juicy pear	1.40	/images/products/fruits/pear.jpg	f	Fresh green pear	fruits
11	Kiwi	Kiwi fruit	1.30	/images/products/fruits/kiwi.jpg	f	Tangy kiwi fruit	fruits
12	Lemon	Fresh lemon	0.80	/images/products/fruits/lemon.jpg	f	Sour and fresh lemon	fruits
13	Avocado	Fresh avocado	2.90	/images/products/fruits/avocado.jpg	t	Creamy ripe avocado	fruits
14	Blueberry	Blueberries	3.20	/images/products/fruits/blueberry.jpg	f	Antioxidant rich blueberries	fruits
15	Cherry	Fresh cherries	3.50	/images/products/fruits/cherry.jpg	f	Sweet red cherries	fruits
16	Pomegranate	Fresh pomegranate	2.60	/images/products/fruits/nar.jpg	f	Rich antioxidant fruit	fruits
17	Chips	Potato chips	1.50	/images/products/snacks/chips.jpg	f	Crispy salted chips	snacks
18	Cookies	Baked cookies	2.20	/images/products/snacks/cookies.jpg	f	Sweet baked cookies	snacks
19	Popcorn	Butter popcorn	1.80	/images/products/snacks/popcorn.jpg	f	Light and crispy popcorn	snacks
20	Chocolate	Milk chocolate	2.00	/images/products/snacks/chocolate.jpg	t	Smooth milk chocolate	snacks
21	Chocolate Bar	Chocolate snack	1.90	/images/products/snacks/chocolatee.jpg	f	Sweet chocolate snack	snacks
22	Crackers	Crunchy crackers	1.40	/images/products/snacks/crackers.jpg	f	Salted crackers	snacks
23	Nachos	Corn nachos	2.10	/images/products/snacks/nachos.jpg	f	Crunchy corn nachos	snacks
24	Pretzels	Salted pretzels	1.60	/images/products/snacks/pretzels.jpg	f	Twisted pretzels	snacks
25	Granola	Granola snack	2.80	/images/products/snacks/granola.jpg	t	Healthy granola	snacks
26	Trail Mix	Mixed nuts snack	3.10	/images/products/snacks/trailmix.jpg	f	Energy boosting trail mix	snacks
27	Protein Bar	Protein snack	2.40	/images/products/snacks/protein.jpg	t	High protein bar	snacks
28	Energy Bar	Energy snack	2.30	/images/products/snacks/energy.jpg	f	Quick energy snack	snacks
29	Gummies	Fruit gummies	1.70	/images/products/snacks/gummies.jpg	f	Chewy fruit gummies	snacks
30	Tomato	Fresh tomatoes	1.20	/images/products/vegetables/tomato.jpg	t	Fresh red tomatoes	vegetables
31	Potato	Organic potatoes	1.00	/images/products/vegetables/potato.jpg	f	Farm fresh potatoes	vegetables
32	Onion	Fresh onions	0.90	/images/products/vegetables/onion.jpg	f	Strong flavored onions	vegetables
33	Carrot	Crunchy carrots	1.10	/images/products/vegetables/carrot.jpg	f	Sweet orange carrots	vegetables
34	Broccoli	Green broccoli	2.00	/images/products/vegetables/broccoli.jpg	t	Fresh green broccoli	vegetables
35	Cucumber	Fresh cucumber	1.30	/images/products/vegetables/cucumber.jpg	f	Cool cucumber	vegetables
36	Pepper	Green pepper	1.40	/images/products/vegetables/pepper.jpg	f	Fresh bell pepper	vegetables
37	Garlic	Garlic cloves	0.70	/images/products/vegetables/garlic.jpg	f	Strong garlic	vegetables
38	Spinach	Fresh spinach	1.50	/images/products/vegetables/spinach.jpg	f	Leafy spinach	vegetables
39	Lettuce	Iceberg lettuce	1.60	/images/products/vegetables/lettuce.jpg	f	Crisp lettuce	vegetables
40	Zucchini	Green zucchini	1.80	/images/products/vegetables/zucchini.jpg	f	Fresh zucchini	vegetables
41	Corn	Sweet corn	1.70	/images/products/vegetables/corn.jpg	f	Golden sweet corn	vegetables
42	Bread	Fresh bread	1.30	/images/products/bakery/bread.jpg	t	Daily baked bread	bakery
43	Croissant	Butter croissant	1.90	/images/products/bakery/croissant.jpg	t	French croissant	bakery
44	Cake	Chocolate cake	4.50	/images/products/bakery/cake.jpg	f	Soft chocolate cake	bakery
45	Brownie	Chocolate brownie	2.20	/images/products/bakery/brownie.jpg	f	Rich chocolate brownie	bakery
46	Donut	Glazed donut	1.40	/images/products/bakery/donut.jpg	f	Sweet donut	bakery
47	Muffin	Blueberry muffin	1.80	/images/products/bakery/muffin.jpg	f	Soft muffin	bakery
48	Bagel	Fresh bagel	1.60	/images/products/bakery/bagel.jpg	f	Chewy bagel	bakery
49	Baguette	French baguette	1.70	/images/products/bakery/baguette.jpg	t	Crispy baguette	bakery
50	Rolls	Bread rolls	1.50	/images/products/bakery/rolls.jpg	f	Soft rolls	bakery
51	Toast	Toasted bread	1.20	/images/products/bakery/toast.jpg	f	Crunchy toast	bakery
52	Cookies	Baked cookies	2.10	/images/products/bakery/cookies.jpg	f	Sweet cookies	bakery
53	Pie	Fruit pie	3.80	/images/products/bakery/pie.jpg	f	Homemade pie	bakery
54	Milk	Fresh milk	1.20	/images/products/dairy/milk.jpg	t	Whole milk	dairy
55	Cheese	Cheddar cheese	2.80	/images/products/dairy/cheese.jpg	f	Aged cheddar cheese	dairy
56	Yogurt	Natural yogurt	1.50	/images/products/dairy/yogurt.jpg	f	Creamy yogurt	dairy
57	Butter	Fresh butter	2.40	/images/products/dairy/butter.jpg	f	Unsalted butter	dairy
58	Cream	Cooking cream	1.90	/images/products/dairy/cream.jpg	f	Rich cream	dairy
59	Ice Cream	Vanilla ice cream	3.60	/images/products/dairy/icecream.jpg	t	Cold vanilla ice cream	dairy
60	Mozzarella	Mozzarella cheese	2.60	/images/products/dairy/mozzarella.jpg	f	Fresh mozzarella	dairy
61	Chocolate Milk	Choco milk	1.70	/images/products/dairy/chocmilk.jpg	f	Sweet chocolate milk	dairy
62	Coffee Beans	Roasted coffee beans	4.20	/images/products/dairy/coffeebeans.jpg	t	Premium roasted beans	dairy
63	Salt	Table salt	0.60	/images/products/dairy/salt.jpg	f	Fine table salt	dairy
64	Spices	Mixed spices	2.30	/images/products/dairy/spices.jpg	f	Kitchen spices	dairy
65	Matcha	Matcha powder	3.90	/images/products/dairy/matcha.jpg	t	Premium matcha tea	dairy
66	Shampoo	Hair shampoo	3.50	/images/products/self-care/shampo.jpg	t	Daily hair cleansing shampoo	self-care
67	Toothbrush	Soft toothbrush	1.20	/images/products/self-care/toothbrush.jpg	f	Soft bristle toothbrush	self-care
68	Toothpaste	Mint toothpaste	2.00	/images/products/self-care/toothpaste.jpg	f	Fluoride mint toothpaste	self-care
69	Mouthwash	Antibacterial mouthwash	2.80	/images/products/self-care/mouthwash.jpg	f	Fresh breath mouthwash	self-care
70	Body Cream	Moisturizing body cream	4.50	/images/products/self-care/body-cream.jpg	t	Hydrating body cream for dry skin	self-care
71	Face Cleanser	Facial cleanser	3.90	/images/products/self-care/faceCleanser.jpg	t	Gentle daily face cleanser	self-care
72	Deodorant	Body deodorant	2.70	/images/products/self-care/rexona.jpg	f	Long-lasting deodorant	self-care
73	Lip Care	Lip balm	1.80	/images/products/self-care/lipCare.jpg	f	Moisturizing lip balm	self-care
74	Vaseline	Petroleum jelly	1.60	/images/products/self-care/vaseline.jpg	f	Multi-purpose skin protection	self-care
75	Hair Brush	Hair brush	2.20	/images/products/self-care/hairPrush.jpg	f	Daily hair brush	self-care
76	Loofa	Bath loofa	1.50	/images/products/self-care/loofa.jpg	f	Exfoliating bath loofa	self-care
77	Body Sponge	Bath sponge	1.30	/images/products/self-care/spon.jpg	f	Soft body sponge	self-care
\.


--
-- TOC entry 5049 (class 0 OID 17685)
-- Dependencies: 224
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (rating, created_at, id, product_id, comment, user_email, user_name, user_uid) FROM stdin;
\.


--
-- TOC entry 5051 (class 0 OID 17699)
-- Dependencies: 226
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profiles (created_at, id, updated_at, address, email, phone, user_uid) FROM stdin;
\.


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 227
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 77, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 223
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_profiles_id_seq', 1, false);


-- Completed on 2025-12-29 09:54:36

--
-- PostgreSQL database dump complete
--

\unrestrict qFy4AVq9wNKTUK9LH8Df2QMbbUea8QicBWtLTDfBesqVbyUIimXrR9VWnhtqToi

