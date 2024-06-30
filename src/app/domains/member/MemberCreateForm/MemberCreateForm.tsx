"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const NewMemberSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "이름을 입력해주세요")),
	email: v.pipe(
		v.string(),
		v.minLength(1, "이메일을 입력해주세요"),
		v.email("올바른 이메일 형식을 입력해주세요"),
	),
});

export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ name: string; email: string }>({
		resolver: valibotResolver(NewMemberSchema),
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				createMember(data);
			})}
		>
			<label>
				이름
				<input type="text" {...register("name")} />
				{errors.name?.message && (
					<p role="alert" aria-label={errors.name.message}>
						{errors.name.message}
					</p>
				)}
			</label>
			<label>
				이메일
				<input type="email" {...register("email")} />
				{errors.email?.message && (
					<p role="alert" aria-label={errors.email.message}>
						{errors.email.message}
					</p>
				)}
			</label>
			<button type="submit">추가하기</button>
		</form>
	);
};
