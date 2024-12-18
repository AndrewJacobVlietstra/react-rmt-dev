type SortingButtonProps = {
	onClick: () => void;
	children: React.ReactNode;
	isActive: boolean;
};

export default function SortingButton({
	onClick,
	children,
	isActive,
}: SortingButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`sorting__button sorting__button--relevant ${
				isActive ? "sorting__button--active" : ""
			}`}
		>
			{children}
		</button>
	);
}
