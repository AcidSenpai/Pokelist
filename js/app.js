const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

const pokelist = document.querySelector(".poke-list")
const pokebarContainer = document.querySelector(".poke-bar-container")
const cardContainer = document.querySelector(".info-card_container")

let isFocused = false;
let characterList;
let pokeInfo;
let getAllLi;

const typeColor = {
    Insecte: "#26de81",
    Dragon: "#ffeaa7",
    Électrik: "#fed330",
    Fée: "#FF0069",
    Combat: "#30336b",
    Feu: "#f0932b",
    Vol: "#81ecec",
    Plante: "#00b894",
    Sol: "#EFB549",
    Spectre: "#a55eea",
    Glace: "#74b9ff",
    Normal: "#95afc0",
    Poison: "#6c5ce7",
    Psy: "#a29bfe",
    Roche: "#2d3436",
    Eau: "#0190FF",
    Ténèbres: "#22092C",
};

fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then(response => {
        if(!response.ok){
            throw new Error("Failed to fetch data")
        }
        return response.json()
    })
    .then(data => {
        characterList = data
        generateList()
    })


const generateList = () => {
    let pokeImg = characterList.image
    for(let i = 0; i < characterList.length; i++) {
        const li_item = document.createElement("li")
        li_item.classList.add("li-poke")
        const span_item = document.createElement("span")
        span_item.classList.add("li-span")
        const img_item = document.createElement("img")
        img_item.classList.add("li-img")
        img_item.src = characterList[i].image

        span_item.textContent = characterList[i].name

        pokelist.appendChild(li_item);
        li_item.appendChild(span_item)
        li_item.appendChild(img_item)
    }

    getAllLi = document.querySelectorAll(".li-poke")

    getAllLi.forEach(item => {
        item.addEventListener("click", (testtar) => {
            let target = item.querySelector("span").textContent
            changeCard(target)
            pokebarContainer.classList.add("list-hidden")
        })
    })
}

