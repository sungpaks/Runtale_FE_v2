export default function AnimalCrawls({ animal }: { animal: string }) {
	return (
		<>
			{animal} {animal} {animal}
			<div
				style={{
					position: "relative",
					top: "-5px",
					borderBottom: "1px solid gray",
				}}
			></div>
		</>
	);
}
