"use client";
import { VStack } from "@styled-system/jsx";
import { SaasListItem } from "./SaasListItem";
import { useState } from "react";
import { FilterList } from "@/app/common/components/FilterList/FilterList";

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

	const saasWithPaymentList = saasList.filter(
		(saas) => saas.lastPaidAt instanceof Date,
	);

	return (
		<VStack>
			<FilterList
				title="필터"
				optionList={[
					{ value: "all", label: `전체 ${saasList.length}` },
					{
						value: "with-payment",
						label: `결제 내역 있는 SaaS ${saasWithPaymentList.length}`,
					},
				]}
				selected={selected}
				onChange={setSelected}
			/>

			<ul aria-label="SaaS 목록">
				{(selected === "all" ? saasList : saasWithPaymentList)
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
