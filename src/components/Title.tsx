import React, { ReactNode } from "react";

export default function Title({
	level,
	children,
}: {
	level: number;
	children: ReactNode;
}) {
	switch (level) {
		case 1:
			return (
				<div className="title">
					<h1>{children}</h1>
				</div>
			);
		case 2:
			return (
				<div className="title">
					<h2>{children}</h2>
				</div>
			);
		case 3:
			return (
				<div className="title">
					<h3>{children}</h3>
				</div>
			);
		case 4:
			return (
				<div className="title">
					<h4>{children}</h4>
				</div>
			);
		case 5:
			return (
				<div className="title">
					<h5>{children}</h5>
				</div>
			);
		case 6:
			return (
				<div className="title">
					<h6>{children}</h6>
				</div>
			);
	}
}
