type FormEvent = React.FormEvent<HTMLFormElement>;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type SearchFormProps = {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({
	searchText,
	setSearchText,
}: SearchFormProps) {
	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	const handleInputChange = (e: InputChangeEvent) => {
		setSearchText(e.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit} action="#" className="search">
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={searchText}
				onChange={handleInputChange}
				spellCheck="false"
				type="text"
				required
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