const changeCard = (tar) => {
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${tar}`)
        .then(res => {
            if(!res.ok) {
                throw new Error("failed to catch Data")
            }
            return res.json()
        })
        .then(data => {
            pokeInfo = data
            drawCard(pokeInfo)
            cardContainer.lastChild.scrollIntoView({ behavior: 'smooth' });
        })
}

const drawCard = (info) => {
    let pokeHP = info.stats.HP
    let pokeImage = info.image
    let pokeName = info.name
    let pokeType = info.apiTypes[0].name
    let pokeAttack = info.stats.attack
    let pokeDefense = info.stats.defense
    let pokeSpeed = info.stats.speed

    const infoCard = document.createElement("div")
    infoCard.classList.add("info-card")

    const colorCircle = document.createElement("div")
    colorCircle.classList.add("color-circle")

    const cardHP = document.createElement("div")
    cardHP.classList.add("card-hp")
    const cardH2HP = document.createElement("h2")
    cardH2HP.classList.add("card-h2_hp")
    const cardSpanHP = document.createElement("span")
    cardSpanHP.classList.add("card-span_hp")

    const cardCenter = document.createElement("div")
    cardCenter.classList.add("card-center");
    const cardImg = document.createElement("img")
    cardImg.classList.add("card__img")
    const cardH1 = document.createElement("h1")
    cardH1.classList.add("card__h1")
    const cardTypeContainer = document.createElement("div")
    cardTypeContainer.classList.add("card-type_container")
    const cardType = document.createElement("span")
    cardType.classList.add("card__type")

    const cardStats = document.createElement("div")
    cardStats.classList.add("card-stats")

    const cardStatsAttack = document.createElement("div")
    cardStatsAttack.classList.add("card-stats_attack")
    const statSpanAttack = document.createElement("span")
    statSpanAttack.classList.add("stats-span_attack")
    const statH2Attack = document.createElement("h2")
    statH2Attack.classList.add("stats-H2_attack")

    const cardStatsDefense = document.createElement("div")
    cardStatsDefense.classList.add("card-stats_defense")
    const statSpanDefense = document.createElement("span")
    statSpanDefense.classList.add("stats-span_defense")
    const statH2Defense = document.createElement("h2")
    statH2Defense.classList.add("stats-H2_defense")

    const cardStatsSpeed = document.createElement("div")
    cardStatsSpeed.classList.add("card-stats_speed")
    const statSpanSpeed = document.createElement("span")
    statSpanSpeed.classList.add("stats-span_speed")
    const statH2Speed = document.createElement("h2")
    statH2Speed.classList.add("stats-h2_speed")

    colorCircle.style.backgroundColor = typeColor[info.apiTypes[0].name]

    cardSpanHP.textContent = info.stats.HP
    cardH2HP.textContent = "HP"

    cardImg.src = info.image
    cardH1.textContent = info.name
    cardType.textContent = info.apiTypes[0].name
    cardType.style.backgroundColor = typeColor[info.apiTypes[0].name]

    statSpanAttack.textContent = info.stats.attack
    statSpanDefense.textContent = info.stats.defense
    statSpanSpeed.textContent = info.stats.speed

    statH2Attack.textContent = "Attack"
    statH2Defense.textContent = "Defense"
    statH2Speed.textContent = "Speed"

    cardContainer.appendChild(infoCard)
    infoCard.appendChild(colorCircle)
    infoCard.appendChild(cardHP)

    cardHP.appendChild(cardH2HP)
    cardH2HP.appendChild(cardSpanHP)

    infoCard.appendChild(cardCenter)
    cardCenter.appendChild(cardImg)
    cardCenter.appendChild(cardH1)
    cardCenter.appendChild(cardTypeContainer)
    cardTypeContainer.appendChild(cardType)

    infoCard.appendChild(cardStats)
    cardStats.appendChild(cardStatsAttack)
    cardStatsAttack.appendChild(statSpanAttack)
    cardStatsAttack.appendChild(statH2Attack)

    cardStats.appendChild(cardStatsDefense)
    cardStatsDefense.appendChild(statSpanDefense)
    cardStatsDefense.appendChild(statH2Defense)

    cardStats.appendChild(cardStatsSpeed)
    cardStatsSpeed.appendChild(statSpanSpeed)
    cardStatsSpeed.appendChild(statH2Speed)

    if(info.apiTypes.length === 1) {
        return
    }else {

        const cardType2 = document.createElement("span")
        cardType2.classList.add("card__type")
        cardType2.style.backgroundColor = typeColor[info.apiTypes[1].name]
        cardType2.textContent = info.apiTypes[1].name
        cardTypeContainer.appendChild(cardType2)
        colorCircle.style.backgroundColor = typeColor[info.apiTypes[1].name]
    }
    
}

searchInput.addEventListener("focus", () => {
    pokebarContainer.classList.remove("list-hidden")
    
})

document.addEventListener("mousedown", (event) => {
    const target = event.target
    if (!pokelist.contains(target) && !cardContainer.contains(target)) {
        pokebarContainer.classList.add("list-hidden");
    }

})

const filterList = () => {
    const filter = searchInput.value.toUpperCase();
    const listItems = pokelist.querySelectorAll("li")

    listItems.forEach((item) => {
        const itemName = item.textContent.toUpperCase();
        if (itemName.includes(filter) || filter === "") {
            item.style.display = 'flex'; 
        } else {
            item.style.display = 'none';   // Cache l'élément s'il ne correspond pas
        }
    });
}

searchInput.addEventListener("input", filterList)






// searchInput.addEventListener("blur", () => {
//     let liItemTest = document.querySelectorAll(".li-poke")
//     liItemTest.forEach(item => {
//         item.addEventListener("click", () => {
//             console.log(item.firstChild.textContent);
//             pokebarContainer.classList.add("list-hidden")
//         })
//     })
// })


