"use client";
import { useState } from "react";
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react/dialog";
import { SelectWithCombobox } from "./SelectWithCombobox";

export const SelectWithComboboxStory = ({
	memberList,
}: { memberList: { id: string; name: string }[] }) => {
	const [selected, setSelected] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	return (
		<>
			<SelectWithCombobox
				label="사용자"
				emptyValue={<div>설정하기</div>}
				removeLabel={<span>해제하기</span>}
				searchPlaceholder="이름을 입력해주세요"
				optionList={memberList.map((member) => ({
					value: member.id,
					searchValue: member.name,
					label: <div>{member.name}</div>,
				}))}
				selected={selected}
				onChange={(newOwner) => {
					if (newOwner === null) {
						setOpen(true);
					} else {
						setSelected(newOwner);
					}
				}}
			/>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogHeading>사용자를 해제할까요?</DialogHeading>
				<div>
					<DialogDismiss
						onClick={() => {
							setSelected(null);
						}}
					>
						확인
					</DialogDismiss>
				</div>
			</Dialog>
		</>
	);
};
