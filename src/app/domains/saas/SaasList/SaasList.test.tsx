import { render } from "@testing-library/react";
import SaasListStories from "./SaasList.fixture";
import { describe, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";

describe("SaasList", () => {
	test("최근 결제일 순으로 정렬된다", async () => {
		render(SaasListStories["Saas가 여럿 있음"]);

		await expectTL(queryTL.list("SaaS 목록")).toBeVisible();

		// given 전체 SaaS, 최근 결제일 순으로 정렬됨
		await expectTL(queryTL.listitem("")).toHaveTextContents([
			"Notion2024년 6월 27일 결제",
			"Asana2024년 6월 20일 결제",
			"GitHub2024년 6월 15일 결제",
			"Slack",
			"Zoom",
		]);
	});
});
