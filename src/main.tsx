import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIDContextProvider from "./contexts/ActiveIDContextProvider.tsx";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BookmarksContextProvider>
				<ActiveIDContextProvider>
					<SearchTextContextProvider>
						<JobItemsContextProvider>
							<ThemeContextProvider>
								<App />
							</ThemeContextProvider>
						</JobItemsContextProvider>
					</SearchTextContextProvider>
				</ActiveIDContextProvider>
			</BookmarksContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
