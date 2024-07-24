export default function TitleBar({
	hasPreviousButton,
}: {
	hasPreviousButton: boolean;
}) {
	return (
		<div className="title-bar">
			{hasPreviousButton ? <div>^</div> : undefined}
			<h1>👟RunTale</h1>
		</div>
	);
}
