var celular_agente_propio = document.getElementById('celular_agente_propio');
celular_agente_propio.addEventListener('keyup', function(){
    var phoneValue = celular_agente_propio.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    celular_agente_propio.value = output;
});