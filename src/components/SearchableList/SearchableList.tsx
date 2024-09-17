import { Box } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";

interface SearchableListProps<T> {
	items: T[];
	keyFn: (item: T) => string | number;
	children: (item: T, index: number) => JSX.Element;
	className: string;
	itemClassName: string;
	inputClassName: string;
}

export default function SearchableList<T>({
	items,
	keyFn,
	children,
	className,
	itemClassName,
	inputClassName,
}: SearchableListProps<T>) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const lastChange = useRef<any>();
	const resultItems = items.filter((item: any) =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		if (lastChange.current) {
			clearTimeout(lastChange.current);
		}
		lastChange.current = setTimeout(() => {
			lastChange.current = null;
			setSearchTerm(event.target.value);
		}, 500);
	}
	return (
		<>
			<input
				onChange={handleInputChange}
				className={inputClassName}
				placeholder="검색어를 입력해주세요."
			/>
			<Box className={className}>
				{resultItems.map((item, index) => (
					<Box className={itemClassName} key={keyFn(item)}>
						{children(item, index)}
					</Box>
				))}
			</Box>
		</>
	);
}
