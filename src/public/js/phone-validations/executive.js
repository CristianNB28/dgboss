var celular_ejecutivo = document.getElementById('celular_ejecutivo');
celular_ejecutivo.addEventListener('keyup', function(){
    var phoneValue = celular_ejecutivo.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    celular_ejecutivo.value = output;
});