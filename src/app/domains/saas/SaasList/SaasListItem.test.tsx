import { render } from "@testing-library/react";
import SaasListItemStories, {
	로고_결제내역_있는_SaaS,
} from "./SaasListItem.fixture";
import { describe, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";

describe("SaasListItem", () => {
	test("이름만 있는 SaaS", async () => {
		render(SaasListItemStories["이름만 있는 SaaS"]);

		await expectTL(queryTL.heading("Zoom")).toBeVisible();
		await expectTL(queryTL.text("결제")).not.toBeVisible();
	});

	test("로고 결제내역 있는 SaaS", async () => {
		render(SaasListItemStories["로고 결제내역 있는 SaaS"]);

		await expectTL(queryTL.heading("Notion")).toBeVisible();
		await expectTL(queryTL.text("2024년 6월 27일 결제")).toBeVisible();
	});

	test("항목은 해당 SaaS의 상세 페이지로 가능 링크다", async () => {
		render(SaasListItemStories["로고 결제내역 있는 SaaS"]);

		await expectTL(queryTL.link("Notion")).toHaveAttribute(
			"href",
			`/saas/${로고_결제내역_있는_SaaS.id}`,
		);
	});
});
