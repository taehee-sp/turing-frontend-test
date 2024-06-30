import { MemberCreateForm } from "./MemberCreateForm";

export default {
	기본: (
		<MemberCreateForm
			createMember={(newMember) => {
				alert(JSON.stringify(newMember));
			}}
		/>
	),
};
