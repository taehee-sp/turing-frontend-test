import { SaasList } from "./SaasList";

const testSaasList: {
	id: string;
	logoUrl?: string;
	name: string;
	lastPaidAt?: Date;
}[] = [
	{
		id: "ef4cdc19-a393-478f-8caf-9d1ab7f7a82e",
		name: "Notion",
		logoUrl: "https://assets-dev.smply.app/saas-logos/9-IepQ3Rrt.png",
		lastPaidAt: new Date("2024-06-27"),
	},
	{
		id: "c54e160e-feb2-4545-b0a4-a2ed7f70e6d2",
		name: "Slack",
		logoUrl: "https://assets-dev.smply.app/saas-logos/2-abcQ3Rrt.png",
		// lastPaidAt is intentionally left out
	},
	{
		id: "a983512a-4daf-45b0-892d-d7e8399d982b",
		name: "GitHub",
		// logoUrl is intentionally left out
		lastPaidAt: new Date("2024-06-15"),
	},
	{
		id: "469413ca-1c22-480a-8adc-7f6b00d17324",
		name: "Zoom",
		// logoUrl and lastPaidAt are intentionally left out
	},
	{
		id: "80641d76-5a6a-42d0-84a0-495d7287ae27",
		name: "Asana",
		logoUrl: "https://assets-dev.smply.app/saas-logos/5-defQ3Rrt.png",
		lastPaidAt: new Date("2024-06-20"),
	},
];

export default {
	"Saas가 여럿 있음": <SaasList saasList={testSaasList} />,
};
