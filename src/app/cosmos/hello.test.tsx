import { render } from "@testing-library/react";
import helloStory from "./Hello.fixture";
import { test } from "vitest";
import { expectTL } from "../../siheom/expectTL";
import { queryTL } from "../../siheom/queryTL";

test("render hello", async () => {
	render(helloStory);

	await expectTL(queryTL.heading("Hello World!")).toBeVisible();
});
