const NewDeck = document.getElementById('New-Deck')
const Draw = document.getElementById('Draw')

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
        document.getElementById("image-container").innerHTML=`
        <img src="${data.cards[0].image}"/>
        <img src="${data.cards[1].image}"/>
        `
    })
}
Draw.addEventListener("click",handlceClickDraw);