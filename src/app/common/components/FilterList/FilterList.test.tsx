import { render } from "@testing-library/react";
import FilterListStories from "./FilterList.fixture";
import { describe, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";

describe("SaasList", () => {
	test("결제 내역 있는 SaaS만 필터할 수 있다", async () => {
		render(FilterListStories["여러 개의 필터"]);

		await expectTL(queryTL.radio("전체")).toBeChecked();

		await queryTL.radio("결제 내역 있는 SaaS").click();

		await expectTL(queryTL.radio("결제 내역 있는 SaaS")).toBeChecked();
	});
});
