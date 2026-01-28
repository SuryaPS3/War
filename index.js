const NewDeck = document.getElementById('New-Deck')
const Draw = document.getElementById('Draw')
const cardsContainer = document.getElementById('image-container')

let deckId = ''
let score1 = 0
let score2 = 0

function handleClickNewDeck(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res=>res.json())
        .then(data=>{
            deckId = data.deck_id
            console.log(deckId)
        })
}
NewDeck.addEventListener("click",handleClickNewDeck);

function handlceClickDraw(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        cardsContainer.children[0].innerHTML=`
        <img src="${data.cards[0].image}"/>
        `
        cardsContainer.children[1].innerHTML=`
        <img src="${data.cards[1].image}"/>
        `
        
        const remainingCards = data.remaining
        document.getElementById('header').innerText=`Remaining Cards: ${remainingCards}`

        const winner = determineWinner(data.cards[0],data.cards[1]);
        const scoreBoard = document.getElementById('score-board')
        if(remainingCards===0){
            Draw.disabled=true
            Draw.innerText="Game Over! No More Cards Left"
            document.getElementById('header').innerText=`${winner}`
        }
        
        
    })

}

function determinaFinalWinner(score1,score2){
    if(score1>score2){
        return "Computer is the Final Winner!"
    }else if(score1<score2){
        return "Surya(YOU) is the Final Winner!"
    }else{
        return "It's a Tie!"
    }
}
function determineWinner(card1,card2){
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if(card1ValueIndex>card2ValueIndex){
        return "Computer"
    }else if(card1ValueIndex<card2ValueIndex){
        return "Surya"
    }else{
        return "Tie"
    }
}

Draw.addEventListener("click",handlceClickDraw);