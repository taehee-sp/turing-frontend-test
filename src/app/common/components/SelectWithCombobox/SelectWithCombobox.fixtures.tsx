import { SelectWithComboboxStory } from "./SelectWithCombobox.stories";

const testMemberList = [
	{ id: "4c96d018-51d7-4ac1-9845-0b47ab68a70e", name: "탐정토끼" },
	{ id: "4006ffc5-96dd-46f6-82ce-da454b457ac8", name: "김태희" },
	{ id: "8d9b5007-b5f9-49be-914e-972814309876", name: "스텔로" },
];

export default {
	"여러 개의 옵션": <SelectWithComboboxStory memberList={testMemberList} />,
};
