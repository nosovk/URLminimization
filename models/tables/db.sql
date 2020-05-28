create database url
	with owner alex__filatov;

create table if not exists users
(
	id serial not null
		constraint users_pk
			primary key,
	email varchar(255) not null,
	password varchar(255) not null
);

alter table users owner to alex__filatov;

create table if not exists location
(
	id serial not null
		constraint location_pk
			primary key,
	country varchar(255),
	cnt integer default 0,
	urlcode varchar(255)
);

alter table location owner to alex__filatov;

create table if not exists tokens
(
	id serial not null
		constraint tokens_pk
			primary key,
	rtoken varchar(255)
);

alter table tokens owner to alex__filatov;

create table if not exists urlshema
(
	id serial not null
		constraint urlshema_pk
			primary key,
	longurl varchar(255) not null,
	urlcode varchar(255) not null
);

alter table urlshema owner to alex__filatov;
