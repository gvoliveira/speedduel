// URL da API
const endpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const limited1 = [
 "Fossil Warrior Skull Knight",
 "Golden Ladybug",
"Submarineroid",
"Mystical Space Typhoon",
"Offerings to the Doomed",
"Floodgate Trap Hole",
"Nightmare Wheel",
"Zoma the Spirit",
]

const limited2 = [
  "Cocoon of Ultra Evolution",
  "Parasite Paranoid",
"Red-Eyes Baby Dragon",
"Vortex Trooper",
"Allure of Darkness",
"Cup of Ace",
"Foolish Burial",
"Machine Angel Ritual",
"Reinforcement of the Army",
"Supply Squad",
"Time Stream",  
]

const limited3 = [
  "Cyber Angel Benten",
"D.D. Warrior Lady",
"Gearfried the Iron Knight",
"Neo-Spacian Grand Mole",
"Book of Moon",
"Cosmic Cyclone",
"Paleozoic Canadia",
"Sakuretsu Armor",
"Survival's End",
"Wall of Disruption",
"Widespread Ruin",
]




// Função para exibir os dados no HTML
function displayCards(data) {
  const resultsDiv = document.getElementById("conteudo-cartas");
  resultsDiv.innerHTML = data.data
    .slice(0, 10) // Exibir apenas os 10 primeiros resultados
    .map(
      card => `
      <div>
        <h3>${card.name}</h3>
        <img class="img-cards" src="${card.card_images[0].image_url}" alt="${card.name}">
        <p><strong>Tipo:</strong> ${card.type}</p>
        <p><strong>Descrição:</strong> ${card.desc}</p>
      </div>
    `
    )
    .join("");
}

// Chamando a função
//fetchCardInfo();

const fetchCardData = async (cardName) => {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar carta: ${cardName}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function criarHtmlElements(lista, id){
  const filteredCards = [];
  for (const cardName of lista) {
    const cardData = await fetchCardData(cardName);
    if (cardData && cardData.data && cardData.data.length > 0) {
      filteredCards.push(cardData.data[0]); // Adiciona a primeira carta encontrada ao array.
    }
  }
  
  let limitedDiv = document.getElementById(id) //div
  console.log(limitedDiv)
  
  for(carta of filteredCards){
    const imgElemento = document.createElement("img")
    imgElemento.src = carta.card_images[0].image_url
    imgElemento.classList.add("img-cards")
    limitedDiv.appendChild(imgElemento)
  }
}

const fetchLimitedCards = async () => {
  

  await criarHtmlElements(limited1, "limited1")
  await criarHtmlElements(limited2, "limited2")
  await criarHtmlElements(limited3, "limited3")
  

};

fetchLimitedCards();