// URL da API
const endpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

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
fetchCardInfo();