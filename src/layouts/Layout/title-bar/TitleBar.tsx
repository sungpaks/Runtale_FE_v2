import "./TitleBar.css";

export default function TitleBar({
	hasPreviousButton,
}: {
	hasPreviousButton: boolean;
}) {
	return (
		<div className="title-bar">
			{hasPreviousButton ? <div>^</div> : undefined}
			<h2>👟RunTale</h2>
		</div>
	);
}
