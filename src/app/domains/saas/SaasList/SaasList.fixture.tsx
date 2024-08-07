import { SaasList } from "./SaasList";
import {
	결재내역_없는_SaaS,
	로고_결제내역_있는_SaaS,
	로고_없는_SaaS,
	이름만_있는_SaaS,
} from "./SaasListItem.fixture";

export const testSaasList: {
	id: string;
	logoUrl: string | null;
	name: string;
	lastPaidAt: Date | null;
}[] = [
	로고_결제내역_있는_SaaS,
	결재내역_없는_SaaS,
	로고_없는_SaaS,
	이름만_있는_SaaS,
	{
		id: "80641d76-5a6a-42d0-84a0-495d7287ae27",
		name: "Asana",
		logoUrl: "https://asana.com/favicon.ico",
		lastPaidAt: new Date("2024-06-20"),
	},
];

export default {
	"Saas가 없음": <SaasList saasList={[]} />,
	"Saas가 여럿 있음": <SaasList saasList={testSaasList} />,
};
