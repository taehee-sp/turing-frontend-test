import { render, screen } from "@testing-library/react";
import TableFixtures from "./Table.fixture";
import { describe, expect, test } from "vitest";
import { htmlTableToMarkdown } from '@/siheom/getTableMarkdown';

describe("Table", () => {
	test("옵션을 검색하고 선택하고 취소할 수 있다", async () => {
		render(TableFixtures.예시);

        expect(
			htmlTableToMarkdown(
				screen.getByRole("table"),
			),
		).toMatchInlineSnapshot(`
			"|   |         Name |                        Job | Favorite Color |
			| - | ------------ | -------------------------- | -------------- |
			| 1 | Cy Ganderton | Quality Control Specialist |           Blue |
			| 2 | Hart Hagerty | Desktop Support Technician |         Purple |
			| 3 |  Brice Swyre |             Tax Accountant |            Red |
			"
		`);
	});
});
