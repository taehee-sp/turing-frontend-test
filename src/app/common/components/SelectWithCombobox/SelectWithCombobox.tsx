"use client";
import * as Ariakit from "@ariakit/react";
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

	const matches = optionList.filter((option) =>
		option.searchValue.includes(searchValue),
	);

	const selectedOption = selected
		? optionList.find((option) => option.value === selected) ?? null
		: null;

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
					<button type="button" onClick={() => {
            onChange(null)
          }}>{selectedOption.label} 해제하기</button>
				) : (
					<Ariakit.Select>
						<Ariakit.SelectValue>{() => emptyValue}</Ariakit.SelectValue>
					</Ariakit.Select>
				)}
				<Ariakit.SelectPopover gutter={4} sameWidth className="popover">
					<div className="combobox-wrapper">
						<Ariakit.Combobox
							autoSelect
							placeholder={searchPlaceholder}
							aria-label={searchPlaceholder}
						/>
					</div>
					<Ariakit.ComboboxList>
						{matches.map((option) => (
							<Ariakit.SelectItem
								key={option.value}
								value={option.value}
								className="select-item"
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
