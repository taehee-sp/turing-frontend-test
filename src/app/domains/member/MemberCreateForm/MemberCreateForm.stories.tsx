"use client";
import { MemberCreateForm } from "./MemberCreateForm";

export const MemberCreateFormStory = () => (
	<MemberCreateForm
		createMember={async (newMember) => {
			alert(JSON.stringify(newMember));
		}}
	/>
);
