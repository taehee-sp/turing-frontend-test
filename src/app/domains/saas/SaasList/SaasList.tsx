export const SaasList = ({
	saasList,
}: {
	saasList: { id: string; name: string; logoUrl?: string; lastPaidAt?: Date }[];
}) => {
	return <ul aria-label="SaaS 목록">empty</ul>;
};
