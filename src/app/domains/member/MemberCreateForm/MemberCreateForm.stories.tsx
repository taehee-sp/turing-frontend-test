"use client";
import { MemberCreateForm } from "./MemberCreateForm";

export const MemberCreateFormStory = () => (
	<MemberCreateForm
		createMember={(newMember) => {
			alert(JSON.stringify(newMember));
		}}
	/>
);
