import {
	getAllTracks,
	getPopularTrackTags,
	getTrackContent,
} from "../../../lib/tracks";
import { generatePrompt, generateImages } from "../../../lib/openai";
import utilStyles from "../../../styles/utils.module.scss";
import styles from "../../../styles/Track.module.scss";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import NavItem from "../../../components/navItem";
import Logo from "../../../components/logo";
import Form from "../../../components/form";
import AudioPlayer from "../../../components/audioPlayer";
import { RotatingTriangles } from "react-loader-spinner";
import { useState, useEffect } from "react";

export async function getStaticPaths() {
	const paths = await getAllTracks();
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const { artist, track } = params;

	// Some tracks may not have a "content" prop, in which case content will be undefined.
	let content = await getTrackContent(artist, track);
	if (!content) {
		content = "";
	}
	const tags = await getPopularTrackTags(artist, track);
	console.log("Popular tags: " + tags.join(", "));

	// const DallE_prompt = await generatePrompt(tags, 4);

	// console.log("DallE prompt: ", DallE_prompt);

	// const DallE_images = await generateImages(DallE_prompt);

	return {
		props: {
			artist,
			track,
			tags,
			content,
			// DallE_prompt,
			// DallE_images,
		},
	};
}

export default function Track({
	artist,
	track,
	tags,
	content,
	// DallE_prompt,
	// DallE_images,
}) {
	const siteTitle = `${track} by ${artist}`;
	const [leftPanelMode, setLeftPanelMode] = useState(false);
	const [rightPanelMode, setRightPanelMode] = useState(false);
	const [images, setImages] = useState([]);
	const [prompt, setPrompt] = useState("");

	async function fetchData() {
		console.log("hello");
		setImages(null);

		// const tags = await getPopularTrackTags(artist, track);
		const DallE_prompt = await generatePrompt(tags, 4);
		setPrompt(DallE_prompt);

		const DallE_images = await generateImages(DallE_prompt);
		setImages(DallE_images);
	}

	useEffect(() => {
		// TODO: Define the window.onSpotifyIframeApiReady function
		//   https://developer.spotify.com/documentation/embeds/guides/using-the-iframe-api/
		if (tags) {
			fetchData();
		}
	}, [tags]);

	return (
		<>
			<Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" />
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
						<div className={styles.imgSectTitle}>
							Here's what the track may look like, with the prompt: {prompt}
						</div>
						{images ? (
							<section className={styles.imageSection}>
								<div className={styles.gallery}>
									{images.map((image, index) => {
										console.log(image.url);
										return (
											<div className={styles.imageContainer} key={index}>
												<Image
													priority
													src={image.url}
													// src="/images/account.jpg"
													alt={prompt}
													layout="fill"
													className={styles.dallEImage}
												/>
											</div>
										);
									})}
								</div>
							</section>
						) : (
							<div className={styles.spinnerContainer}>
								<RotatingTriangles
									visible={true}
									height="80"
									width="80"
									ariaLabel="rotating-triangels-loading"
									wrapperStyle={{}}
									wrapperClass="rotating-triangels-wrapper"
								/>
							</div>
						)}
						{/* ------------------------- SLIDESHOW --------------------------- */}
						<section className={styles.slideshowSection}></section>
						{/* --------------------- STICKY AUDIO PLAYER --------------------- */}
						<section className={styles.playerSection}>
							<AudioPlayer />
							<div id="embed-iframe"></div>
						</section>
					</div>
					{rightPanelMode && <section className={styles.rightPanel}></section>}
				</main>
			</div>
		</>
	);
}
