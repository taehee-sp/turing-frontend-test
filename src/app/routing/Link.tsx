import NextLink from "next/link";
import type { PropsWithChildren } from "react";

export const Link = ({
	className,
	href,
	children,
}: PropsWithChildren<{ className?: string; href: string }>) => {
	return (
		<NextLink className={className} href={href}>
			{children}
		</NextLink>
	);
};
