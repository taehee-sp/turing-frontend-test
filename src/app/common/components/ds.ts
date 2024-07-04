import { css } from "@styled-system/css/css";

export const button = () =>
	css({
		background: "#4f89fb",
		color: "white",
		width: "100%",
		borderRadius: "8px",
		display: "flex",
		gap: "8px",
		justifyContent: "center",
		padding: "14px 16px",
		fontSize: "17px",
		fontWeight: 600,
		transitionProperty: "background, color",
		transitionDuration: ".125s",
		transitionTimingFunction: "ease-in-out",
		_hover: {
			background: "#1863f6",
		},
	});

export const dialog = () =>
	css({
		background: "white",
		borderRadius: "16px",
		boxShadow: "0 12px 40px -4px rgba(25,30,40,.16)",
		position: "fixed",
		inset: "0.75rem",
		zIndex: 50,
		margin: "auto",
		display: "flex",
		height: "fit-content",
		maxHeight: "calc(100dvh - 2 * 0.75rem)",
		flexDirection: "column",
		gap: "1rem",
		overflow: "auto",
		backgroundColor: "white",
		padding: "1rem",
		color: "black",
		maxWidth: "420px",
	});
