"use client";
import { useState } from "react";
import { FilterList } from "./FilterList";

export const FilterListStory = () => {
	const [selected, setSelected] = useState("all");
	return (
		<FilterList
			title="필터"
			optionList={[
				{ value: "all", label: "전체" },
				{ value: "with-payment", label: "결제 내역 있는 SaaS" },
			]}
			selected={selected}
			onChange={setSelected}
		/>
	);
};
