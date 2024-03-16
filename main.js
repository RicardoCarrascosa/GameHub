import './style.css'
import { rpsGame } from './components/RPS-Game/RPSGame.js'
import { memoryGame } from './components/Memory-Game/MemoryGame.js'
import { ticktackGame } from './components/TickTak-Game/ticktackGame.js'

const Layout = `
<header>
  <nav>
    <img class= "mainIcon" src="./public/icons8-games-64.png" alt="icons8-games-64"></img>
    <img id = 'tickTackToe' class= "gameIcon" src = "./icons8-tres-en-raya-50.png" alt="icons8-tres-en-raya-50"></img>
    <img id = 'memoryGame' class= "gameIcon" src = "./icons8-memory-game-64.png" alt="icons8-memort-game-64"></img>
    <img id = 'rockPaperScissor' class= "gameIcon" src = "./rock-paper-scissors.png" alt="rock-paper-scissors"></img>
  </nav>
</header>
<section class= "gameArea" ></section>
<footer>
<p>Game Hub by Ricardo Carrascosa</p>
</footer>
`

const printLayout = () => {
  document.querySelector('#app').innerHTML = Layout
  const navIcon = document.querySelectorAll('nav > img')
  navIcon.forEach((icon) => {
    icon.addEventListener('click', navSelect)
  })
}
printLayout()
printHome()

function printHome() {
  const h2 = document.createElement('h2')
  h2.textContent = 'Pick a Game'
  h2.className = 'homeText'
  document.querySelector('.gameArea').append(h2)
}

function navSelect() {
  const selectedGame = this.id
  const navIcon = document.querySelectorAll('nav > img')

  const gameArea = document.querySelector('.gameArea')
  gameArea.innerHTML = ''
  navIcon.forEach((icon) => {
    if (icon.classList.contains('Selected')) {
      icon.classList.remove('Selected')
    }
  })

  this.classList.add('Selected')

  switch (selectedGame) {
    case 'tickTackToe':
      ticktackGame()
      break
    case 'memoryGame':
      memoryGame()
      break
    case 'rockPaperScissor':
      rpsGame()
      break
    default:
      printHome()
      break
  }
}
