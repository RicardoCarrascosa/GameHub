import './RPSGame.css'

//Cargar el countert de las cookies
const COUNTER = [0, 0]

export const rpsGame = () => {
  const gameArea = document.querySelector('.gameArea')
  const title = document.createElement('h1')
  const userArea = document.createElement('div')
  const paperButton = document.createElement('img')
  const rockButton = document.createElement('img')
  const scissorsButton = document.createElement('img')
  const rivalOption = document.createElement('img')
  const resultDialog = document.createElement('h2')
  const score = document.createElement('h3')

  title.textContent = 'Rock Paper Scisors Game'

  userArea.className = 'playArea'

  paperButton.src = './icons8-paper-hand-96.png'
  paperButton.className = 'userButton'

  rockButton.src = './icons8-rock-hand-96.png'
  rockButton.className = 'userButton'

  scissorsButton.src = 'icons8-tijeras-de-mano-96.png'
  scissorsButton.className = 'userButton'

  rivalOption.id = 'rivalOption'
  resultDialog.id = 'gameResult'
  rivalOption.src = './rock-paper-scissors.png'
  score.id = 'scoreBoard'

  rockButton.addEventListener('click', (e) => {
    rockButton.className = 'userButton'
    scissorsButton.className = 'userButton'
    paperButton.className = 'userButton'
    playerOption(e)
  })
  scissorsButton.addEventListener('click', (e) => {
    rockButton.className = 'userButton'
    scissorsButton.className = 'userButton'
    paperButton.className = 'userButton'
    playerOption(e)
  })
  paperButton.addEventListener('click', (e) => {
    rockButton.className = 'userButton'
    scissorsButton.className = 'userButton'
    paperButton.className = 'userButton'
    playerOption(e)
  })

  gameArea.append(title)
  userArea.append(paperButton)
  userArea.append(rockButton)
  userArea.append(scissorsButton)
  gameArea.append(rivalOption)
  gameArea.append(userArea)
  gameArea.append(resultDialog)
  gameArea.append(score)
}

async function playerOption(e) {
  const userOption = e.target.src
  let player = ''
  if (userOption.includes('paper')) {
    player = 'paper'
  } else if (userOption.includes('rock')) {
    player = 'rock'
  } else if (userOption.includes('tijeras')) {
    player = 'scissors'
  }
  // Añadir clase de elemento seleccionado a e
  e.target.classList.toggle('selected')

  //Random element:
  const rival = getRivalOption()
  showhand(rival)

  // check for the win
  const [result, value] = getWinner(player, rival)
  const gameResult = document.getElementById('gameResult')
  const totalScore = document.getElementById('scoreBoard')

  switch (value) {
    case 0:
      gameResult.classList = 'draw'
      break
    case 1:
      gameResult.classList = 'win'
      COUNTER[0] += 1
      break
    case 2:
      gameResult.classList = 'loose'
      COUNTER[1] += 1
      break
  }

  gameResult.textContent = result
  totalScore.textContent = `The Score is [ ${COUNTER[0]} | ${COUNTER[1]} ]`
}

async function showhand(rival) {
  const rivalOption = document.getElementById('rivalOption')
  rivalOption.classList.remove('showHand')
  switch (rival) {
    case 'paper':
      rivalOption.src = './icons8-paper-hand-96.png'
      break
    case 'rock':
      rivalOption.src = './icons8-rock-hand-96.png'
      break
    case 'scissors':
      rivalOption.src = './icons8-tijeras-de-mano-96.png'
      break
  }
  await setTimeout(() => {
    rivalOption.classList.toggle('showHand')
  }, 1500)
}
const getWinner = (player, rival) => {
  const messageList = ['Draw - Try Again', 'You Won!', 'You Lost!']
  let value = 0
  if (rival == player) {
    value = 0
  } else if ((rival == 'rock') & (player == 'scissors')) {
    value = 2
  } else if ((rival == 'paper') & (player == 'rock')) {
    value = 2
  } else if ((rival == 'scissors') & (player == 'paper')) {
    value = 2
  } else if ((rival == 'rock') & (player == 'paper')) {
    value = 1
  } else if ((rival == 'scissors') & (player == 'rock')) {
    value = 1
  } else if ((rival == 'paper') & (player == 'scissors')) {
    value = 1
  }
  return [messageList[value], value]
}

const getRivalOption = () => {
  const value = Math.floor(Math.random() * 3)
  switch (value) {
    case 0:
      return 'rock'
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
  }
}
