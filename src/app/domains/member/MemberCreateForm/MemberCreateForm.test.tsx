import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";
import { MemberCreateForm } from "./MemberCreateForm";
import { renderWithContext } from "@/siheom/renderWithContext";

describe("MemberCreateForm", () => {
	test("올바른 정보를 입력하면 멤버를 추가할 수 있다", async () => {
		let submitted: null | { name: string; email: string } = null;
		renderWithContext(
			<MemberCreateForm
				createMember={async (newMember) => {
					submitted = newMember;
				}}
			/>,
		);

		const form = queryTL.form("멤버 추가");

		await form.textbox("이름").fill("김태희");
		await form.textbox("회사 이메일").fill("twinstae@naver.com");

		await form.button("추가하기").click();

		await expectTL(queryTL.alert()).toHaveText("멤버를 추가했어요!");

		expect(submitted).toEqual({
			name: "김태희",
			email: "twinstae@naver.com",
		});
	});

	test("이름이나 이메일을 입력하지 않으면 에러 메세지를 보여준다", async () => {
		let submitted: null | { name: string; email: string } = null;
		render(
			<MemberCreateForm
				createMember={async (newMember) => {
					submitted = newMember;
				}}
			/>,
		);

		await queryTL.button("추가하기").click();

		await expectTL(queryTL.alert("이름을 입력해주세요")).toBeVisible();
		await expectTL(queryTL.alert("이메일을 입력해주세요")).toBeVisible();

		expect(submitted).toEqual(null);
	});
});
