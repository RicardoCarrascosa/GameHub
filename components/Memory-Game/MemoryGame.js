import './MemoryGame.css'

const PICTURES = [
  'icons8-bee-top-view-96',
  'icons8-búho-96',
  'icons8-cachorro-96',
  'icons8-caracol-96',
  'icons8-castor-96',
  'icons8-delfín-96',
  'icons8-elefante-96',
  'icons8-erizo-96',
  'icons8-gato-96',
  'icons8-leopardo-96',
  'icons8-mariposa-monarca-96',
  'icons8-oruga-96',
  'icons8-oveja-96',
  'icons8-rhinoceros-96',
  'icons8-serpiente-96',
  'icons8-suricate-luneta-96',
  'icons8-tortuga-96'
]

const cards = []
const size = 4
const nCards = (size * size) / 2
let CardsSolved = 0
let tries = 0
let timerOn = false
let timerStart
let hasFlipped = false
let hasFlipped2 = false
let firstCard, secondCard

export const memoryGame = () => {
  const gameArea = document.querySelector('.gameArea')

  const title = document.createElement('h1')
  const timer = document.createElement('h2')
  const playArea = document.createElement('div')
  const restart = document.createElement('button')
  const triesText = document.createElement('p')

  title.textContent = 'Memory Game'
  timer.id = 'timer'
  timer.textContent = 'This is a timer.. be Ready'
  restart.textContent = 'Restart Game'
  restart.className = 'resetButton'
  restart.addEventListener('click', restartGame)
  playArea.classList = 'memoryArea'
  triesText.id = 'triesText'
  createBoard(playArea)

  gameArea.append(title)
  gameArea.append(timer)
  gameArea.append(playArea)
  gameArea.append(triesText)
  gameArea.append(restart)
}

const randomCheck = (arrayVals, nEle) => {
  const value = Math.floor(Math.random() * nEle)
  if (arrayVals.length == 0) {
    return value
  } else {
    let isIn = false
    if (arrayVals.includes(value)) {
      isIn = true
      let value2
      while (isIn) {
        value2 = Math.floor(Math.random() * nEle)
        isIn = arrayVals.includes(value2)
      }
      return value2
    } else {
      return value
    }
  }
}
const createBoard = (playArea) => {
  const posArray = []
  const photoArray = []
  if (cards.length == 0) {
    for (let i = 1; i <= nCards; i += 1) {
      // asign photo at ramdon
      const value = randomCheck(photoArray, PICTURES.length)
      photoArray[i - 1] = value
      // Asign the postion at random
      const pos1 = randomCheck(posArray, nCards * 2)
      posArray[2 * i - 1] = pos1
      const pos2 = randomCheck(posArray, nCards * 2)
      posArray[2 * i] = pos2

      cards.push({ pos: pos1, image: PICTURES[value] })
      cards.push({ pos: pos2, image: PICTURES[value] })
    }
  }
  // const cardsOrg = cards.sort((a, b) => a.pos > b.pos)
  const cardsOrg = cards.sort((a, b) => (a.pos > b.pos ? 1 : -1))

  // draw the board all up
  cardsOrg.forEach((element) => {
    const memoryCard = document.createElement('div')
    const frontcard = document.createElement('img')
    const backcard = document.createElement('img')

    memoryCard.classList = 'card'
    memoryCard.alt = element.image

    frontcard.src = `./${element.image}.png`
    frontcard.alt = element.image
    frontcard.classList = 'frontCard'
    backcard.src = './icons8-memory-game-64.png'
    backcard.alt = 'icons8-memory-game-64'
    backcard.classList = 'backCard'
    memoryCard.addEventListener('click', flipCard)

    memoryCard.append(frontcard)
    memoryCard.append(backcard)
    playArea.append(memoryCard)
  })
}

async function flipCard() {
  if (!timerOn) {
    timerOn = true
    timerStart = Date.now()
  }
  if (hasFlipped2) {
    return
  }
  this.classList.toggle('flip')

  if (!hasFlipped) {
    hasFlipped = true
    firstCard = this
  } else {
    secondCard = this
    hasFlipped2 = true
    cardsEqual(firstCard, secondCard)
    hasFlipped = false
  }
}
async function cardsEqual(firstCard, secondCard) {
  if (firstCard.alt == secondCard.alt) {
    keepFliped(firstCard, secondCard)
  } else {
    unFlip(firstCard, secondCard)
  }
  checkForFinnish()
}

function keepFliped(firstCard, secondCard) {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  CardsSolved += 1
  hasFlipped2 = false
}

//! ver como hacer que sea asncrono y pare el codigo hasta que pase el tiempo
async function unFlip(firstCard, secondCard) {
  await setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    hasFlipped2 = false
  }, 500)
}
function checkForFinnish() {
  tries += 1
  const timeEnd = Date.now()
  const time = Math.round((timeEnd - timerStart) / 10) / 100
  const nTries = document.getElementById('triesText')
  const Timer = document.getElementById('timer')
  if (CardsSolved == nCards) {
    nTries.textContent = `Congratlations you finished in  ${tries} tries! In ${time} seconds`
    nTries.classList.toggle('finished')
    Timer.textContent = ''
  } else {
    nTries.textContent = `You did ${tries} tries so far`
    Timer.textContent = `${time} s and Increasing!`
  }
}
function restartGame() {
  const playArea = document.querySelector('.memoryArea')
  while (playArea.firstChild) {
    playArea.removeChild(playArea.firstChild)
  }
  while (cards.length) {
    cards.pop()
  }
  timerOn = false
  tries = 0
  CardsSolved = 0

  const nTries = document.getElementById('triesText')
  const Timer = document.getElementById('timer')
  nTries.classList.remove('finished')
  nTries.textContent = ``
  Timer.textContent = `You restarted!`
  createBoard(playArea)
}
