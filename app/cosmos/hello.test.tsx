import { render, screen } from "@testing-library/react";
import helloStory from "./Hello.fixture";
import { expect, test } from "vitest";

test("render hello", () => {
	render(helloStory);

	expect(
		screen.getByRole("heading", { name: "Hello World!" }),
	).toBeInTheDocument();
});
