function  menu (item, event) {
    if (event !== undefined && event.target.id == 'trocar-foto') {
        item = 'trocar-foto';
    }
    if (item == 'voltar') execComBckFeedback ('voltar', '#81B8B2', () => {window.location = "chat.html";});
    else if (item == 'search') execComBckFeedback ('search', '#81B8B2', naoImplementado);
    else if (item == 'usuario') execComBckFeedback ('usuario', '#eee', () => {window.location = "perfil.html";});
    else if (item == 'conta') execComBckFeedback ('conta', '#eee', naoImplementado);
    else if (item == 'privacidade') execComBckFeedback ('privacidade', '#eee', naoImplementado);
    else if (item == 'avatar') execComBckFeedback ('avatar', '#eee', naoImplementado);
    else if (item == 'conversas') execComBckFeedback ('conversas', '#eee', naoImplementado);
    else if (item == 'notificacoes') execComBckFeedback ('notificacoes', '#eee', naoImplementado);
    else if (item == 'armazenamento') execComBckFeedback ('armazenamento', '#eee', naoImplementado);
    else if (item == 'idioma') execComBckFeedback ('idioma', '#eee', naoImplementado);
    else if (item == 'ajuda') execComBckFeedback ('ajuda', '#eee', naoImplementado);
    else if (item == 'convidar') execComBckFeedback ('convidar', '#eee', naoImplementado);
    else if (item == 'trocar-foto') execComBckFeedback ('trocar-foto', '#eee', () => {window.location = "editar_foto.html?voltar=configuracoes";});
}