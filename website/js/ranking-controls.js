const def = document.getElementById('market-cap');
let sorted_by = def;
sorted_by.classList.toggle('table-header-sel');

function setup_ranking_controls(currencies) {
    def.addEventListener('click', () => {
        sorted_by.className = 'table-header-des';
        sorted_by = def;
        currencies = sort_by(def.id, currencies);
        display_data(currencies, data_start_index, data_start_index + data_per_page);
        def.className = 'table-header-default';
    });

    const headers = document.querySelectorAll('.table-header-des');

    headers.forEach(h => {
        h.addEventListener('click', () => {
            if(sorted_by == h) {
                sorted_by = def;
                currencies = sort_by(def.id, currencies);
                display_data(currencies, data_start_index, data_start_index + data_per_page);
                def.className = 'table-header-default';
                h.className = 'table-header-des';
            } else {
                sorted_by.className = 'table-header-des';
                sorted_by = h;
                currencies = sort_by(h.id, currencies);
                display_data(currencies, data_start_index, data_start_index + data_per_page);
                h.className = 'table-header-sel';
            }
        });
    });
}

function sort_by(header, currencies) {
    function compare(a, b) {
        let a_value;
        let b_value;
        if(header == 'name') {
            a_value = a.name.toUpperCase();
            b_value = b.name.toUpperCase();

            let comparison = 0;
            if (a_value > b_value) {
              comparison = 1;
            } else if (a_value < b_value) {
              comparison = -1;
            }

            return comparison;
        } else if(header == 'price') {
            a_value = a.price;
            b_value = b.price;
        } else if(header == 'market-cap') {
            a_value = a.market_cap;
            b_value = b.market_cap;
        } else if(header == 'volume') {
            a_value = a.volume24h;
            b_value = b.volume24h;
        } else if(header =='circulating-supply') {
            a_value = a.circulating_supply;
            b_value = b.circulating_supply;
        } else if(header == 'change') {
            a_value = a.percent_change_24h;
            b_value = b.percent_change_24h;
        }
        
        let comparison = 0;
        if (a_value > b_value) {
          comparison = -1;
        } else if (a_value < b_value) {
          comparison = 1;
        }

        return comparison;

      }

      return currencies.sort(compare);
}