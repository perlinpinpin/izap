
function abrirConversa (evt, id) {
    var svgobj = document.getElementById ('contato-' + id);
    svgobj.style.backgroundColor = '#eeeeee';
    setTimeout (() => {
        svgobj.style.backgroundColor = '#ffffff';
        window.location = 'conversa.html?id=' + id;
    }, 150);
}

function lista_contatos_html () {
    let content = '';
    for (let index = 0; index < 5; index++) {
    for (let i = 0; i < users.length; i++) {
        const u = users [i];
        content += '<div id="contato-' + u.id + '" onclick="abrirConversa(event,' + u.id + ')"  class="menu-item">';
        content += '    <div class="menu-icone"><img src="' + u.foto + '" width="50" height="50" style="border-radius:50px"></div>'
        content += '    <div>'
        content += '        <div class="nome">' + u.nome_expandido + '</div>'
        content += '        <div class="status">' + u.status + '</div>'
        content += '    </div>'
        content += '</div>'
    }
    }
    document.write (content);
}

function menu (item) {
    if (item == 'voltar') execComBckFeedback ('voltar', "#81B8B2", () => {window.location = 'chat.html'});
    else if (item == 'search') execComBckFeedback ('search', "#81B8B2", naoImplementado);
    else if (item == 'outros') execComBckFeedback ('outros', "#81B8B2", naoImplementado);
    else if (item == 'novo-grupo') execComBckFeedback ('novo-grupo', "#eee", naoImplementado);
    else if (item == 'novo-contato') execComBckFeedback ('novo-contato', "#eee", naoImplementado);
    else if (item == 'nova-comunidade') execComBckFeedback ('nova-comunidade', "#eee", naoImplementado);
    else if (item == 'empresas') execComBckFeedback ('empresas', "#eee", naoImplementado);
}