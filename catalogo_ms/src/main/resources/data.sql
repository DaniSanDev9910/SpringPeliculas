delete from visualizacion;
delete from pelicula;
delete from genero;

insert into genero (id_genero, nombre) values('c05e0714-bc57-4493-bc1a-f0ee5fac1783', 'Acción');
insert into genero (id_genero, nombre) values('57f2217c-a199-4be0-af19-963bd03a6bfb', 'Terror');
insert into genero (id_genero, nombre) values('9254b907-7ae0-4986-9921-1bb1cffb390b', 'Drama');
insert into genero (id_genero, nombre) values('96334042-9ed6-4181-803a-71a74fb300e8', 'Comedia');
insert into genero (id_genero, nombre) values('b2e7fa94-1d65-44df-afcd-db062f7f48f0', 'Aventura');
insert into genero (id_genero, nombre) values('b48bb0aa-2300-40fb-a091-27875cbcce91', 'Suspenso');
insert into genero (id_genero, nombre) values('9928ed32-c327-47cd-b6a5-24af10e3e191', 'Infantil');
insert into genero (id_genero, nombre) values('be25fd19-b375-4005-af13-c21f8911ac07', 'Ciencia ficción');

insert into pelicula(id_pelicula, director, id_genero, imagen, nombre, sinopsis, anio, rating)
values('121c8aea-4764-4ada-aa73-689650c849cb', 'James Gunn', 'be25fd19-b375-4005-af13-c21f8911ac07', 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/5/5/5/6/76555-1-esl-CO/f054ca73cce2-poster480_670.jpg', 'Superman', 'Sigue al superhéroe titular mientras reconcilia su herencia con su educación humana. Es la encarnación de la verdad, la justicia y un mañana mejor en un mundo que ve la bondad como algo anticuado.', 2025, 7.9);
insert into pelicula(id_pelicula, director, id_genero, imagen, nombre, sinopsis, anio, rating)
values('d12756e7-54a2-4337-8e27-4c835b6dcd0d', 'Adrian Molina, Madeline Sharafian, Domee Shi', '9928ed32-c327-47cd-b6a5-24af10e3e191', 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/7/5/6/5/75657-1-esl-CO/eabe5e1cf935-poster-3-480x670-1-.png', 'Elio', 'Elio es transportado por los extraterrestres y se convierte en el elegido para ser embajador galáctico de la Tierra, mientras su madre, Olga, trabaja en el proyecto ultra secreto para descifrar mensajes alienígenas.', 2025, 7);
insert into pelicula(id_pelicula, director, id_genero, imagen, nombre, sinopsis, anio, rating)
values('475e0f92-81eb-4658-ae05-5fbca6e5f0ff', 'Dean DeBlois', 'b2e7fa94-1d65-44df-afcd-db062f7f48f0', 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/2/2/2/6/76222-2-esl-CO/0e8be704015a-httyd_cineco_2-poster_480x670.jpg', 'How to Train Your Dragon', 'Un joven vikingo aspira a cazar dragones, pero se convierte inesperadamente en amigo de un joven dragón', 2025, 8.5);
insert into pelicula(id_pelicula, director, id_genero, imagen, nombre, sinopsis, anio, rating)
values('c5252bf5-1e2d-4a35-97d0-16eae0303733', 'Len Wiseman', 'c05e0714-bc57-4493-bc1a-f0ee5fac1783', 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/0/6/4/5/75460-4-esl-CO/f6e55e24c066-2_poster_480x670.png', 'Ballerina', 'Ambientada durante los acontecimientos de John Wick: Chapter 3 – Parabellum, la película sigue a Eve Macarro (Ana de Armas), una asesina en formación que se adentra en las implacables tradiciones mortales de los Ruska Roma.', 2025, 9.3);
insert into pelicula(id_pelicula, director, id_genero, imagen, nombre, sinopsis, anio, rating)
values('7afc921d-c3ed-441d-a3bb-adc155f46f45', 'Zach Lipovsky, Adam B. Stein', 'b48bb0aa-2300-40fb-a091-27875cbcce91', 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/6/3/7/5/75736-1-esl-CO/d63b5e2e0af6-warner_fdb_cinecol_480x670.jpg', 'Final Destination: Bloodlines', 'A medida que un grupo de socorristas escapan de las garras de la muerte, empiezan a ser asesinados por percances cada vez más improbables y asesinos.', 2025, 8);

insert into visualizacion(id_visualizacion, id_pelicula, numero_visualizaciones)
values('59ebe0c3-2cde-45ba-a258-b5ff5ec32154', '121c8aea-4764-4ada-aa73-689650c849cb', 4);
insert into visualizacion(id_visualizacion, id_pelicula, numero_visualizaciones)
values('aafb868a-c1ac-476d-b7a5-8f599d2a556f', 'd12756e7-54a2-4337-8e27-4c835b6dcd0d', 7);
insert into visualizacion(id_visualizacion, id_pelicula, numero_visualizaciones)
values('99824c06-ff84-4120-a6b8-6b28abfcffbc', '475e0f92-81eb-4658-ae05-5fbca6e5f0ff', 10);
insert into visualizacion(id_visualizacion, id_pelicula, numero_visualizaciones)
values('1a0fa67f-53fd-4662-9b50-3071157cb43a', 'c5252bf5-1e2d-4a35-97d0-16eae0303733', 2);
insert into visualizacion(id_visualizacion, id_pelicula, numero_visualizaciones)
values('6f0e9cbb-937e-4f71-83fa-83621bc9afce', '7afc921d-c3ed-441d-a3bb-adc155f46f45', 13);