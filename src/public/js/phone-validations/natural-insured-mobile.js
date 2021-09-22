var celular_per_nat = document.getElementById('celular_per_nat');
celular_per_nat.addEventListener('keyup', function(){
    var phoneValue = celular_per_nat.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    celular_per_nat.value = output;
});