const path = require("path");

module.exports = {
	sassOptions: {
		includePaths: [
			path.join(__dirname, "styles"),
			path.join(__dirname, "components"),
		],
		prependData: `@import "~/styles/variables.scss";`,
	},
	images: {
		domains: [
			"via.placeholder.com",
			"oaidalleapiprodscus.blob.core.windows.net",
		],
	},
};
