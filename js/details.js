const container = document.querySelector(".card");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(queryString);

const cryptoUrl = "https://api.coinlore.net/api/ticker/?id=" + id;
console.log(cryptoUrl);

let html = "";

async function currencyInfo() {
	try {
		const response = await fetch(cryptoUrl);
		const details = await response.json();
		console.log(details[0]);

		const name = `${details[0].name}`;
		const shortName = `${details[0].symbol}`;
		const rank = `${details[0].rank}`;
		const price = `${details[0].price_usd}`;
		const change24h = `${details[0].percent_change_24h}`;
		const change1h = `${details[0].percent_change_1h}`;
		const change7d = `${details[0].percent_change_7d}`;
		document.title = `${name} is the #${rank} most traded currency out there. Start trading!`;

		// Sets background-color based on trend
		let trend24 = "";
		if (details[0].percent_change_24h < 0) {
			console.log("true");
			trend24 = "img-down24";
		} else {
			console.log("nope");
			trend24 = "img-up24";
		}

		let trend1 = "";
		if (details[0].percent_change_1h < 0) {
			console.log("true");
			trend1 = "img-down1";
		} else {
			console.log("nope");
			trend1 = "img-up1";
		}

		let trend7 = "";
		if (details[0].percent_change_7d < 0) {
			console.log("true");
			trend7 = "img-down7";
		} else {
			console.log("nope");
			trend7 = "img-up7";
		}

		html += `
        <div class="crypto-info">
            <p class="currency newName">${name}</p>
            <p class="currency shortName">${shortName}</p>
            <p class="currency price">USD ${price}$ <span class="cost">/per coin</span></p>
            <p class="currency rank">#${rank} most traded</p>
            <div class="trends">
                <p class="currency change1h ${trend1}"><span class="change">Last hour<br></span>${change1h}%</p>    
                <p class="currency change24h ${trend24}"><span class="change">Last 24hr<br></span>${change24h}%</p>
                <p class="currency change7d ${trend7}"><span class="change">Last 7 days<br></span>${change7d}%</p>
            </div>           
        </div>
        `;

		container.innerHTML = html;
	} catch (err) {
		console.log(err);
		container.innerHTML = displayError();
	}
}

currencyInfo();
