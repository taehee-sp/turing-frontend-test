"use client";
import { VStack } from "@styled-system/jsx";
import { SaasListItem } from "./SaasListItem";
import { useState } from "react";

export const SaasList = ({
	saasList,
}: {
	saasList: {
		id: string;
		name: string;
		logoUrl: string | null;
		lastPaidAt: Date | null;
	}[];
}) => {
	const [selected, setSelected] = useState("all");

	return (
		<VStack>
			<fieldset>
				<legend> 필터 </legend>
				<label>
					전체 {saasList.length}
					<input
						type="radio"
						value="all"
						checked={selected === "all"}
						onChange={() => {
							setSelected("all");
						}}
					/>
				</label>
			</fieldset>

			<ul aria-label="SaaS 목록">
				{saasList
					.sort(
						(a, b) =>
							(b.lastPaidAt?.valueOf() ?? 0) - (a.lastPaidAt?.valueOf() ?? 0),
					)
					.map((saas) => (
						<SaasListItem key={saas.id} saas={saas} />
					))}
			</ul>
		</VStack>
	);
};
