const convertStringToNumber = (numberAmount) => {
    if ((numberAmount.indexOf(',') !== -1) && (numberAmount.indexOf('.') !== -1)) {
        numberAmount = numberAmount.replaceAll(".", "");
        numberAmount = numberAmount.replace(",", ".");
        numberAmount = parseFloat(numberAmount.replaceAll(/,/g,''));
    } else if (numberAmount.indexOf(',') !== -1) {
        numberAmount = numberAmount.replace(",", ".");
        numberAmount = parseFloat(numberAmount);
    } else if (numberAmount.indexOf('.') !== -1) {
        numberAmount = numberAmount.replaceAll(".", ",");
        numberAmount = parseFloat(numberAmount.replaceAll(/,/g,''));
    }
    return numberAmount;
};

module.exports = convertStringToNumber;