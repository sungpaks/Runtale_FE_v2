import React, { MouseEventHandler, useState } from "react";

interface ScenarioListItemProps<T> {
	buttonClassName: string;
	item: any;
	handleClickStart: MouseEventHandler;
}

export default function ScenarioListItem<T>({
	buttonClassName,
	item,
	handleClickStart,
}: ScenarioListItemProps<T>) {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<div>
			<img src={item.profileImage} width="120px" />
			<p style={{ color: "white", fontSize: "0.7rem" }}>{item.title}</p>
			<br />
			<button className={buttonClassName} onClick={handleClickStart}>
				시작하기
			</button>
		</div>
	);
}
