import { doc } from 'prettier'
import './ticktackGame.css'

let CURRPLAYER = 0
let FINISHED = false
const player1Array = []
const player2Array = []
const playsArray = []
const playerFig = []
const playerWinFig = []

export const ticktackGame = () => {
  const gameArea = document.querySelector('.gameArea')
  const title = document.createElement('h1')
  const SubTitle = document.createElement('h2')
  const tickArea = document.createElement('div')
  const playerArea = document.createElement('div')
  const player1Text = document.createElement('h3')
  const player1Area = document.createElement('ul')
  const li1 = document.createElement('li')
  const player1SelXinput = document.createElement('input')
  const player1SelXText = document.createElement('label')
  const li2 = document.createElement('li')
  const player1SelOinput = document.createElement('input')
  const player1SelOText = document.createElement('label')
  const Reset = document.createElement('button')

  title.innerHTML = 'Tick Tac Toe Game'
  SubTitle.className = 'tickSubTitle'
  SubTitle.textContent = `Player ${CURRPLAYER} select figure:`
  tickArea.className = 'tickArea'

  player1Text.textContent = 'Player 1 Select X or O:'
  player1SelXinput.className = 'mycheckbox'
  player1SelXinput.type = 'radio'
  player1SelXinput.name = 'selection'
  player1SelXinput.id = 'checkBoxX'
  player1SelXinput.addEventListener('click', selectPlayers)
  player1SelXText.htmlFor = 'checkBoxX'
  player1SelXText.innerHTML = `<img src = './icons8-x-100-b.png'></img>`
  player1SelOinput.className = 'mycheckbox'
  player1SelOinput.type = 'radio'
  player1SelOinput.name = 'selection'
  player1SelOinput.addEventListener('click', selectPlayers)
  player1SelOinput.id = 'checkBoxO'
  player1SelOText.htmlFor = 'checkBoxO'
  player1SelOText.innerHTML = `<img src = './icons8-circulo-50-b.png'></img>`
  Reset.textContent = 'Reset Game'
  Reset.className = 'resetButton'
  Reset.addEventListener('click', restartTickTack)
  gameArea.append(title)
  gameArea.append(SubTitle)

  startBoard(tickArea)
  gameArea.append(tickArea)
  playerArea.append(player1Text)
  li1.append(player1SelXinput)
  li1.append(player1SelXText)
  player1Area.append(li1)
  li2.append(player1SelOinput)
  li2.append(player1SelOText)
  player1Area.append(li2)

  playerArea.append(player1Area)
  gameArea.append(playerArea)
  gameArea.append(Reset)
}
const startBoard = (tickArea = document.querySelector('.tickArea')) => {
  for (let i = 1; i <= 9; i++) {
    const div = document.createElement('div')
    div.classList = `tickDiv pos${i}`
    div.addEventListener('click', selectCell)
    tickArea.append(div)
  }
}

function selectPlayers() {
  let player1Sel = this.id
  if (playsArray.length == 0) {
    playerFig.length = 0
    playerWinFig.length = 0
    if (player1Sel.includes('checkBoxO')) {
      playerFig.push('./icons8-circulo-50-b.png')
      playerFig.push('./icons8-x-100-b.png')
      playerWinFig.push('./icons8-circulo-50-y.png')
      playerWinFig.push('./icons8-x-100-y.png')
    } else if (player1Sel.includes('checkBoxX')) {
      playerFig.push('./icons8-x-100-b.png')
      playerFig.push('./icons8-circulo-50-b.png')
      playerWinFig.push('./icons8-x-100-y.png')
      playerWinFig.push('./icons8-circulo-50-y.png')
    }
    const message = document.querySelector('.tickSubTitle')
    message.textContent = 'Player 1'
    if (message.classList.contains('loose')) {
      message.classList.remove('loose')
    }

    const mychecks = document.querySelectorAll('.mycheckbox')
    mychecks.forEach((check) => {
      check.disabled = true
    })
  }
}

