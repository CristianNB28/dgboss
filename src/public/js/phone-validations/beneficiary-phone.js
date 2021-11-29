var telefono_beneficiario = document.getElementById('telefono_beneficiario');
telefono_beneficiario.addEventListener('keyup', function(){
    var phoneValue = telefono_beneficiario.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    telefono_beneficiario.value = output;
});