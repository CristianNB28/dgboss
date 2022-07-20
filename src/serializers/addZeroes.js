const addZeroes = (num) => {
    const dec = num.split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return Number(num).toFixed(len);
}

module.exports = addZeroes;