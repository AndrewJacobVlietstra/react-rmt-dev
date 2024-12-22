import { createContext } from "react";
import { useGetActiveID } from "../lib/hooks";

type ActiveIDContextProviderProps = {
	children: React.ReactNode;
};

type ActiveIDContext = {
	activeID: number | null;
};

export const ActiveIDContext = createContext<ActiveIDContext | null>(null);

export default function ActiveIDContextProvider({
	children,
}: ActiveIDContextProviderProps) {
	const activeID = useGetActiveID();

	return (
		<ActiveIDContext.Provider value={{ activeID }}>
			{children}
		</ActiveIDContext.Provider>
	);
}
