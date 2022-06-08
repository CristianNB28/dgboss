const convertStringToCurrency = (typeCurrency, currencyAmount) => {
    if (typeCurrency === 'BOLÍVAR') {
        currencyAmount = `Bs ${currencyAmount}`;
    } else if (typeCurrency === 'DÓLAR') {
        currencyAmount = `$ ${currencyAmount}`;
    } else if (typeCurrency === 'EUROS') {
        currencyAmount = `€ ${currencyAmount}`;
    }
    return currencyAmount;
}

module.exports = convertStringToCurrency;