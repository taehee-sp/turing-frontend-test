import NextLink from "next/link";
import type { PropsWithChildren } from "react";

export const Link = ({
	href,
	children,
}: PropsWithChildren<{ href: string }>) => {
	return <NextLink href={href}>{children}</NextLink>;
};
