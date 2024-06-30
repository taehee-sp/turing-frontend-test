import { Link } from "@/app/routing/Link";
import { hstack } from "@styled-system/patterns";

const SAAS_DEFAULT_IMAGE_URL = "";

function formatDate년월일(date: Date): string {
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export const SaasListItem = ({
	saas,
}: {
	saas: {
		id: string;
		name: string;
		logoUrl: string | null;
		lastPaidAt: Date | null;
	};
}) => {
	const lastPaidAt = saas.lastPaidAt;
	return (
		<li>
			<Link className={hstack()} href={`/saas/${saas.id}`}>
				<img
					src={saas.logoUrl ?? SAAS_DEFAULT_IMAGE_URL}
					alt=""
					role="presentation"
				/>
				<h3>{saas.name}</h3>
				{lastPaidAt && <p>{formatDate년월일(lastPaidAt)} 결제</p>}
			</Link>
		</li>
	);
};
