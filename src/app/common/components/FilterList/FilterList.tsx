"use client";
import { css } from "@styled-system/css/css";
import { hstack } from "@styled-system/patterns";
import type { ReactNode } from "react";

export const FilterList = ({
	title,
	optionList,
	selected,
	onChange,
}: {
	title: string;
	optionList: { value: string; label: ReactNode }[];
	selected: string;
	onChange: (value: string) => void;
}) => {
	return (
		<fieldset className={hstack()}>
			<legend className={css({ display: "block" })}> {title} </legend>
			{optionList.map((option) => (
				<label
					key={option.value}
					className={css({
						borderRadius: "9999px",
						padding: "8px 12px",
						borderWidth: "1px",
						borderColor: "transparent",
						backgroundColor: "#f1f4f6",
						fontSize: "0.75rem",
						transition: "all 0.125s ease-in-out",
						"&:has(input:checked)": {
							borderColor: "#4f89fb",
							backgroundColor: "#eaf3fe",
							color: "#1863f6",
						},
					})}
				>
					{option.label}
					<input
						className={css({ srOnly: true })}
						type="radio"
						value={option.value}
						checked={selected === option.value}
						onChange={() => {
							onChange(option.value);
						}}
					/>
				</label>
			))}
		</fieldset>
	);
};
