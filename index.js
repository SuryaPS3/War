const NewDeck = document.getElementById('New-Deck')
const Draw = document.getElementById('Draw')
const cardsContainer = document.getElementById('image-container')

let deckId = ''

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
        
    })
}
Draw.addEventListener("click",handlceClickDraw);