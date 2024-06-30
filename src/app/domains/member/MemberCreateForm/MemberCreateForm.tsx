"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { VStack } from '@styled-system/jsx';
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import invariant from "tiny-invariant";
import * as v from "valibot";

const NewMemberSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "이름을 입력해주세요")),
	email: v.pipe(
		v.string(),
		v.minLength(1, "이메일을 입력해주세요"),
		v.email("올바른 이메일 형식을 입력해주세요"),
	),
});

const SimpleErrorMessage = ({ name }: { name: string }) => {
	const {
		formState: { errors },
	} = useFormContext();

	const errorMessage = errors[name]?.message;
	if (errorMessage) {
		invariant(typeof errorMessage === "string");
		return (
			<p role="alert" aria-label={errorMessage}>
				{errorMessage}
			</p>
		);
	}
	return null;
};

export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => void;
}) => {
	const methods = useForm<{ name: string; email: string }>({
		resolver: valibotResolver(NewMemberSchema),
	});

	const { register, handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<VStack>
			<form
				onSubmit={handleSubmit((data) => {
					createMember(data);
				})}
			>
				<label>
					이름
					<input type="text" {...register("name")} />
					<SimpleErrorMessage name="name" />
				</label>
				<label>
					이메일
					<input type="email" {...register("email")} />
					<SimpleErrorMessage name="email" />
				</label>
				<button type="submit">추가하기</button>
			</form>
			</VStack>
		</FormProvider>
	);
};
