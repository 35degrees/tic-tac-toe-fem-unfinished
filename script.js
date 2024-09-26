const playerCountIntro = document.querySelector('.player-count')
const playerFirst = document.querySelector('.player-cpu-first')
const playerCountButtons = document.querySelectorAll('.player-count-buttons')
const playerCpuButtons = document.querySelectorAll('.player-cpu-buttons')
const message = document.querySelector('.msg')
const tiles = document.querySelectorAll('.tile')
const tile1 = document.querySelector('.tile-1')
const tile2 = document.querySelector('.tile-2')
const tile3 = document.querySelector('.tile-3')
const tile4 = document.querySelector('.tile-4')
const tile5 = document.querySelector('.tile-5')
const tile6 = document.querySelector('.tile-6')
const tile7 = document.querySelector('.tile-7')
const tile8 = document.querySelector('.tile-8')
const tile9 = document.querySelector('.tile-9')
let win1
let win2
let win3
let win4
let win5
let win6
let win7
let win8
let win9

let onePlayer = false
let twoPlayer = false
let playerStart = false
let cpuStart = false
let p1symbol
let p2symbol = 'O'
let cpuSymbol

const masterArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let tallies = []

function scoreCheck() {
	win1 = masterArray.slice(0, 3)
	win2 = masterArray.slice(3, 6)
	win3 = masterArray.slice(6, 9)
	win4 = [masterArray[0], masterArray[3], masterArray[6]]
	win5 = [masterArray[1], masterArray[4], masterArray[7]]
	win6 = [masterArray[2], masterArray[5], masterArray[8]]
	win7 = [masterArray[0], masterArray[4], masterArray[8]]
	win8 = [masterArray[2], masterArray[4], masterArray[6]]
	let masterScore = [win1, win2, win3, win4, win5, win6, win7, win8]
	masterScore.map((score) => {
		const sums = score.reduce((a, b) => {
			return a + b
		}, 0)
		tallies.push(sums)
	})
}

function playerCount() {
	playerCountIntro.style.display = 'flex'
	setTimeout(() => {
		playerCountIntro.style.opacity = 1
	}, 800)
	playerCountButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const playerCount = +e.target.innerText
			if (playerCount === 1) {
				onePlayer = true
				checkFirst()
			} else if (playerCount === 2) {
				twoPlayer = true
				const msg = 'Good luck, players!'
				startGame(msg)
			}
		})
	})
}

function checkFirst() {
	playerCountIntro.style.pointerEvents = 'none'
	playerFirst.style.display = 'flex'
	playerCountIntro.style.opacity = 0
	setTimeout(() => {
		playerFirst.style.opacity = '1'
		playerCountIntro.style.display = 'none'
	}, 900)
	playerCpuButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const who = e.target.innerText
			if (who === 'YES') {
				playerStart = true
				cpuStart = false
				const msg = 'Good luck, player one!'
				startGame(msg)
			} else if (who === 'NO') {
				cpuStart = true
				playerStart = false
				const msg = 'Good luck, player two!'
				startGame(msg)
			}
		})
	})
}

function startGame(msg) {
	message.style.display = 'flex'
	console.log({ playerStart })
	console.log({ cpuStart })
	playerCountIntro.style.pointerEvents = 'none'
	playerCountIntro.style.opacity = 0
	playerFirst.style.opacity = 0
	setTimeout(() => {
		playerCountIntro.style.display = 'none'
		playerFirst.style.display = 'none'
		message.style.opacity = 1
		message.textContent = msg
		if ((onePlayer && playerStart) || twoPlayer) {
			p1symbol = 'X'
			p2symbol = 'O'
			cpuSymbol = 'O'
			playerOneTurn()
		} else if (onePlayer && cpuStart) {
			cpuSymbol = 'X'
			cpuTurn()
		}
	}, 900)
	setTimeout(() => {
		message.style.opacity = 0
	}, 2500)
	setTimeout(() => {
		message.style.display = 'none'
	}, 3200)
}

function playerOneTurn() {
	lockTiles()
	tallies = []
	console.log('player ones turn')
	scoreCheck()
	console.log(tallies)
}

