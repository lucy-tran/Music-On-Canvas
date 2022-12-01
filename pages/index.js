import styles from "../styles/Home.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Image from "next/image";
import Head from "next/head";
import Logo from "../components/logo";
import NavItem from "../components/navItem";
import Form from "../components/form";

export const siteTitle = "Music On Canvas";

export default function Home() {
	function randomize() {}

	return (
		<div className={utilStyles.layout}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<header className={utilStyles.header}>
				<div>
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
			<div className={styles.logoContainer}>
				<Logo home />
			</div>
			<section className={styles.main}>
				<Form home optionAction={randomize} />
			</section>
		</div>
	);
}
