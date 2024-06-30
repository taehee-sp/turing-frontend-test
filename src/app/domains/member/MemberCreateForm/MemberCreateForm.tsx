"use client";

export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => void;
}) => {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				const data = Object.fromEntries(new FormData(event.currentTarget));

				createMember(data);
			}}
		>
			<label>
				이름
				<input name="name" type="text" />
			</label>
			<label>
				이메일
				<input name="email" type="email" />
			</label>
			<button type="submit">추가하기</button>
		</form>
	);
};
