const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { elementCount } = require("./projectConfig");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
	eleventyConfig.addWatchTarget("css")
	eleventyConfig.addPassthroughCopy("fonts")
	// eleventyConfig.addPassthroughCopy('js');

	eleventyConfig.addGlobalData("elementCount", elementCount);

	return {
    pathPrefix: "/NMED3720-Headliners/"
  }
};