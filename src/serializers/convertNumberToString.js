const convertNumberToString = (stringAmount) => {
    if (stringAmount.toString().includes('.') === true) {
        stringAmount = stringAmount.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
    } else {
        stringAmount = String(stringAmount).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
    }
    return stringAmount;
}

module.exports = convertNumberToString;