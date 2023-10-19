const fetchPlugin = require("@11ty/eleventy-fetch");
const { elementCount } = require("../projectConfig");
require('dotenv').config();

const fetchParams = {
	duration: "90m",
	type: "json"
};

function chance(num) {
	return Math.floor(Math.random() * num);
}
function article(title, img, url, date) {
	this.title = title,
	this.image = img,
	this.url = url,
	this.date = new Date(date);
}

module.exports = async function() {
	let archive = []

	let time = new Date(new Date().toDateString());
	time.setDate(time.getDate() - 7);
	let worldNewsUrl = `https://api.worldnewsapi.com/search-news?api-key=${process.env.WORLD_NEWS_API}&earliest-publish-date=${time.toISOString()}&number=${elementCount}`;

	const worldNews = await fetchPlugin(worldNewsUrl, fetchParams);
	// console.log(worldNews.news);

	await worldNews.news.forEach(async item => {
		// console.log(item);
		archive.push(new article(item.title, item.image, item.url, item.publish_date));
	})

	const titleSrcs = [
		"https://api.kanye.rest/",
		"https://whatthecommit.com/index.txt",
		"https://corporatebs-generator.sameerkumar.website/"
	]
	const imageSrcs = [
		"https://random.dog/woof.json",
		"https://nekos.best/api/v2/bite",
		"https://nekos.best/api/v2/kick"
	]

	for (const item of [...Array(elementCount * 3).keys()]) {
		let title = await fetch(titleSrcs[chance(titleSrcs.length)])
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			});
		
		try {
			title = Object.values(JSON.parse(title))[0];
		} catch (e) {
			title = title.substring(0, title.length - 1);
		}
		
		let image = await fetch(imageSrcs[chance(titleSrcs.length)])
		.then(response => {
			if (response.ok) {
				return response.json();
			}
		});

		if (Object.keys(image).includes("url")) {
			image = image.url;
		} else {
			image = image.results[0].url;
		}

		let date = new Date().toDateString();

		archive.push(new article(title, image, "#", date));
	}

	// console.log(archive);
	return archive;
};