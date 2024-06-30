import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export default ({ children }: PropsWithChildren) => (
	<>
		{children}
		<ToastContainer />
	</>
);
