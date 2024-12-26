import { useThemeContext } from "../lib/hooks";
import { capitalizeString } from "../lib/utility";

export default function ThemeButton() {
	const { theme, handleTheme } = useThemeContext();

	return (
		<button onClick={handleTheme} className="theme__button">
			{capitalizeString(theme)}
		</button>
	);
}
