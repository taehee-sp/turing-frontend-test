import { render, screen } from "@testing-library/react";
import SelectWithComboboxStories from "./SelectWithCombobox.fixture";
import { describe, expect, test } from "vitest";
import { expectTL } from "@/siheom/expectTL";
import { queryTL } from "@/siheom/queryTL";
import { getA11ySnapshot } from "@/siheom/getA11ySnapshot";

describe("SelectWithCombobox", () => {
	test("옵션을 검색하고 선택하고 취소할 수 있다", async () => {
		render(SelectWithComboboxStories["여러 개의 옵션"]);

		await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기");

		await queryTL.combobox("사용자").click();

		await expectTL(queryTL.option("")).toHaveTextContents([
			"탐정토끼",
			"김태희",
			"stelo",
		]);

		await queryTL.combobox("이름을 입력해주세요").fill("ㅌ");

		await expectTL(queryTL.option("")).toHaveTextContents([
			"탐정토끼",
			"김태희",
		]);

		await queryTL.combobox("이름을 입력해주세요").fill("김");

		await expectTL(queryTL.option("")).toHaveTextContents(["김태희"]);

		await queryTL.option("김태희").click();

		await queryTL.button("김태희 해제하기").click();

		expect(
			getA11ySnapshot(
				document.body),
		).toMatchInlineSnapshot(`
			"button: 김태희 해제하기
			dialog: 사용자
			  combobox: 이름을 입력해주세요
			  listbox
			    option: 탐정토끼
			    option: 김태희
			    option: stelo
			presentation
			dialog: 사용자를 해제할까요?
			  heading: 사용자를 해제할까요?
			  button: 확인"
		`);

		await queryTL.dialog("사용자를 해제할까요?").button("확인").click();

		await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기");
	});
});
