
let selecionados = [];

function encaminharLista () {
    let lista = '';
    for (let i = 0; i < selecionados.length; i++) {
        const id = selecionados [i];
        for (let j = 0; j < users.length; j++) {
            const u = users [j];
            if (u.id == id) {
                if (lista != '') lista += ', ';
                lista += u.nome;
            }
        }        
    }
    document.getElementById ('nome-selecionados').innerHTML = lista;
}

function encaminhar () {
    let msgs = JSON.parse (sessionStorage.getItem ('encaminhar')).msgs;
    let now = new Date ();
    const day = now.getDay () < 10 ? '0' + now.getDay () : now.getDay ();
    const month = now.getMonth () < 10 ? '0' + now.getMonth () : now.getMonth ();
    const minutes = now.getMinutes () < 10 ? '0' + now.getMinutes () : now.getMinutes ();
    let stamp = 'i_' + new Date ().getTime ();
    for (let i = 0; i < msgs.length; i++) {
        msgs [i].mess_id = stamp + '_' + i;
        msgs [i].fluxo = 'out';
        msgs [i].dia =  day + '/' + month + '/' + now.getFullYear ();
        msgs [i].hora = now.getHours () + ':' + minutes;
        msgs [i].lida = false;
        msgs [i].apagada = false;
        msgs [i].resposta = null;
        msgs [i].encaminhada = true;
    }
    for (let i = 0; i < selecionados.length; i++) {
        const id = selecionados [i];
        for (let j = 0; j < users.length; j++) {
            const u = users [j];
            if (u.id == id) {
                for (let i = 0; i < msgs.length; i++) {
                    u.conversa.push (msgs [i]);
                }
                usersUpdated ();
            }
        }        
    }
    if (selecionados.length == 1) {
        // 1 selecionado vai para a conversa do selecionado
        window.location = 'conversa.html?id=' + selecionados [0];
    }
    else {
        // vários selecionados volta para a conversa original
        window.location = 'conversa.html?id=' + JSON.parse (sessionStorage.getItem ('encaminhar')).from;
    }
}

function selecionarUsuario (contato, id) {
    for (let i = 0; i < selecionados.length; i++) {
        const s = selecionados [i];
        if (s == id) {
            contato.style.backgroundColor = '#f8f8f8';
            selecionados.splice (i, 1);
            encaminharLista ();
            document.getElementById ('lista-selecionados').style.display = selecionados.length == 0 ? 'none' : 'flex';
            return;
        }
    }
    contato.style.backgroundColor = '#dddddd';
    selecionados.push (id);
    document.getElementById ('lista-selecionados').style.display = selecionados.length == 0 ? 'none' : 'flex';
    encaminharLista ();
}

function lista_contatos_html (frequente) {
    let content = '';
    let usr = getUsersByTimeStamp ();
    for (let i = 0; i < usr.length; i++) {
        const u = usr [i];
        if (u.frequente == frequente) {
            content += '<div id="contato-' + u.id + '" onclick="selecionarUsuario(this,' + u.id + ')"  class="contato-item">';
            content += '    <div class="contato-icone">';
            content += '        <div class="icone" style="background-image: url(' + u.foto + ')" ></div>';
            content += '    </div>';
            content += '    <div class="contato-detalhes">';
            content += '        <div class="nome">' + u.nome_expandido + '</div>';
            content += '        <div class="status">' + u.status + '</div>';
            content += '    </div>';
            content += '</div>';
        }
    }
    document.write (content);
}

function voltar () {
    let msgs = JSON.parse (sessionStorage.getItem ('encaminhar'));
    window.location = 'conversa.html?id=' + msgs.from;
}

function menu (item) {
    if (item == 'voltar') execComBckFeedback ('voltar', "#81B8B2", voltar);
    else if (item == 'search') execComBckFeedback ('search', "#81B8B2", naoImplementado);
    else if (item == 'outros') execComBckFeedback ('outros', "#81B8B2", naoImplementado);
    else if (item == 'novo-grupo') execComBckFeedback ('novo-grupo', "#eee", naoImplementado);
    else if (item == 'novo-contato') execComBckFeedback ('novo-contato', "#eee", naoImplementado);
    else if (item == 'nova-comunidade') execComBckFeedback ('nova-comunidade', "#eee", naoImplementado);
    else if (item == 'empresas') execComBckFeedback ('empresas', "#eee", naoImplementado);
}