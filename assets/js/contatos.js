
function abrirConversa (evt, id) {
    var svgobj = document.getElementById ('conversa-' + id);
    svgobj.style.fill = '#eeeeee';
    setTimeout (() => {
        svgobj.style.fill = '#ffffff';
        window.location = 'conversa.html?id=' + id;
    }, 150);
}

function lista_contatos_defs () {
    let defs = '';
    for (let i = 0; i < users.length; i++) {
        const u = users [i];
        defs += '<pattern id="pattern' + u.id + '" patternContentUnits="objectBoundingBox" width="1" height="1">';
        defs += '   <use xlink:href="#image' + u.id + '" transform="matrix(0.003125 0 0 0.00445602 0 -0.212963)"/>';
        defs += '</pattern>';
        defs += '<image id="image' + u.id + '" width="320" height="320" xlink:href="' + u.foto + '"/>';
        defs += '<clipPath id="clip-foto">';
        defs += '   <ellipse rx="27" ry="27" cx="45" cy="443" fill="white"/>';
        defs += '</clipPath>';
    }
    document.write (defs);
}

function lista_contatos_svg () {
    let trans = 0;
    let svg = '';
    for (let i = 0; i < users.length; i++) {
        const u = users [i];
        svg += '<g id="contato-' + u.id + '" onclick="abrirConversa(evt,' + u.id + ')" transform="translate(0,'+ trans + ')">';
        svg += '    <rect id="conversa-' + u.id + '" x="0" y="410" width="420" height="60" fill="#ffffff"/>';
        svg += '    <rect x="8" y="416" width="74" height="54" fill="url(#pattern' + u.id + ')" clip-path="url(#clip-foto)"/>';
        svg += '    <text x="82" y="442" class="nome">' + u.nome_expandido + '</text>';
        svg += '    <text x="82" y="462" class="status">' + u.status + '</text>';
        svg += '</g>';
        trans += 60;
    }
    document.write (svg);
}

function menu (item) {
    if (item == 'voltar') execComOpacityFeedback ('voltar-bck', () => {window.location = 'chat.html'});
    else if (item == 'search') execComOpacityFeedback ('search-bck', naoImplementado);
    else if (item == 'outros') execComOpacityFeedback ('outros-bck', naoImplementado);
    else if (item == 'novo-grupo') execComOpacityFeedback ('novo-grupo-bck', naoImplementado);
    else if (item == 'novo-contato') execComOpacityFeedback ('novo-contato-bck', naoImplementado);
    else if (item == 'nova-comunidade') execComOpacityFeedback ('nova-comunidade-bck', naoImplementado);
    else if (item == 'empresas') execComOpacityFeedback ('empresas-bck', naoImplementado);
}