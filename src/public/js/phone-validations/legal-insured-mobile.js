var celular_asegurado_per_jur = document.getElementById('celular_asegurado_per_jur');
celular_asegurado_per_jur.addEventListener('keyup', function(){
    var phoneValue = celular_asegurado_per_jur.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    celular_asegurado_per_jur.value = output;
});