function playerTwoTurn() {
	lockTiles()
	tallies = []
	scoreCheck()
	console.log('t', ...tallies)
	console.log('player 2 turn')

	tiles.forEach((tile) => {
		if (tile.innerText === '') {
			tile.addEventListener('click', (e) => {
				const thisTile = e.target
				const tileNum = +e.target.classList[1].charAt(5)
				console.log({ tileNum })
				masterArray.splice(tileNum - 1, 1, 1)
				thisTile.innerText = p2symbol
				thisTile.style.color = 'var(--medium-grey)'
				console.log({ thisTile })
				// cpuTurn()
				let tallies = []
				twoPlayer ? playerOneTurn() : cpuTurn()
			})
		}
	})
}

function cpuTurn() {
	lockTiles()
	tallies = []
	scoreCheck()
	console.log('talito', ...tallies)
	if (tallies.includes(-2)) {
		cpuWins()
	} else if (tallies.includes(2)) {
		cpuBlocks()
	} else {
		cpuNext()
	}
}

function cpuWins() {
	tiles.forEach((tile) => (tile.style.pointerEvents = 'none'))
	message.style.display = 'flex'
	message.style.opacity = 1
	message.innerText = 'The computer wins!'
	const winIndex = tallies.indexOf(-2)
	switch (winIndex) {
		case 0:
			tile1.innerText = cpuSymbol
			tile2.innerText = cpuSymbol
			tile3.innerText = cpuSymbol
			tile1.style.color = 'var(--charcoal-grey)'
			tile2.style.color = 'var(--charcoal-grey)'
			tile3.style.color = 'var(--charcoal-grey)'
			tile1.style.backgroundColor = 'var(--light-orange)'
			tile2.style.backgroundColor = 'var(--light-orange)'
			tile3.style.backgroundColor = 'var(--light-orange)'

			break
		case 1:
			tile4.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile6.innerText = cpuSymbol
			tile4.style.color = 'var(--charcoal-grey)'
			tile5.style.color = 'var(--charcoal-grey)'
			tile6.style.color = 'var(--charcoal-grey)'
			tile4.style.backgroundColor = 'var(--light-orange)'
			tile5.style.backgroundColor = 'var(--light-orange)'
			tile6.style.backgroundColor = 'var(--light-orange)'
			break
		case 2:
			tile7.innerText = cpuSymbol
			tile8.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			tile7.style.color = 'var(--charcoal-grey)'
			tile8.style.color = 'var(--charcoal-grey)'
			tile9.style.color = 'var(--charcoal-grey)'
			tile7.style.backgroundColor = 'var(--light-orange)'
			tile8.style.backgroundColor = 'var(--light-orange)'
			tile9.style.backgroundColor = 'var(--light-orange)'
			break
		case 3:
			tile1.innerText = cpuSymbol
			tile4.innerText = cpuSymbol
			tile7.innerText = cpuSymbol
			tile1.style.color = 'var(--charcoal-grey)'
			tile4.style.color = 'var(--charcoal-grey)'
			tile7.style.color = 'var(--charcoal-grey)'
			tile1.style.backgroundColor = 'var(--light-orange)'
			tile4.style.backgroundColor = 'var(--light-orange)'
			tile7.style.backgroundColor = 'var(--light-orange)'
			break
		case 4:
			tile2.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile8.innerText = cpuSymbol
			tile2.style.color = 'var(--charcoal-grey)'
			tile5.style.color = 'var(--charcoal-grey)'
			tile8.style.color = 'var(--charcoal-grey)'
			tile2.style.backgroundColor = 'var(--light-orange)'
			tile5.style.backgroundColor = 'var(--light-orange)'
			tile8.style.backgroundColor = 'var(--light-orange)'
			break
		case 5:
			tile3.innerText = cpuSymbol
			tile6.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			tile3.style.color = 'var(--charcoal-grey)'
			tile6.style.color = 'var(--charcoal-grey)'
			tile9.style.color = 'var(--charcoal-grey)'
			tile3.style.backgroundColor = 'var(--light-orange)'
			tile6.style.backgroundColor = 'var(--light-orange)'
			tile9.style.backgroundColor = 'var(--light-orange)'
			break
		case 6:
			tile1.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			tile1.style.color = 'var(--charcoal-grey)'
			tile5.style.color = 'var(--charcoal-grey)'
			tile9.style.color = 'var(--charcoal-grey)'
			tile1.style.backgroundColor = 'var(--light-orange)'
			tile5.style.backgroundColor = 'var(--light-orange)'
			tile9.style.backgroundColor = 'var(--light-orange)'
			break
		case 7:
			tile3.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile7.innerText = cpuSymbol
			tile3.style.color = 'var(--charcoal-grey)'
			tile5.style.color = 'var(--charcoal-grey)'
			tile7.style.color = 'var(--charcoal-grey)'
			tile3.style.backgroundColor = 'var(--light-orange)'
			tile5.style.backgroundColor = 'var(--light-orange)'
			tile7.style.backgroundColor = 'var(--light-orange)'
			break
	}
}

