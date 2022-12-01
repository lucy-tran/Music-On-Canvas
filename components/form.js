import styles from "./form.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Form({ home, defaultValue, optionAction }) {
	const [trackInput, setTrackInput] = useState(
		defaultValue ? defaultValue : ""
	);
	const [errorMessage, setErrorMessage] = useState();
	const router = useRouter();

	async function onSubmit(event) {
		event.preventDefault();
		let [track, artist] = trackInput.split("by");
		if (!!!track || !!!artist || !!!track.trim() || !!!artist.trim()) {
			// !!! is the same as !. This is just for readability that we are evaluating a truthy/falsy value, not a boolean.
			setErrorMessage(
				"* Incorrect syntax. Please follow the format (without the brackets)."
			);
			return;
		}
		track = track.trim();
		artist = artist.trim();

		let validateResult = await fetch(`/api/${artist}/${track}`);
		validateResult = await validateResult.json();

		if (validateResult.error) {
			setErrorMessage(validateResult.error);
			return;
		}

		router.push({
			pathname: "/results/[artist]/[track]",
			query: {
				artist: validateResult.correctArtist,
				track: validateResult.correctTrack,
			},
		});
	}

	return (
		<div className={styles.wrapper}>
			<div className={`${styles.header} ${!home && styles.alignLeft}`}>
				Enter a [track title] + " by " + [artist]
			</div>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="I'm not the only one by Sam Smith"
					value={trackInput}
					onChange={(e) => {
						setTrackInput(e.target.value);
						setErrorMessage("");
					}}
					className={styles.textInput}
				/>
				<button tabIndex={0} type="submit" className={styles.submitButton}>
					Draw
				</button>
			</form>
			{errorMessage && (
				<div className={styles.errorMessage}>{errorMessage}</div>
			)}
			<div className={`${styles.randomize} ${!home && styles.alignLeft}`}>
				or{" "}
				<a onClick={optionAction}>
					{home ? "randomize a track" : "choose from our suggestions"}
				</a>
			</div>
		</div>
	);
}
