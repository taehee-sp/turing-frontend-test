import React from "react";
import { VStack } from "../../styled-system/jsx/vstack";
import { css } from "../../styled-system/css/css";
import { SaasList } from "./domains/saas/SaasList/SaasList";
import { testSaasList } from "./domains/saas/SaasList/SaasList.fixture";

async function getSaasList() {
	// fetch라면?
	// fetch("/customer/" + customerId +"/saas")
	//   .then(res => res.json())
	//   .then(body => body.saasList)
	return testSaasList;
}

export default async function Home() {
	// react-query 라면?
	// const saasList = useSuspenseQuery(saasListOption()).data
	const saasList = await getSaasList();

	return (
		<main>
			<VStack gap="12px">
				<h2 className={css({ fontSize: "3rem" })}>turing frontend test</h2>
			</VStack>

			<SaasList saasList={saasList} />
		</main>
	);
}
