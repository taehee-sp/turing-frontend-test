import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function renderWithContext(element: ReactNode) {
	return render(
		<>
			{element}
			<ToastContainer />
		</>,
	);
}
