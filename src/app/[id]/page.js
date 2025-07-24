import { db } from '@/utils/conn';

import Image from 'next/image';

export default async function AlbumPage({ params }) {
	const { id } = await params;

	const info = (
		await db.query(`SELECT * FROM albums WHERE albums.id = $1`, [id])
	).rows;

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
						<div>
							<p>Released: {album.year}</p>
							<p>Genre: {album.genre}</p>
						</div>
					</div>
				</div>
			))}
		</main>
	);
}
