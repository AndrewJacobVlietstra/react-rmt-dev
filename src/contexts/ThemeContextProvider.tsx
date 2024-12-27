import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";
import { Theme } from "../lib/types";

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

type ThemeContext = {
	theme: Theme;
	handleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
	children,
}: ThemeContextProviderProps) {
	const [theme, setTheme] = useLocalStorage<Theme>("rmt-dev-theme", "light");
	const handleTheme = () => {
		if (theme === "light") {
			document.body.setAttribute("data-theme", "dark");
			return setTheme("dark");
		}
		document.body.setAttribute("data-theme", "light");
		return setTheme("light");
	};

	return (
		<ThemeContext.Provider value={{ theme, handleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
