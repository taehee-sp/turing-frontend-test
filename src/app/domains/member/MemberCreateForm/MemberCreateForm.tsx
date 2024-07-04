"use client";
import { button } from "@/app/common/components/ds";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { css, cx } from "@styled-system/css";
import { vstack } from "@styled-system/patterns";
import { type ComponentProps, forwardRef, useId } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import invariant from "tiny-invariant";
import * as v from "valibot";

const NewMemberSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(1, "이름을 입력해주세요"),
		v.maxLength(24, "이름은 24자까지만 입력 가능합니다."),
	),
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
			<p
				role="alert"
				aria-label={errorMessage}
				className={css({ color: "red" })}
			>
				{errorMessage}
			</p>
		);
	}
	return <p />;
};

const Input = forwardRef<
	HTMLInputElement,
	ComponentProps<"input"> & { name: string }
>((props, ref) => {
	const {
		formState: { errors },
	} = useFormContext();

	return (
		<input
			ref={ref}
			{...props}
			className={css({
				width: "100%",
				borderRadius: "8px",
				border: "1px solid #d9dee2",
				padding: "16px",
			})}
			aria-invalid={typeof errors[props.name]?.message === "string"}
		/>
	);
});

export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => Promise<void>;
}) => {
	const methods = useForm<{ name: string; email: string }>({
		resolver: valibotResolver(NewMemberSchema),
	});

	const { register, handleSubmit } = methods;

	const id = useId();
	return (
		<FormProvider {...methods}>
			<h2
				id={id}
				className={css({
					fontSize: "2rem",
					fontWeight: "bold",
				})}
			>
				멤버 추가
			</h2>
			<form
				aria-labelledby={id}
				className={cx(
					vstack(),
					css({
						background: "white",
						padding: "20px",
						borderRadius: "12px",
						border: "1px solid black",
						margin: "12px",
					}),
				)}
				onSubmit={handleSubmit((data) => {
					createMember(data).then(() => {
						toast("멤버를 추가했어요!");
					});
				})}
			>
				<label
					className={cx(
						vstack({ alignItems: "start" }),
						css({ width: "100%" }),
					)}
				>
					<div>
						이름 <span className={css({ color: "red" })}>*</span>
					</div>
					<Input type="text" {...register("name")} />
					<SimpleErrorMessage name="name" />
				</label>
				<label
					className={cx(
						vstack({ alignItems: "start" }),
						css({ width: "100%" }),
					)}
				>
					<div>
						회사 이메일 <span className={css({ color: "red" })}>*</span>
					</div>
					<Input type="email" {...register("email")} />
					<SimpleErrorMessage name="email" />
				</label>
				<button type="submit" className={button()}>
					추가하기
				</button>
			</form>
		</FormProvider>
	);
};
