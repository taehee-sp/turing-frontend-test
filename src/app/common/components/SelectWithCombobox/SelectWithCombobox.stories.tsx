"use client";
import { useState } from "react";
import { SelectWithCombobox } from "./SelectWithCombobox";

export const SelectWithComboboxStory = ({ memberList }: {memberList: {id: string; name: string}[]}) => {
	const [selected, setSelected] = useState<string | null>(null);
	return (
		<SelectWithCombobox
			label="사용자"
			emptyValue={<div>설정하기</div>}
			searchPlaceholder="이름을 입력해주세요"
			optionList={memberList.map(member => ({ value: member.id, searchValue: member.name, label: <div>{member.name}</div>}))}
			selected={selected}
			onChange={setSelected}
		/>
	);
};
