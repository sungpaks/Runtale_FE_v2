import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function SearchableList({
	items,
	children,
	className,
}: {
	items: any[];
	children: ReactNode;
	className: string;
}) {
	return <Box className={className}>SearchableList</Box>;
}
