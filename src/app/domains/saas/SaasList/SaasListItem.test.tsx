import { render } from "@testing-library/react";
import SaasListItemStories from "./SaasListItem.fixture";
import { describe, test } from "vitest";
import { expectTL } from "../../../../siheom/expectTL";
import { queryTL } from "../../../../siheom/queryTL";

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
});
