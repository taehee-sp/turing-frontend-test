import { render } from "@testing-library/react";
import MemberCreateFormStories from "./MemberCreateForm.fixture";
import { describe, expect, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";
import { MemberCreateForm } from "./MemberCreateForm";

describe("MemberCreateForm", () => {
	test("올바른 정보를 입력하면 멤버를 추가할 수 있다", async () => {
		let submitted: null | { name: string; email: string } = null;
		render(
			<MemberCreateForm
				createMember={(newMember) => {
					submitted = newMember;
				}}
			/>,
		);

		await queryTL.textbox("이름").fill("김태희");
		// await queryTL.textbox("이메일").fill("twinstae@naver.com");

		// await queryTL.button("추가하기").click();

		// await expectTL(queryTL.alert("멤버를 추가했어요!")).toBeVisible();

		// expect(submitted).toEqual({
		// 	name: "김태희",
		// 	email: "twinstae@naver.com",
		// });
	});
});
