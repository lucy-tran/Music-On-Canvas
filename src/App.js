import "./App.css";
import { useState } from "react";

function App() {
	const [animalInput, setAnimalInput] = useState("");
	const [result, setResult] = useState();

	async function onSubmit(event) {
		event.preventDefault();
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ animal: animalInput }),
		});
		const data = await response.json();
		setResult(data.result);
		setAnimalInput("");
	}
	return (
		<div className="App">
			<header className="App-header">
				<a className="App-logo" href="./">
					Music On Canvas
				</a>
			</header>
			<main className="main">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="animal"
						placeholder="Enter a prompt"
						value={animalInput}
						onChange={(e) => setAnimalInput(e.target.value)}
					/>
					<input type="submit" value="Generate names" />
				</form>
				<div className="result">{result}</div>
			</main>
		</div>
	);
}

export default App;
