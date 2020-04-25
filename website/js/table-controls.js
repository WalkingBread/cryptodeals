let data_start_index = 0;
let data_per_page = 50;

function setup_table_controls(currencies) {
    back_button = document.getElementById('back-button');
    back_button.addEventListener('click', () => {
        prev_page(currencies);
    });

    forward_button = document.getElementById('forward-button');
    forward_button.addEventListener('click', () => {
        next_page(currencies);
    });
}

function prev_page(currencies) {
    if(data_start_index > data_per_page) {
        data_start_index -= data_per_page;
    } else {
        data_start_index = 0;
    }
    
    display_data(currencies, data_start_index, data_start_index + data_per_page);
}

function next_page(currencies) {
    if(data_start_index + data_per_page < currencies.length) {
        data_start_index += data_per_page;
        display_data(currencies, data_start_index, data_start_index + data_per_page);
    } else {
        data_start_index = currencies.length - data_per_page;
        display_data(currencies, data_start_index, data_start_index + (currencies.length - data_start_index));
    }
}