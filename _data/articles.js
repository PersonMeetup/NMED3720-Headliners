const fetch = require("@11ty/eleventy-fetch");
require('dotenv').config();

const fetchParams = {
	duration: "90m",
	type: "json"
};

module.exports = async function() {
	let url = `https://api.worldnewsapi.com/search-news?api-key=${process.env.WORLD_NEWS_API}`;

	const worldNews = await fetch(url, fetchParams);
	console.log(worldNews.news);

	return worldNews.news;
};