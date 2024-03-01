let voltar = urlParams.get ('voltar');

if (voltar == null) {
    voltar = 'configuracoes';
}

function menu (item) {
    if (item == 'voltar') execComOpacityFeedback ('voltar-bck', () => {window.location = voltar + '.html';});
    else if (item == 'foto') execComOpacityFeedback ('foto-bck', () => {window.location = 'editar_foto.html';});
    else if (item == 'nome') execComOpacityFeedback ('nome-bck', naoImplementado);
    else if (item == 'status') execComOpacityFeedback ('status-bck', naoImplementado);
    else if (item == 'telefone') execComOpacityFeedback ('telefone-bck', naoImplementado);
}