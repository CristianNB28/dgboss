var telefono_usuario = document.getElementById('telefono_usuario');
telefono_usuario.addEventListener('keyup', function(){
    var phoneValue = telefono_usuario.value;
    var output;
    phoneValue = phoneValue.replace(/[^0-9]/g, '');
        var area = phoneValue.substr(0, 4);
        var tel = phoneValue.substr(4, 7);
        if (area.length < 4) {
            output = area;
        } else if (area.length == 4) {
            output = area + "-" + tel;
        }
    telefono_usuario.value = output;
});