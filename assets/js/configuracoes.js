function  menu (item) {
    console.log(item);
    if (item == 'voltar') execComOpacityFeedback ('voltar-bck', () => {window.location = "chat.html";});
    else if (item == 'usuario') execComOpacityFeedback ('usuario-bck', () => {window.location = "perfil.html";});
    else if (item == 'conta') execComOpacityFeedback ('conta-bck', naoImplementado);
    else if (item == 'privacidade') execComOpacityFeedback ('privacidade-bck', naoImplementado);
    else if (item == 'avatar') execComOpacityFeedback ('avatar-bck', naoImplementado);
    else if (item == 'conversas') execComOpacityFeedback ('conversas-bck', naoImplementado);
    else if (item == 'notificacoes') execComOpacityFeedback ('notificacoes-bck', naoImplementado);
    else if (item == 'armazenamento') execComOpacityFeedback ('armazenamento-bck', naoImplementado);
    else if (item == 'idioma') execComOpacityFeedback ('idioma-bck', naoImplementado);
    else if (item == 'ajuda') execComOpacityFeedback ('ajuda-bck', naoImplementado);
    else if (item == 'convidar') execComOpacityFeedback ('convidar-bck', naoImplementado);
    else if (item == 'trocar-foto') execComOpacityFeedback ('trocar-foto-bck', () => {window.location = "editar_foto.html?voltar=configuracoes";});
}