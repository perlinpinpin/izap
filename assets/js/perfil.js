let voltar = urlParams.get ('voltar');

if (voltar == null) {
    voltar = 'configuracoes';
}

function menu (item) {
    if (item == 'voltar') execComBckFeedback ('voltar', '#81B8B2', () => {window.location = voltar + '.html';});
    else if (item == 'search') execComBckFeedback ('search', '#eee', () => {window.location = 'editar_foto.html';});
    else if (item == 'trocar-foto') execComBckFeedback ('trocar-foto', '#eee', () => {window.location = 'editar_foto.html';});
    else if (item == 'usuario') execComBckFeedback ('usuario', '#eee', naoImplementado);
    else if (item == 'recado') execComBckFeedback ('recado', '#eee', naoImplementado);
    else if (item == 'telefone') execComBckFeedback ('telefone', '#eee', naoImplementado);
}