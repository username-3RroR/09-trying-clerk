import Image from 'next/image';

export default function AlbumsGallery({ img_url, title, artist }) {
	return (
		<div className="flex flex-col items-center my-8 gap-2">
			<Image src={img_url} alt={title} height={240} width={240} />
			<h2 className="text-[1.5rem] w-[220] text-center">{title}</h2>
			<p>{artist}</p>
		</div>
	);
}
