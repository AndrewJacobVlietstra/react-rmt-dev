import { useState } from "react";

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function SearchForm() {
	const [searchText, setSearchText] = useState("");

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