function selectCell() {
  const message = document.querySelector('.tickSubTitle')

  if (playerFig.length == 0) {
    message.textContent = 'Select a Figure!'
    message.classList.add('loose')
    return
  }
  if (FINISHED) {
    return
  }

  let winArray = []
  const image = document.createElement('img')
  image.classList = 'tickIcon'
  playsArray.push(this.classList[1])
  if (CURRPLAYER == 0) {
    image.src = playerFig[CURRPLAYER]
    this.append(image)
    player1Array.push(this.classList[1])
    winArray = checkPlayerWin(player1Array)
    if (winArray.length < 3) {
      CURRPLAYER = 1
    }
  } else {
    image.src = playerFig[CURRPLAYER]
    this.append(image)
    player2Array.push(this.classList[1])
    winArray = checkPlayerWin(player2Array)
    if (winArray.length < 3) {
      CURRPLAYER = 0
    }
  }
  message.textContent = `Player ${CURRPLAYER + 1}`
  this.removeEventListener('click', selectCell)

  if (winArray.length == 3) {
    FINISHED = true
    message.textContent = `Player ${CURRPLAYER + 1} WON`
    if (CURRPLAYER == 0) {
      message.classList.add('win')
    } else if (CURRPLAYER == 1) {
      message.classList.add('loose')
    }
    winArray.forEach((e) => {
      const winImage = document.createElement('img')
      winImage.classList = 'tickIcon'
      winImage.src = playerWinFig[CURRPLAYER]
      const winItem = document.querySelector(`.${e}`)
      winItem.removeChild(winItem.firstChild)
      winItem.append(winImage)
    })
  }

  if (player1Array.length + player2Array.length == 9) {
    message.textContent = 'There is a Draw'
    message.classList.add('draw')
  }
}

function clearEvents() {
  const elements = document.querySelectorAll('.tickDiv')
  elements.forEach((ele) => {
    console.log(ele)
    ele.className = 'tickDiv'
  })
}

function checkPlayerWin(playerArray) {
  //check for wins
  let winArray = []
  if (playerArray.includes('pos1') & playerArray.includes('pos2') & playerArray.includes('pos3')) {
    winArray = ['pos1', 'pos2', 'pos3']
  } else if (
    playerArray.includes('pos1') &
    playerArray.includes('pos5') &
    playerArray.includes('pos9')
  ) {
    winArray = ['pos1', 'pos5', 'pos9']
  } else if (
    playerArray.includes('pos1') &
    playerArray.includes('pos4') &
    playerArray.includes('pos7')
  ) {
    winArray = ['pos1', 'pos4', 'pos7']
  } else if (
    playerArray.includes('pos2') &
    playerArray.includes('pos5') &
    playerArray.includes('pos8')
  ) {
    winArray = ['pos2', 'pos5', 'pos8']
  } else if (
    playerArray.includes('pos3') &
    playerArray.includes('pos6') &
    playerArray.includes('pos9')
  ) {
    winArray = ['pos3', 'pos6', 'pos9']
  } else if (
    playerArray.includes('pos3') &
    playerArray.includes('pos5') &
    playerArray.includes('pos7')
  ) {
    winArray = ['pos3', 'pos5', 'pos7']
  } else if (
    playerArray.includes('pos4') &
    playerArray.includes('pos5') &
    playerArray.includes('pos6')
  ) {
    winArray = ['pos4', 'pos5', 'pos6']
  } else if (
    playerArray.includes('pos7') &
    playerArray.includes('pos8') &
    playerArray.includes('pos9')
  ) {
    winArray = ['pos7', 'pos8', 'pos9']
  }
  return winArray
}

function restartTickTack() {
  const tickArea = document.querySelector('.tickArea')
  while (tickArea.firstChild) {
    tickArea.removeChild(tickArea.firstChild)
  }
  startBoard(tickArea)
  FINISHED = false
  CURRPLAYER = 0
  player1Array.length = 0
  player2Array.length = 0
  playsArray.length = 0
  const message = document.querySelector('.tickSubTitle')
  message.textContent = 'Player 1'
  message.classList = 'tickSubTitle'

  const mychecks = document.querySelectorAll('.mycheckbox')
  mychecks.forEach((check) => {
    check.disabled = false
  })
}
