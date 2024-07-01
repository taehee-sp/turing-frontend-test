"use client";
import { useState } from "react";
import { SelectWithCombobox } from "./SelectWithCombobox";
import { OverlayProvider, overlay } from "overlay-kit";
import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react/dialog";
import { button, dialog } from "../ds";
import { css } from "@styled-system/css/css";

export const SelectWithComboboxStory = ({
	memberList,
}: { memberList: { id: string; name: string }[] }) => {
	const [selected, setSelected] = useState<string | null>(null);

	return (
		<OverlayProvider>
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
						overlay.open(({ isOpen, close }) => {
							return (
								<Dialog className={dialog()} open={isOpen} onClose={close}>
									<DialogHeading>사용자를 해제할까요?</DialogHeading>
									<div>
										<DialogDismiss
											className={button()}
											onClick={() => {
												setSelected(null);
											}}
										>
											확인
										</DialogDismiss>
									</div>
								</Dialog>
							);
						});
					} else {
						setSelected(newOwner);
					}
				}}
			/>
		</OverlayProvider>
	);
};
