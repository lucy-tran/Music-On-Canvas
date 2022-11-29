import {
	getAllTracks,
	getTrackTags,
	getTrackContent,
} from "../../../lib/tracks";
import utilStyles from "../../../styles/utils.module.scss";
import styles from "../../../styles/Track.module.scss";
import Head from "next/head";
import Image from "next/image";
import NavItem from "../../../components/navItem";
import Logo from "../../../components/logo";
import Form from "../../../components/form";
import { useState } from "react";

export async function getStaticPaths() {
	const paths = await getAllTracks();
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const { artist, track } = params;
	const trackTags = await getTrackTags(artist, track);
	const content = await getTrackContent(artist, track);
	const DallE_prompt = "";
	return {
		props: {
			artist: params.artist,
			track: params.track,
			tags: trackTags,
			content,
			DallE_prompt,
		},
	};
}

export default function Track({ artist, track, tags, content, DallE_prompt }) {
	const siteTitle = `${track} by ${artist}`;
	const [leftPanelMode, setLeftPanelMode] = useState(false);
	const [rightPanelMode, setRightPanelMode] = useState(false);

	return (
		<div className={utilStyles.layout}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			{/* ---------------------------- NAVIGATION BAR ---------------------------- */}
			<header className={utilStyles.header}>
				<div>
					<div className={styles.logoContainer}>
						<Logo />
					</div>
					<NavItem page="about">About</NavItem>
					<NavItem page="exhibition">Exhibition</NavItem>
				</div>
				<div className={utilStyles.accountIcon}>
					<Image
						src="/images/account.jpg"
						layout="fill"
						className={utilStyles.accountImg}
					/>
				</div>
			</header>
			<main className={styles.main}>
				{leftPanelMode && <section className={styles.leftPanel}></section>}
				<div>
					{/* ---------------------------- FORM ---------------------------- */}
					<section>
						<Form
							defaultValue={siteTitle}
							optionAction={() => setLeftPanelMode(true)}
						/>
					</section>
					{/* -------------------- DALL-E IMAGE RESULTS -------------------- */}
					<section></section>
					{/* ------------------------- SLIDESHOW --------------------------- */}
					<section></section>
					{/* --------------------- STICKY AUDIO PLAYER --------------------- */}
					<section></section>
				</div>
				{rightPanelMode && <section></section>}
			</main>
		</div>
	);
}
