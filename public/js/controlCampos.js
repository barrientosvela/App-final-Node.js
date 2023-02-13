const apeExp = new RegExp("^[a-zA-Z ]{4,50}$");

var valido = 0;

$("#nombre").blur(() => {
    let nombre = $("#nombre");
    let Nval = nombre.val();

    if (!nombreExp.test(Nval)) {
        nombre.removeClass('is-valid');
        nombre.addClass('is-invalid');
    } else {
        nombre.removeClass('is-invalid');
        nombre.addClass('is-valid');
        valido++;
    }
});