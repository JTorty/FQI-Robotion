PGDMP     "    5                {           Robotion    15.2    15.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16422    Robotion    DATABASE     }   CREATE DATABASE "Robotion" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
    DROP DATABASE "Robotion";
                postgres    false            �            1259    16423    robots    TABLE     �   CREATE TABLE public.robots (
    model text NOT NULL,
    status text,
    battery integer,
    longitude numeric,
    latitude numeric,
    x_pixel integer,
    y_pixel integer
);
    DROP TABLE public.robots;
       public         heap    postgres    false            �          0    16423    robots 
   TABLE DATA           _   COPY public.robots (model, status, battery, longitude, latitude, x_pixel, y_pixel) FROM stdin;
    public          postgres    false    214   �       e           2606    16429    robots robot_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.robots
    ADD CONSTRAINT robot_pkey PRIMARY KEY (model);
 ;   ALTER TABLE ONLY public.robots DROP CONSTRAINT robot_pkey;
       public            postgres    false    214            �     x�M�9NAEc�]��^�AJB@@B���nu�*q����f����y�����R2y��K�G�C�D u�*2k�����e�S�b�م�i�VE�a$�H�OZ7:p���!��d����)Kn~�؝��3=z	G\E���N�6��FU%1Ɓ���`�h�t3�q����%,@��D��@O����N��co�IG���+��6�Yk����熻/\B=���+��ȱ�4!H��ko��+Z£<��'��RQR�p��{oO�f+�s����#�c;4�o��8��?��     