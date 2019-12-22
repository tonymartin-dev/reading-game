import React, { useEffect } from 'react';
import './confetti.scss'

function Confetti() {

	function confetti() {
		let focusesAmount = 3;
		const colors = ['red', 'yellow', 'blue', 'green', 'white'];
		let parentElement = document.getElementById('confetti');

		if (!parentElement) return;

		var elements = document.getElementsByClassName('focus');
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}

		for (let i = 1; i <= focusesAmount; i++) {
			let focusWidth = (window.innerWidth / (focusesAmount + 1)) * i;
			let focus = document.createElement('div');
			focus.setAttribute('id', 'focus' + i);
			focus.className = 'focus';
			focus.style = `left: ${focusWidth}px`;
			for (let index = 0; index < 15; index++) {
				let particleElement = document.createElement('div');
				particleElement.className = 'particle ' + colors[getRandomInt(4)];
				focus.appendChild(particleElement);
			}
			parentElement.appendChild(focus);
		}
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	useEffect(()=>confetti())

	return (
		<div id="confetti"></div>
	)
}

export default Confetti
