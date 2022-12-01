import {
	getAllTracks,
	getTrackTags,
	getTrackContent,
} from "../../../lib/tracks";
import { generatePrompt, generateImages } from "../../../lib/openai";
import utilStyles from "../../../styles/utils.module.scss";
import styles from "../../../styles/Track.module.scss";
import Head from "next/head";
import Image from "next/image";
import NavItem from "../../../components/navItem";
import Logo from "../../../components/logo";
import Form from "../../../components/form";
import AudioPlayer from "../../../components/audioPlayer";
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
	const tags = await getTrackTags(artist, track);

	// Some tracks may not have a "content" prop, in which case content will be undefined.
	let content = await getTrackContent(artist, track);
	if (!content) {
		content = "";
	}

	// const DallE_prompt = await generatePrompt(tags);

	const DallE_prompt =
		"Draw an oil painting based on these keywords: " + tags.join(", ");
	console.log(DallE_prompt);

	const DallE_images = await generateImages(DallE_prompt);

	return {
		props: {
			artist,
			track,
			tags,
			content,
			DallE_prompt,
			DallE_images,
		},
	};
}

export default function Track({
	artist,
	track,
	tags,
	content,
	DallE_prompt,
	DallE_images,
}) {
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
				<div className={styles.headerLeft}>
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
						alt="Your profile picture"
						className={utilStyles.accountImg}
					/>
				</div>
			</header>
			<main className={styles.main}>
				{leftPanelMode && <section className={styles.leftPanel}></section>}
				<div className={styles.middlePanel}>
					{/* ---------------------------- FORM ---------------------------- */}
					{artist && track && (
						<section className={styles.formSection}>
							<Form
								defaultValue={siteTitle}
								optionAction={() => setLeftPanelMode(!leftPanelMode)}
							/>
						</section>
					)}
					{/* -------------------- DALL-E IMAGE RESULTS -------------------- */}
					{DallE_images && (
						<section className={styles.imageSection}>
							<div className={styles.imgSectTitle}>
								Here's what the track may look like . . .
							</div>
							<div className={styles.gallery}>
								{DallE_images.map((image, index) => {
									console.log(image.url);
									return (
										<div className={styles.imageContainer} key={index}>
											<Image
												priority
												src={image.url}
												// src="/images/account.jpg"
												alt={DallE_prompt}
												layout="fill"
												className={styles.dallEImage}
											/>
										</div>
									);
								})}
							</div>
						</section>
					)}
					{/* ------------------------- SLIDESHOW --------------------------- */}
					<section className={styles.slideshowSection}></section>
					{/* --------------------- STICKY AUDIO PLAYER --------------------- */}
					<section className={styles.playerSection}></section>
				</div>
				{rightPanelMode && <section className={styles.rightPanel}></section>}
			</main>
		</div>
	);
}
