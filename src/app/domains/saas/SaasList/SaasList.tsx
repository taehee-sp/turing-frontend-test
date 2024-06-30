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

	const saasWithPaymentList = saasList.filter(
		(saas) => saas.lastPaidAt instanceof Date,
	);

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

				<label>
					결제 내역 있는 SaaS {saasWithPaymentList.length}
					<input
						type="radio"
						value="with-payment"
						checked={selected === "with-payment"}
						onChange={() => {
							setSelected("with-payment");
						}}
					/>
				</label>
			</fieldset>

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
