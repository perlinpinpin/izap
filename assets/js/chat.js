let refTime = 0;
let selecionados = [];
let selecionado = null;

let longPressDelay = 400;

function openSelecionadoMenu () {
    document.getElementById ('menu-selecionado').style.display = 'flex';
    document.getElementById ('menu-nao-selecionado').style.display = 'none';
}

function closeSelecionadoMenu () {
    document.getElementById ('menu-selecionado').style.display = 'none';
    document.getElementById ('menu-nao-selecionado').style.display = 'flex';
}

function manageSelecionados () {
    let isIn = false;
    for (let i = 0; i < selecionados.length; i++) {
        if (selecionados [i] == selecionado) {
            selecionados.splice (i, 1);
            selecionado.style.backgroundColor = '#F9F9F9';   
            isIn = true;
            break;
        }
    }
    if (!isIn) {
        selecionados.push (selecionado);
        selecionado.style.backgroundColor = '#C0C0C0';
    }
    if (selecionados.length == 0) {
        closeSelecionadoMenu ();
    }
    document.getElementById ('sel-nb-selecionados').textContent = selecionados.length;
}

let mousePressed = false;
let timer = null;
function mouseUp (id) {
    if (timer != null) {
        clearTimeout (timer);
        timer = null;
    }
    if (mousePressed == false) return;
    mousePressed = false;
    diff = new Date ().getTime () - refTime; 
    if (diff < longPressDelay) {
        if (selecionados.length == 0) {
            setTimeout (() => {
                selecionado.style.backgroundColor = '#ffffff';
                window.location = 'conversa.html?id=' + id;
            }, 150);
        } else {
            manageSelecionados ();
        }
    }
    else {
        openSelecionadoMenu ();
        manageSelecionados ();
    }
}

function mouseDown (id) {
    mousePressed = true;
    selecionado = document.getElementById ('bck-conversa-' + id);
    refTime = new Date ().getTime ();
    for (let i = 0; i < selecionados.length; i++) {
        if (selecionados [i] == selecionado) return;
    }
    selecionado.style.backgroundColor = '#eeeeee';
    timer = setTimeout (mouseUp, longPressDelay + 1);
}

function chat_html () {
    let trans = 0;
    let content = '';
    let usrs = getUsersByTimeStamp ();
    for (let i = 0; i < usrs.length; i ++) {
        let u = usrs [i];
        let cvs = u.conversa;
        if (cvs.length > 0) {
            let u = usrs [i];
            let msg = cvs [cvs.length - 1];
            content += '<div id="bck-conversa-' + u.id + '" class="msg" onpointerdown="mouseDown(' + u.id + ')" onpointerup="mouseUp(' + u.id + ')">';
            content += '    <div class="fc">';
            content += '        <div>';
            content += '            <img class="foto-msg" src="' + u.foto +'">';
            content += '        </div>';
            content += '        <div>';
            content += '            <div class="nome_chat">'+ u.nome +'</div>';
            content += '            <div class="fc">';
            if (msg.fluxo = 'out') {
            content += '                <img class="mr-5" src="assets/img/' + (msg.lido?'msg-lida':'msg-nao-lida')  + '.svg">';
            }
            if (msg.tipo == 'txt') {
            content += '                <span class="ultimo_chat">' + msg.content [msg.content.length - 1] + '</span>';
            }
            else if (msg.tipo == 'au') {
            content += '                <img class="mr-5" src="assets/img/chat-audio.svg">';
            content += '                <span class="ultimo_chat">' + msg.content [1] + '</span>';
            } 
            else {
            content += '                <img class="mr-5" src="assets/img/chat-foto.svg">';
            content += '                <span class="ultimo_chat">FOTO</span>';
            }
            content += '            </div>';
            content += '        </div>';
            content += '    </div>';
            content += '    <div>';
            content += '        <div class="ultimo_time">' + msg.hora + '</div>';
            content += '    </div>';
            content += '</div>';
        }
    }
    document.getElementById ('conversas').innerHTML = content;
}

function novaConversa (evt) {
    window.location = 'contatos.html';
}

function outros () {
    let arq = document.getElementById ("outros-menu");
    arq.classList.remove ('hide');
}

function closeOutros () {
    let arq = document.getElementById ("outros-menu");
    arq.classList.add ('hide');
}

function clearSelecionados () {
    closeSelecionadoMenu ();
    for (let i = 0; i < selecionados.length; i++) {
        selecionados [i].style.backgroundColor = '#F9F9F9';   
    }
    selecionados = [];
}

function apagarSelecionado () {
    for (let i = 0; i < selecionados.length; i ++) {
        let lid = selecionados [i].id.replace ('bck-conversa-', '');
        users [lid].conversa = [];
    }
    usersUpdated ();
    selecionado = [];
    window.location = 'chat.html';
}

function menu (item) {
    if (item == 'outros') execComBckFeedback ('outros', '#81B8B2', outros);
    else if (item == 'nova-conversa') execComBckFeedback ('nova-conversa', '#81B8B2', novaConversa);
    else if (item == 'voltar') execComBckFeedback ('voltar', '#81B8B2', clearSelecionados);
    else if (item == 'fixar') execComBckFeedback ('fixar', '#81B8B2', naoImplementado);
    else if (item == 'apagar') execComBckFeedback ('apagar', '#81B8B2', apagarSelecionado);
    else if (item == 'silenciar') execComBckFeedback ('silenciar', '#81B8B2', naoImplementado);
    else if (item == 'arquivar') execComBckFeedback ('arquivar', '#81B8B2', naoImplementado);
    else if (item == 'camera') execComBckFeedback ('camera', '#81B8B2', naoImplementado);
    else if (item == 'search') execComBckFeedback ('search', '#81B8B2', naoImplementado);
    else if (item == 'edit-foto') execComBckFeedback ('edit-foto', '#81B8B2', () => {window.location = 'editar_foto.html?voltar=chat'});
    else if (item == 'edit-perfil') execComBckFeedback ('edit-perfil', '#81B8B2', () => {window.location = 'perfil.html?voltar=chat'});
    else if (item == 'edit-conta') execComBckFeedback ('edit-conta', '#81B8B2', () => {window.location = 'configuracoes.html'});
}

function naoImplementadoL () {
    closeOutros ();
    naoImplementado ();
}

function configuracoes () {
    window.location = 'configuracoes.html';
}

function outrosMenu (item) {
    if (item == 'novo-grupo') execComBckFeedback ('novo-grupo', '#eee', naoImplementadoL);
    else if (item == 'nova-transimissao') execComBckFeedback ('nova-transimissao', '#eee', naoImplementadoL);
    else if (item == 'aparelhos-conectados') execComBckFeedback ('aparelhos-conectados', '#eee', naoImplementadoL);
    else if (item == 'mensagens-favoritas') execComBckFeedback ('mensagens-favoritas', '#eee', naoImplementadoL);
    else if (item == 'encontrar-empresas') execComBckFeedback ('encontrar-empresas', '#eee', naoImplementadoL);
    else if (item == 'pagamentos') execComBckFeedback ('pagamentos', '#eee', naoImplementadoL);
    else if (item == 'configuracoes') execComBckFeedback ('configuracoes', '#eee', configuracoes);
    else if (item == 'close') {
        closeOutros ();
    }
}

window.addEventListener ('load', () => {chat_html ()});
