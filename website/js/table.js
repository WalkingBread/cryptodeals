const icon_url = 'https://s2.coinmarketcap.com/static/img/coins/32x32/';
const chart_url = 'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/';

function parse_number(number, precision) {
    if(number) {    
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        let dot_index = number.indexOf('.');
        return number.slice(0, dot_index + precision + 1);
    }
    return '0';
}

function display_data(currencies, start_index, end_index) {
    document.querySelector('.data-table').innerHTML = '';

    for(let i = start_index; i < end_index; i++) {
        const currency = currencies[i];

        let table_row = document.createElement('tr');
        table_row.className = 'table-row';

        let index_td = document.createElement('td');
        index_td.innerHTML = i + 1;

        let name_td = document.createElement('td');
        name_td.className = 'name-td';

        let currency_image = document.createElement('img');
        currency_image.src = icon_url + currency.id + '.png';
        let currency_name = document.createElement('h5');
        currency_name.style.margin = '6px 0 6px 0';
        currency_name.innerHTML = currency.name;
        currency_name.className = 'name-text';

        name_td.appendChild(currency_image);
        name_td.appendChild(currency_name);

        let price_td = document.createElement('td');
        price_td.className = 'price-td';

        let currency_price = document.createElement('h5');
        currency_price.innerHTML = '$' + parse_number(currency.price, 2);

        price_td.append(currency_price);

        let market_cap_td = document.createElement('td');
        market_cap_td.className = 'market-cap-td';

        let currency_market_cap =  document.createElement('h5');
        currency_market_cap.innerHTML = '$' + parse_number(currency.market_cap, 2);

        market_cap_td.appendChild(currency_market_cap);

        let volume_td = document.createElement('td');
        volume_td.className = 'volume-td';

        let currency_volume = document.createElement('h5');
        currency_volume.innerHTML = '$' + parse_number(currency.volume24h, 2);

        volume_td.appendChild(currency_volume);

        let circulating_supply_td = document.createElement('td');
        circulating_supply_td.className = 'circulating-supply-td';

        let currency_circulating_supply = document.createElement('h5');
        currency_circulating_supply.innerHTML = currency.circulating_supply + ' ' + currency.symbol;

        circulating_supply_td.appendChild(currency_circulating_supply);

        let change_td = document.createElement('td');
        change_td.className = 'change-td';

        let currency_change = document.createElement('h5');
        currency_change.innerHTML = currency.percent_change_24h + ' %';
        if(currency.percent_change_24h < 0) {
            currency_change.style.color = '#c4213d';
        } else if(currency.percent_change_24h == 0) {
            currency_change.style.color = '#c4bf21';
        } else {
            currency_change.style.color = '#21c44c';
        }

        change_td.appendChild(currency_change);

        let chart_td = document.createElement('td');
        chart_td.className = 'chart-td';

        currency_chart = document.createElement('img');
        currency_chart.src = chart_url + currency.id + '.png';

        chart_td.appendChild(currency_chart);
        
        table_row.appendChild(index_td);
        table_row.appendChild(name_td);
        table_row.appendChild(price_td);
        table_row.appendChild(market_cap_td);
        table_row.appendChild(volume_td);
        table_row.appendChild(circulating_supply_td);
        table_row.appendChild(change_td);
        table_row.appendChild(chart_td);

        document.querySelector('.ranking-table tbody').append(table_row);
    }   
}