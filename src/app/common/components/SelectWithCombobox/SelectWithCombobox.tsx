"use client";
import * as Ariakit from "@ariakit/react";
import { cx } from "@styled-system/css";
import { css } from "@styled-system/css/css";
import { hstack, vstack } from "@styled-system/patterns";
import { getRegExp } from "korean-regexp";
import { startTransition, useState, type ReactNode } from "react";

export const SelectWithCombobox = ({
	label,
	emptyValue,
	searchPlaceholder,
	optionList,
	selected,
	onChange,
}: {
	label: ReactNode;
	emptyValue: ReactNode;
	optionList: { value: string; searchValue: string; label: ReactNode }[];
	searchPlaceholder: string;
	selected: string | null;
	onChange: (value: string | null) => void;
}) => {
	const [searchValue, setSearchValue] = useState("");

	const regex = getRegExp(searchValue);
	const matches = optionList.filter((option) => regex.test(option.searchValue));

	const selectedOption = selected
		? optionList.find((option) => option.value === selected) ?? null
		: null;

	const inputRecipe = () =>
		css({
			width: "100%",
			borderRadius: "8px",
			border: "1px solid #d9dee2",
			padding: "16px",
      textAlign: 'left'
		});

	return (
		<Ariakit.ComboboxProvider
			resetValueOnHide
			setValue={(value) => {
				startTransition(() => {
					setSearchValue(value);
				});
			}}
		>
			<Ariakit.SelectProvider
				setValue={(value) => {
					onChange(value as string | null);
				}}
				defaultValue=""
			>
				<Ariakit.SelectLabel>{label}</Ariakit.SelectLabel>
				{selectedOption ? (
					<button
						className={cx(inputRecipe(), hstack())}
						type="button"
						onClick={() => {
							onChange(null);
						}}
					>
						{selectedOption.label} 해제하기
					</button>
				) : (
					<Ariakit.Select className={inputRecipe()}>
						<Ariakit.SelectValue>{() => emptyValue}</Ariakit.SelectValue>
					</Ariakit.Select>
				)}
				<Ariakit.SelectPopover
					gutter={4}
					sameWidth
					className={cx(
						vstack(),
						css({
							background: "white",
							padding: "20px",
							borderRadius: "12px",
							boxShadow: "0 12px 40px -4px rgba(25,30,40,.16)",
						}),
					)}
				>
					<Ariakit.Combobox
						className={inputRecipe()}
						autoSelect
						placeholder={searchPlaceholder}
						aria-label={searchPlaceholder}
					/>
					<Ariakit.ComboboxList className={css({ width: "100%" })}>
						{matches.map((option) => (
							<Ariakit.SelectItem
								key={option.value}
								value={option.value}
								className={css({
									width: "100%",
									padding: "10px 12px",
									borderRadius: "8px",
									"&[data-active-item]": {
										background: "#f1f4f6",
									},
								})}
								render={
									<Ariakit.ComboboxItem>{option.label}</Ariakit.ComboboxItem>
								}
							/>
						))}
					</Ariakit.ComboboxList>
				</Ariakit.SelectPopover>
			</Ariakit.SelectProvider>
		</Ariakit.ComboboxProvider>
	);
};
