"use client";
import { useState } from "react";
import { SelectWithCombobox } from "./SelectWithCombobox";

export const SelectWithComboboxStory = ({ memberList }: {memberList: {id: string; name: string}[]}) => {
	const [selected, setSelected] = useState<string | null>(null);
	return (
		<SelectWithCombobox
			title="필터"
			emptyLabel={<div>설정하기</div>}
			optionList={memberList.map(member => ({ id: member.id, value: member.name, label: <div> {member.name}</div>}))}
			selected={selected}
			onChange={setSelected}
		/>
	);
};
