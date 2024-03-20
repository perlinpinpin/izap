let voltar = urlParams.get ('voltar');

if (voltar == null) {
    voltar = 'perfil';
}

function menu (item) {
    if (item == 'voltar') execComBckFeedback ('voltar', '#81B8B2', () => {window.location = voltar + '.html';});
    else if (item == 'edit') execComBckFeedback ('edit', '#81B8B2', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'search') execComBckFeedback ('search', '#81B8B2', naoImplementado);
    else if (item == 'foto') execComBckFeedback ('foto', '#81B8B2', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'camera') execComBckFeedback ('camera', '#81B8B2', () => {document.getElementById ('capture-sel').click ();});
    else if (item == 'galeria') execComBckFeedback ('galeria', '#81B8B2', () => {document.getElementById ('image-sel').click ();});
    else if (item == 'avatar') execComBckFeedback ('avatar', '#81B8B2', naoImplementado);
    else if (item == 'apagar') execComBckFeedback ('apagar', '#81B8B2', naoImplementado);
}

function selecao (evt) {
    let file = evt.target.files [0];
    if (file) {
        const reader = new FileReader ();
        reader.onload = () => {
            document.getElementById ('foto').src = reader.result;
            users [0].foto = reader.result;
            usersUpdated ();
        }
        reader.readAsDataURL (file);
    }
}
