$(document).ready(function () {
    "use strict";

    // This event allow users' connection by simply Enter
    $('#password').keypress(function(e) {
        if (e.keyCode === 13) {
            $("#identification").click();
        }
    });
    
    // When the user click on the login button
    $("#identification").click(function (e) {
        e.preventDefault();
        sessionStorage.setItem('identifiant', $('#identifiant').val());
        $.post('/login', {
            identifiant: $('#identifiant').val(),
            password: $('#password').val()
        }).done(function (result) {
            if (result.rejected) {
                $('#loginFailed').text('Login failed: Wrong user or/and password');
            }else {
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('isMaster', result.isMaster);
                $.ajax({
                  type: "GET",
                  cache: false,
                  dataType: "html",
                  url: "/index.html",              
                  headers: {token: result.token},
                  success: function(data) {
                    if (data) {
                        $('body').html(data);
                    }
                  }
                });
            }
        });
    });
});

//  Allow to forbid special characters for the pseudo
function special_caract(evt) {
    "use strict";
    var keyCode = evt.which ? evt.which : evt.keyCode;
    if (keyCode === 9) {
        return true;
    }
    var interdit = 'ààâäãçéèêëìîïòôöõµùûüñ &\?!:\.;,\t#~"^¨@%\$£?²¤§%\*()[]{}-_=+<>|\\/`\'';
    if (interdit.indexOf(String.fromCharCode(keyCode)) >= 0) {
        return false;
    }
}