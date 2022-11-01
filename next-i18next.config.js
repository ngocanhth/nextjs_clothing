const path = require("path");
module.exports = {
	i18n: {
		locales: ["vi", "ja", "en", "de", "es", "ar", "he", "zh"],
		defaultLocale: "vi",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
