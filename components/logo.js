import styles from "./logo.module.scss";
import {
	Arima,
	// MuseoModerno,
	// Grenze_Gotisch,
	// Cairo_Play,
	// Nabla,
} from "@next/font/google";
import { useRouter } from "next/router";

const arima = Arima({ subsets: ["latin"] });
// const museoModerno = MuseoModerno({ subsets: ["latin"] });
// const grenze_Gotisch = Grenze_Gotisch({ subsets: ["latin"] });
// const cairo_Play = Cairo_Play({ subsets: ["latin"] });
// const nabla = Nabla({ subsets: ["latin"] });

export default function Logo({ home }) {
	const router = useRouter();
	return (
		<p
			className={`${styles.logo} ${arima.className} ${home && styles.homeLogo}`}
			onClick={() => router.push("/")}
		>
			Music On Canvas
		</p>
	);
}
