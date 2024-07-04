import { render } from "@testing-library/react";
import SaasListStories from "./SaasList.fixture";
import { describe, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";

describe("SaasList", () => {
	test("SaaS가 없으면, 연동하세요 링크를 보여준다", async () => {
		render(SaasListStories["Saas가 없음"]);

		await expectTL(queryTL.link("연동하세요")).toHaveAttribute(
			"href",
			"/connect",
		);
	});
	test("결제 내역 있는 SaaS만 필터할 수 있다", async () => {
		render(SaasListStories["Saas가 여럿 있음"]);

		// given 전체 SaaS 필터 체크됨
		await expectTL(queryTL.radio("전체 5")).toBeChecked();
		await expectTL(queryTL.list("SaaS 목록")).toBeVisible();

		// given 최근 결제일 순으로 정렬됨
		await expectTL(queryTL.listitem("")).toHaveTextContents([
			"Notion2024년 6월 27일 결제",
			"Asana2024년 6월 20일 결제",
			"GitHub2024년 6월 15일 결제",
			"Slack",
			"Zoom",
		]);

		// when 결제 내역 있는 SaaS 라디오를 클릭하면
		await queryTL.radio("결제 내역 있는 SaaS 3").click();

		// then 결제 내역 있는 SaaS만 필터됨
		await expectTL(queryTL.listitem("")).toHaveTextContents([
			"Notion2024년 6월 27일 결제",
			"Asana2024년 6월 20일 결제",
			"GitHub2024년 6월 15일 결제",
		]);
	});
});
