import { useThemeContext } from "../lib/hooks";

type SidebarProps = {
	children: React.ReactNode;
};

type SidebarTopProps = {
	children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
	const { theme } = useThemeContext();

	return (
		<div data-theme={theme} className="sidebar">
			{children}
		</div>
	);
}

export function SidebarTop({ children }: SidebarTopProps) {
	return <div className="sidebar__top">{children}</div>;
}
