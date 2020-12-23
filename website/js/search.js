
function setup_search() {
    const searcher = document.getElementById('searcher');
    let value = '';
    setInterval(() => {
        if(searcher.value != value) {
            value = searcher.value;
            if(value != '') {
                currencies = def_currency_list;
                currencies = search(value, currencies);
                currencies = sort_by(sorted_by.id, currencies)
            } else {
                currencies = def_currency_list;
                currencies = sort_by(sorted_by.id, currencies);
            }
            data_start_index = 0;
            if(currencies.length <= data_per_page) {
                display_data(currencies, data_start_index, currencies.length);
            } else {
                display_data(currencies, data_start_index, data_start_index + data_per_page);
            }
        }
    }, 100);
}


function search(text, currencies) {
    let filtered_currencies = [];
    for(let i = 0; i < currencies.length; i++) {
        let name = currencies[i].name.toUpperCase();
        text = text.toUpperCase();
        if(name.includes(text)) {
            filtered_currencies.push(currencies[i]);
        }
    }

    return filtered_currencies;
}