import { db } from '@/utils/conn';

import Link from 'next/link';

import AlbumsGallery from '@/components/Catalog';

export default async function Home() {
	const albums = (await db.query(`SELECT * FROM albums`)).rows;
	console.log(albums);

	return (
		<main className="grid grid-cols-8 gap-4">
			<div className="flex flex-wrap col-span-4 col-start-3 justify-between">
				{albums.map((a) => (
					<Link key={a.id} href={`/${a.id}`}>
						<AlbumsGallery
							img_url={a.img_url}
							title={a.title}
							artist={a.artist}
						/>
					</Link>
				))}
			</div>
		</main>
	);
}
