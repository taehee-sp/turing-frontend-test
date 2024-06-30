import type { Metadata } from "next";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
	title: "튜링의 사과 프론트엔드 테스트 강의",
	description:
		"튜링의 사과에서 강의했던 프론트엔드 컴포넌트 테스트 강의 실습 예제",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<link
					href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
					rel="stylesheet"
				/>
			</head>
			<body>
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}
