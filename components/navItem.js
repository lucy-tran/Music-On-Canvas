import styles from "./navItem.module.scss";

export default function NavItem({ page, children }) {
	return (
		<a className={styles.item} href={`./${page.toLowerCase()}`}>
			{children}
		</a>
	);
}
