import "./TitleBar.css";

export default function TitleBar({
	hasPreviousButton,
}: {
	hasPreviousButton: boolean;
}) {
	return (
		<div className="title-bar">
			{hasPreviousButton ? <div>^</div> : undefined}
			<h3>👟RunTale</h3>
		</div>
	);
}
