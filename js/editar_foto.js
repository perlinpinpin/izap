let voltar = urlParams.get ('voltar');

if (voltar == null) {
    voltar = 'perfil';
}

function menu (item) {
    if (item == 'voltar') execComOpacityFeedback ('voltar-bck', () => {window.location = voltar + '.html';});
    else if (item == 'edit') execComOpacityFeedback ('edit-bck', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'search') execComOpacityFeedback ('search-bck', naoImplementado);
    else if (item == 'foto') execComOpacityFeedback ('foto-bck', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'camera') execComOpacityFeedback ('camera-bck', () => {document.getElementById ('capture-sel').click ();});
    else if (item == 'galeria') execComOpacityFeedback ('galeria-bck', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'avatar') execComOpacityFeedback ('avatar-bck', naoImplementado);
    else if (item == 'deletar') execComOpacityFeedback ('deletar-bck', naoImplementado);
}

function selecao (evt) {
    let file = evt.target.files [0];
    if (file) {
        const reader = new FileReader ();
        reader.onload = () => {
            document.getElementById ('image0').href.baseVal = reader.result;
            users [0].foto = reader.result;
            usersUpdated ();
        }
        reader.readAsDataURL (file);
    }
}
