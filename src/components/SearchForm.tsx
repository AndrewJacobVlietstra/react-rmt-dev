import { useSearchTextContext } from "../lib/hooks";

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function SearchForm() {
	const { searchText, setSearchText } = useSearchTextContext();

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	const handleChangeSearchText = (e: InputChangeEvent) => {
		setSearchText(e.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit} action="#" className="search">
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={searchText}
				onChange={handleChangeSearchText}
				spellCheck="false"
				type="text"
				required
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
