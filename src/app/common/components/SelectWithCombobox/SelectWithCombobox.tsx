"use client";
import type { ReactNode } from "react";

export const SelectWithCombobox = ({
	title,
	optionList,
	selected,
	emptyLabel,
	onChange,
}: {
	title: string;
	emptyLabel: ReactNode,
	optionList: { id: string; value: string; label: ReactNode }[];
	selected: string | null;
	onChange: (value: string | null) => void;
}) => {
	return (
<select></select>
	);
};
