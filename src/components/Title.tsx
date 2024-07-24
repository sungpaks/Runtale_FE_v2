import React, { ReactNode } from "react";
import "./Title.css";

export default function Title({
	level,
	children,
	style,
}: {
	level: number;
	children: ReactNode;
	style?: any;
}) {
	switch (level) {
		case 1:
			return (
				<div className="title" style={style}>
					<h1>{children}</h1>
				</div>
			);
		case 2:
			return (
				<div className="title" style={style}>
					<h2>{children}</h2>
				</div>
			);
		case 3:
			return (
				<div className="title" style={style}>
					<h3>{children}</h3>
				</div>
			);
		case 4:
			return (
				<div className="title" style={style}>
					<h4>{children}</h4>
				</div>
			);
		case 5:
			return (
				<div className="title" style={style}>
					<h5>{children}</h5>
				</div>
			);
		case 6:
			return (
				<div className="title" style={style}>
					<h6>{children}</h6>
				</div>
			);
	}
}
