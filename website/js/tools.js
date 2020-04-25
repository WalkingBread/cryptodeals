function copy_array(arr) {
    let copy = [];
    for(let i = 0; i < arr.length; i++) {
        copy.push(arr[i]);
    }
    return copy;
}