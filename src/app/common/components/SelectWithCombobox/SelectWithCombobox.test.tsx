import { render } from "@testing-library/react";
import SelectWithComboboxStories from "./SelectWithCombobox.fixture";
import { describe, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";

describe("SelectWithCombobox", () => {
	test("옵션을 검색하고 선택하고 취소할 수 있다", async () => {
		render(SelectWithComboboxStories["여러 개의 옵션"]);

		await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기")

		await queryTL.combobox("사용자").click();

		await expectTL(queryTL.option("")).toHaveTextContents([
			"탐정토끼",
			"김태희",
			"스텔로",
		]);

		// await queryTL.combobox("이름을 입력해주세요").fill("ㄱ");

		// await expectTL(queryTL.option("")).toHaveTextContents([
		// 	"탐정토끼",
		// 	"김태희",
		// ]);

		await queryTL.combobox("이름을 입력해주세요").fill("김");

		await expectTL(queryTL.option("")).toHaveTextContents(["김태희"]);

		await queryTL.option("김태희").click();

		await queryTL.button("김태희 해제하기").click();
			
		await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기")
	});
});
