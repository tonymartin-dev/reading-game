function shuffle(array) {
	let sorted = [];

	while (array.length) {
		let randomIndex = Math.floor(Math.random() * array.length);
		sorted.push(array[randomIndex]);
		array.splice(randomIndex,1)
	}
	console.log({sorted})
	return sorted;

}

function getRandomInt(_min=0, _max=100){
	return Math.floor(Math.random() * _max) + _min;
}

function removeAccents(_string){
	return _string.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
}

export {
	shuffle,
	getRandomInt,
	removeAccents
};