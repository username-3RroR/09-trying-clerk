import { db } from '@/utils/conn';

import Image from 'next/image';

export default async function AlbumPage({ params }) {
	const { id } = await params;

	const info = (
		await db.query(
			`SELECT albums.*, ARRAY_AGG(genres.type) AS genre
			FROM albums

			INNER JOIN albums_genres
			ON albums.id = albums_genres.album_id

			INNER JOIN genres
			ON albums_genres.genre_id = genres.id

			WHERE albums.id = $1
			GROUP BY albums.id`,
			[id]
		)
	).rows;

	console.log(info);

	return (
		<main className="grid grid-cols-8 gap-4 py-24">
			{info.map((album) => (
				<div
					key={album.id}
					className="flex col-span-6 col-start-2 gap-24"
				>
					<Image
						src={album.img_url}
						alt={album.title + 'album cover'}
						height={640}
						width={640}
					/>
					<div className="flex flex-col justify-evenly">
						<div>
							<h2>{album.artist}</h2>
							<h1>{album.title}</h1>
						</div>

						<div className="flex flex-col gap-[1rem]">
							<p>Released: {album.year}</p>

							<div className="flex flex-wrap gap-[1rem] items-center">
								<p>Genre: </p>

								{album.genre.map((g) => (
									<p
										key={g}
										className="bg-blue-50 text-black w-fit px-[1.5rem] py-[0.25rem] rounded-full"
									>
										{g}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</main>
	);
}