function cpuBlocks() {
	const blockIndex = tallies.indexOf(2)
	console.log({ blockIndex })
	switch (blockIndex) {
		case 0:
			tile1.innerText = cpuSymbol
			tile2.innerText = cpuSymbol
			tile3.innerText = cpuSymbol
			masterArray.splice(0, 1, -1)
			masterArray.splice(1, 1, -1)
			masterArray.splice(2, 1, -1)
			break
		case 1:
			tile4.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile6.innerText = cpuSymbol
			masterArray.splice(3, 1, -1)
			masterArray.splice(4, 1, -1)
			masterArray.splice(5, 1, -1)
			break
		case 2:
			tile7.innerText = cpuSymbol
			tile8.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			masterArray.splice(6, 1, -1)
			masterArray.splice(7, 1, -1)
			masterArray.splice(8, 1, -1)
			break
		case 3:
			tile1.innerText = cpuSymbol
			tile4.innerText = cpuSymbol
			tile7.innerText = cpuSymbol
			masterArray.splice(0, 1, -1)
			masterArray.splice(3, 1, -1)
			masterArray.splice(6, 1, -1)
			break
		case 4:
			tile2.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile8.innerText = cpuSymbol
			masterArray.splice(1, 1, -1)
			masterArray.splice(4, 1, -1)
			masterArray.splice(7, 1, -1)
			break
		case 5:
			tile3.innerText = cpuSymbol
			tile6.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			masterArray.splice(2, 1, -1)
			masterArray.splice(5, 1, -1)
			masterArray.splice(8, 1, -1)
			break
		case 6:
			tile1.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile9.innerText = cpuSymbol
			masterArray.splice(0, 1, -1)
			masterArray.splice(4, 1, -1)
			masterArray.splice(8, 1, -1)
			break
		case 7:
			tile3.innerText = cpuSymbol
			tile5.innerText = cpuSymbol
			tile7.innerText = cpuSymbol
			masterArray.splice(2, 1, -1)
			masterArray.splice(4, 1, -1)
			masterArray.splice(6, 1, -1)
			break
	}
	cpuStart ? playerTwoTurn() : playerOneTurn()
}

function cpuNext() {
	console.log('at cpu next')
	const blankIndexes = []
	masterArray.filter((item, i) => {
		if (item === 0) {
			blankIndexes.push(i)
		}
	})
	scoreCheck()
	console.log('masterArr', ...masterArray)
	const random = Math.floor(Math.random() * blankIndexes.length)
	const randomIndex = blankIndexes[random]
	const tileClass = `tile${randomIndex + 1}`
	console.log({ tileClass })
	tiles[randomIndex].innerText = cpuSymbol
	tiles[randomIndex].style.color = 'var(--medium-orange)'
	masterArray.splice(randomIndex, 1, -1)
	console.log('masterArr', ...masterArray)
	cpuStart ? playerTwoTurn() : playerOneTurn()
}

function lockTiles() {
	tiles.forEach((tile) => {
		console.log('in the tiles forEach')
		if (tile.innerText !== '') {
			tile.style.pointerEvents = 'none'
		} else {
			tile.style.pointerEvents = 'all'
		}
	})
}

function gameEnd() {
	console.log('the game is now over :(')
}
window.addEventListener('DOMContentLoaded', playerCount)
