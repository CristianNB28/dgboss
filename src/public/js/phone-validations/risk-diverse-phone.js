var telefono_riesgo_diverso = document.getElementById('telefono_riesgo_diverso');
telefono_riesgo_diverso.addEventListener('keyup', function(){
    var phoneValue = telefono_riesgo_diverso.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    telefono_riesgo_diverso.value = output;
});