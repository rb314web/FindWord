import { useState, useEffect } from 'react';
import data from './data.js';
import endGame from './end.js';
import './style.css';

const Game = () => {
	useEffect(() => {
		drawWord();
	}, []);

	useEffect(() => {
		const Timer = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(Timer);
	}, []);

	const [input, setInput] = useState('');
	const [drawnWord, setDrawnWord] = useState('');
	const [createdBoxses, setCreatedBoxses] = useState('');
	const [timer, setTimer] = useState(5);
	const [points, setPoints] = useState([]);
	const [buttonState, setButtonState] = useState(true);

	useEffect(() => {
		createbox();
	}, [drawnWord]);

	const drawWord = () => {
		const dataWithoutGuessed = data.map((i) => {
			return {
				category: i.category,
				word: i.word.filter((x) => !points.some((e) => e == x.toUpperCase())),
			};
		});

		const test3 = dataWithoutGuessed.filter((e) => !(e.word.length <= 0));

		const drawRandom = (data) => {
			const randomIndex = Math.floor(Math.random() * data.length);

			const obj = data[randomIndex];

			const randomIndex1 = Math.floor(Math.random() * obj.word.length);

			const item = obj.word[randomIndex1].toUpperCase();

			setDrawnWord([obj.category, item]);
		};

		if (test3.length <= 0) {
			document.querySelector('.letterbox').textContent = 'Koniec gry';
			document.querySelector('.letterbox').style.fontSize = '30px';
		} else {
			drawRandom(test3);
		}
	};

	const checkLetter = () => {
		let r = 0

		createdBoxses.forEach((i) => {
			if (i.props.children.props.children === input) {
				document
					.querySelector(`.square:nth-child(${Number(i.key) + 1})`)
					.setAttribute('visible', 'visible');
					r = r+ 1
			}
		});
		if (r === 0) {
			document.querySelector('input').style.boxShadow = '0px 0px 16px 0px red'
			setTimeout( () => {
				document.querySelector('input').style.boxShadow = '0px 5px 10px 0px rgba(0, 0, 0, 0.5)'
			}, 1000) 
		}		else {
			document.querySelector('input').style.boxShadow = '0px 0px 16px 0px green'
			setTimeout( () => {
				document.querySelector('input').style.boxShadow = '0px 5px 10px 0px rgba(0, 0, 0, 0.5)'
			}, 1000) 
		}
		
		
		
		setInput('');
		checkWin();
	};

	const checkWin = () => {
		const boxLetter = document.querySelectorAll('.square');
		const input = document.querySelector('input');

		let x = 0;

		[...boxLetter].forEach((i) => {
			if (i.getAttribute('visible', 'visible') === 'visible') {
				x++;
			}
		});

		if (x === boxLetter.length && !points.includes(drawnWord[1])) {
			setPoints((prev) => [...prev, drawnWord[1]]);

			document.querySelectorAll('.square').forEach( (item) => {
				item.style.boxShadow = '0px 0px 16px 0px rgba(22, 255, 0, 1)'
				setButtonState(false)
			})
		}
		input.focus();
	};

	const hiddenbox = () => {
		let visibleLetter = Math.floor(drawnWord && drawnWord[1].length / 3);

		
		document.querySelectorAll('.square').forEach((i) => {
			const dsfd = Math.floor(Math.random() * drawnWord[1].length) 
				if (visibleLetter >= 0) {
					console.log(document.querySelectorAll('.square')[dsfd]);

					console.log(dsfd);

					console.log(drawnWord[1].length);


					document
						.querySelectorAll('.square')
						[dsfd].setAttribute(
							'visible',
							'visible'
						);
					visibleLetter--;
				}
				visibleLetter--;
			});
	};

	useEffect(() => {
		hiddenbox()
	}, [createdBoxses])

	const createbox = () => {
		let word = drawnWord && drawnWord[1].split(/(?:)/u);

		const createboxes =
			word &&
			word.map((item, index) => (
				<div visible={'hidden'} key={index} className='square'>
					<span>{item}</span>
				</div>
			));

		setCreatedBoxses(createboxes);
	};

	const time = () => {
		const minutes = Math.floor(timer / 60);
		const second = timer - Math.floor(timer / 60) * 60;

		let time = `${minutes < 10 ? '0' + minutes : minutes}:${
			second < 10 ? '0' + second : second
		}`
		return timer > 0 ? time : '00:00' 
	};

	const nextWord = () => {
		const input = document.querySelector('input');

		document.querySelectorAll('.square').forEach((i) => {
			i.setAttribute('visible', 'hidden');
		});
		drawWord();

		document.querySelectorAll('.square').forEach( (item) => {
			item.style.boxShadow = 'none'
		})
		input.focus();
		setButtonState(true)
		console.log(buttonState);
	};

	const resetGame = () => {
		setTimer(120)
		setPoints([])
		nextWord()
	}

	return (
		<>
			<h1>Kategoria: {drawnWord[0]} </h1>
			<div className='letterbox'>{createdBoxses}</div>
			<div className='wrapper'>
				<input
					onChange={(e) => setInput( () => e.target.value.length < 2 ? e.target.value.toLocaleUpperCase() : input )}
					maxLength={11}
					value={input}></input>
			{buttonState ? <button onClick={checkLetter}>Sprawdź!</button> : <button onClick={nextWord}>Następne</button>}
			</div>
			<div className='points'>{points.length} pkt</div>
			<div className='timer'>{time() === '00:00' ? endGame(points, resetGame) : time() }</div>
			
		</>
	);
};

export default Game;