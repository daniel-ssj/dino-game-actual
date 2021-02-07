const dino = document.getElementsByClassName('dino')
const background = document.getElementsByClassName('background')
let isJumping = false
let position = 0
let score = 0;


const handleKeyup = event => {
    if(event.keyCode === 32 || event.keyCode == 38){
        if(!isJumping)
            jump()
    }
}

const jump = () => {
    isJumping = true

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval)

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                    isJumping = false
                }else{
                    position -= 20 
                    dino[0].style.bottom = position + 'px'
                }
            }, 20)
        }else{
            position += 20
            dino[0].style.bottom = position + 'px'
        }
    }, 40)
}

const createCactus = () => {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background[0].appendChild(cactus)

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background[0].removeChild(cactus)
            score += 10;
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Game over</h1>' + ' <h1 class="score"> Score:' + score + '</h1>'
        }else{
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 20)

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyup)
