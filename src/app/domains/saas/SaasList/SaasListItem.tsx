const SAAS_DEFAULT_IMAGE_URL = "";

export const SaasListItem = ({
	saas,
}: {
	saas: { id: string; name: string; logoUrl?: string; lastPaidAt?: Date };
}) => {
	return (
		<li>
			<img
				src={saas.logoUrl ?? SAAS_DEFAULT_IMAGE_URL}
				alt=""
				role="presentation"
			/>
			<h3>{saas.name}</h3>
			{saas.lastPaidAt && (
				<p>
					{saas.lastPaidAt.getFullYear()}년 {saas.lastPaidAt.getMonth() + 1}월{" "}
					{saas.lastPaidAt.getDate()}일 결제
				</p>
			)}
		</li>
	);
};
