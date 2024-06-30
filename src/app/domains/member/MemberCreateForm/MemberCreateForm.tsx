export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => void;
}) => {
	return (
		<form>
			<input />
			<input />
			<button type="submit">추가하기</button>
		</form>
	);
};
