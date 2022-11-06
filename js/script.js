const container = document.querySelector(".cards");
const url = "https://api.coinlore.net/api/tickers/";
const pageLoad = document.querySelector(".error");

let html = "";

async function currencies() {
	try {
		const response = await fetch(url);
		const json = await response.json();
		console.log(json);
		const data = json.data;

		for (let i = 0; i < data.length; i++) {
			const cryptoID = `${data[i].id}`;
			const cryptoName = `${data[i].name}`;
			const cryptoShortName = `${data[i].symbol}`;
			const changeLast24 = `${data[i].percent_change_24h}`;
			const cryptoPrice = `${data[i].price_usd}`;

			if (i === 25) {
				break;
			}

			// Sets dot-color based on trend
			let trend = "";
			if (data[i].percent_change_24h < 0) {
				console.log("true");
				trend = "img-down";
			} else {
				console.log("nope");
				trend = "img-up";
			}

			html += `
                <div class="card-content">
                 <a href="details.html?id=${cryptoID}" class="a-name tooltip"><p class="name">${cryptoName}<span class="tooltiptext">Value per coin<br> <span class="priceTip">USD ${cryptoPrice}$</span></span></p></a>
                    <p class="name-short">${cryptoShortName}</p>
					<p class="${trend}"><span class="percent">${changeLast24}%<span class="last24">/24hr</span></span></p>
                    <p class="past"></p>
					<a href="details.html?id=${cryptoID}" class="readmore">More info<span class="fas fa-chevron-right"</span></a>
                </div>
            `;
			container.innerHTML = html;
		}
	} catch (err) {
		console.log(err);
		container.innerHTML = displayError();
	}
}

currencies();
