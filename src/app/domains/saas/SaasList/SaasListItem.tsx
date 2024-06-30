import { Link } from "@/app/routing/Link";
import { css, cx } from "@styled-system/css";
import { box, hstack, square } from "@styled-system/patterns";

const SAAS_DEFAULT_IMAGE_URL =
	"https://dev.smply.app/img/icon-logos/placeholder.png";

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
			<Link
				className={cx(
					hstack(),
					css({
						border: "1px solid transparent",
						borderRadius: "12px",
						padding: "16px",
						transition:
							"border-color .125s ease-in-out, background .125s ease-in-out",
						_currentPage: {
							borderColor: "#4e5867",
						},
					}),
				)}
				href={`/saas/${saas.id}`}
			>
				<img
					className={square({ size: "24px" })}
					src={saas.logoUrl ?? SAAS_DEFAULT_IMAGE_URL}
					alt=""
					role="presentation"
				/>
				<h3>{saas.name}</h3>
				{lastPaidAt && (
					<p
						className={css({
							fontSize: "13px",
							color: "#4e5867",
						})}
					>
						{formatDate년월일(lastPaidAt)} 결제
					</p>
				)}
			</Link>
		</li>
	);
};
