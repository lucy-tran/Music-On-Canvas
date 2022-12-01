import styles from "./audioPlayer.module.scss";
import { useState } from "react";

export default function AudioPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);

	function goBack(seconds) {}
	function goForward(seconds) {}
	function togglePlay() {}

	return (
		<div>
			<div className={styles.playerButtons}>
				<PlayerButton action={() => goBack(10)} imgSrc="/images/" />
				<PlayerButton action={() => goBack(5)} />
				<PlayerButton action={togglePlay} />
				<PlayerButton action={() => goForward(5)} />
				<PlayerButton action={() => goForward(10)} />
			</div>
			<div className={styles.playBarRow}>
				<div></div>
			</div>
		</div>
	);
}

function PlayerButton({ action, imgSrc, alt }) {
	<button onClick={action} className={styles.button}>
		<img src={imgSrc} alt={alt} className={styles.image} />
	</button>;
}
