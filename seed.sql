CREATE TABLE albums (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(125) NOT NULL,
  year VARCHAR(4) NOT NULL,
  artist VARCHAR(125) NOT NULL,
  img_url TEXT NOT NULL
)

CREATE TABLE users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(125) UNIQUE NOT NULL,
  bio VARCHAR(225) NOT NULL,
  clerk_id TEXT NOT NULL
)

CREATE TABLE comments (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

  album_id INT,
  CONSTRAINT fk_album FOREIGN KEY (album_id) REFERENCES albums(id),

  user_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),

  title VARCHAR(125) NOT NULL,
  content VARCHAR(225) NOT NULL
)

CREATE TABLE genres (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR(125) NOT NULL
)

CREATE TABLE albums_genres (
  album_id INT REFERENCES albums(id),
  genre_id INT REFERENCES genres(id),
  PRIMARY KEY (album_id, genre_id)
)

-------------------------------------------------------------------------------------------------

INSERT INTO albums (title, year, artist, img_url) VALUES
('Thriller', '1982', 'Michael Jackson', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/d0/d04f2132-4fde-41d4-ae66-2bb31d024692.jpg'),
('Back in Black', '1980', 'AC/DC', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/56/56346d0c-ea56-4904-84e0-cbadcc9b1d91.jpg'),
('The Dark Side of the Moon', '1973', 'Pink Floyd', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/12/1270c45d-89bf-431d-9986-21567cf9892b.jpg'),
('Rumours', '1977', 'Fleetwood Mac', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/a4/a41062a9-85e4-4f27-83f3-cbf325590fc6.jpg'),
('Bat Out of Hell', '1977', 'Meat Loaf', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/1f/1f62ed79-ade5-430b-bfe2-bcb5d330f61c.jpg'),
('Led Zeppelin IV', '1971', 'Led Zeppelin', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/db/db49165e-149c-40ad-b0ec-ac93038970af.jpg'),
('Come On Over', '1997', 'Shania Twain', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/bd/bd551a4e-ccab-4033-8dc3-01b277e91ef2.jpg'),
('21', '2011', 'Adele', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/8a/8ab674fb-9df1-4a2a-a127-36c4b2a4b374.jpg'),
('Metallica', '1991', 'Metallica', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/5c/5c3454f9-0a91-480d-88ed-c05d286d142e.jpg'),
('Nevermind', '1991', 'Nirvana', 'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/0e/0e0df0ab-2488-4e8f-8a68-d94e12afed92.jpg');

INSERT INTO genres (type) VALUES
('Country'),
('Funk'),
('Hard rock'),
('Metal'),
('Pop'),
('Pop rock'),
('Rock'),
('R&B'),
('Soul');

INSERT INTO albums_genres (album_id, genre_id) VALUES
(1, 5),
(1, 7),
(1, 8),
(1, 2),

(2, 3),
(2, 4),

(3, 7),

(4, 6),

(5, 7),
(5, 5),

(6, 3),
(6, 4),

(7, 7),
(7, 5),
(7, 1),

(8, 5),
(8, 8),
(8, 9),

(9, 4),

(10, 7);