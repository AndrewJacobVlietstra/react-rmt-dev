import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIDContextProvider from "./contexts/ActiveIDContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BookmarksContextProvider>
				<ActiveIDContextProvider>
					<App />
				</ActiveIDContextProvider>
			</BookmarksContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
