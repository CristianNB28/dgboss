var telefono_aseguradora = document.getElementById('telefono_aseguradora');
telefono_aseguradora.addEventListener('keyup', function(){
    var phoneValue = telefono_aseguradora.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    telefono_aseguradora.value = output;
});