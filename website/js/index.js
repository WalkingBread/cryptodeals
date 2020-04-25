
window.onload = function() {

    function parse_data(response) {
        const data = JSON.parse(response).data;

        const currencies = [];
        for (let x in data) {
            const c = data[x];
            currencies.push({
                id: c.id,
                name: c.name,
                symbol: c.symbol, 
                circulating_supply: c.circulating_supply,
                price: c.quote.USD.price,
                volume24h: c.quote.USD.volume_24h,
                percent_change_1h: c.quote.USD.percent_change_1h,
                percent_change_24h: c.quote.USD.percent_change_24h,
                percent_change_7d: c.quote.USD.percent_change_7d,
                market_cap: c.quote.USD.market_cap
            });
        }

        return currencies;
    }

    var request = new XMLHttpRequest(); 
    request.open("GET", 'http://127.0.0.1:8080/api');
    request.onreadystatechange = function() { 
        if (request.readyState === 4 && request.status === 200) {
            let currencies = parse_data(request.responseText);
            currencies = sort_by(def, currencies);
            display_data(currencies, 0, 50);
            setup_table_controls(currencies);
            setup_ranking_controls(currencies);
        }
    };
    request.send(null); 
}