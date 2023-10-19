/**
 * Code Source: https://stackoverflow.com/a/2450976
 * @param {Array} array Array to shuffle
 * @returns Shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

console.log("Hello, world!");

let xhr = new XMLHttpRequest();
xhr.open('GET', '/NMED3720-Headliners/js/articles.json', true);
xhr.send(null);
xhr.onload = function() {
	if (xhr.status === 200) {
		console.log("We got something!");
		const archive = shuffle(JSON.parse(xhr.response));
		const elements = document.querySelectorAll('*[id]');

		for (const article of elements) {
			if (article.classList.contains("thumbnail")) {
				let thumbnail = article.getElementsByTagName("img")[0];
				thumbnail.src = archive[0].image;
				thumbnail.alt = archive[0].title;
				// console.log(thumbnail);
			}
			let headline = article.getElementsByTagName("a")[0];
			headline.href = archive[0].url;
			headline.innerText = archive[0].title;

			// console.log(headline);
			// console.log(article);
			archive.shift();
		}
	} else {
		console.log("Unable to read data file!");
	}
}