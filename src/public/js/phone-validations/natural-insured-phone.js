var telefono_asegurado_per_nat = document.getElementById('telefono_asegurado_per_nat');
telefono_asegurado_per_nat.addEventListener('keyup', function(){
    var phoneValue = telefono_asegurado_per_nat.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    telefono_asegurado_per_nat.value = output;
});