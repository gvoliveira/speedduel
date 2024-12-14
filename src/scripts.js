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

// Função para buscar dados
async function fetchCardInfo() {
  try {
    // Fazendo a requisição para a API
    const response = await fetch(endpoint);
    
    // Verificando se houve erro na requisição
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    // Convertendo a resposta para JSON
    const data = await response.json();

    // Exibindo dados no console
    console.log(data);

    // Mostrando os dados no HTML
    displayCards(data);
  } catch (error) {
    // Tratando erros
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function fetchLimited1(){
  const resposta = await fetch("")
}


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

const fetchLimitedCards = async () => {
  const filteredCards = [];
  for (const cardName of limited1) {
    const cardData = await fetchCardData(cardName);
    if (cardData && cardData.data && cardData.data.length > 0) {
      filteredCards.push(cardData.data[0]); // Adiciona a primeira carta encontrada ao array.
    }
  }


  let limited1div = document.getElementById("limited1") //div
  console.log(limited1div)
  for(carta of filteredCards){
    const imgElemento = document.createElement("img")
    imgElemento.src = carta.card_images[0].image_url
    imgElemento.classList.add("img-cards")
    limited1div.appendChild(imgElemento)
  }

};

fetchLimitedCards();