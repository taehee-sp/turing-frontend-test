import { SaasListItem } from "./SaasListItem";

export const 로고_결제내역_있는_SaaS = {
	id: "ef4cdc19-a393-478f-8caf-9d1ab7f7a82e",
	name: "Notion",
	logoUrl: "https://assets-dev.smply.app/saas-logos/9-IepQ3Rrt.png",
	lastPaidAt: new Date("2024-06-27"),
};

export const 결재내역_없는_SaaS = {
	id: "c54e160e-feb2-4545-b0a4-a2ed7f70e6d2",
	name: "Slack",
	logoUrl: "https://assets-dev.smply.app/saas-logos/2-abcQ3Rrt.png",
	lastPaidAt: null,
};

export const 로고_없는_SaaS = {
	id: "a983512a-4daf-45b0-892d-d7e8399d982b",
	name: "GitHub",
	logoUrl: null,
	lastPaidAt: new Date("2024-06-15"),
};

export const 이름만_있는_SaaS = {
	id: "469413ca-1c22-480a-8adc-7f6b00d17324",
	name: "Zoom",
	logoUrl: null,
	lastPaidAt: null,
};

export default {
	"로고 결제내역 있는 SaaS": <SaasListItem saas={로고_결제내역_있는_SaaS} />,
	"결재내역 없는 SaaS": <SaasListItem saas={결재내역_없는_SaaS} />,
	"로고 없는 SaaS": <SaasListItem saas={로고_없는_SaaS} />,
	"이름만 있는 SaaS": <SaasListItem saas={이름만_있는_SaaS} />,
};
