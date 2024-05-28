let id = urlParams.get ('id');
const conversa = users [id].conversa;

let responderTo = null;

function nome () {
    document.write (users [id].nome);
}

function visto () {
    document.write ('VISTO POR ÚLTIMO ÀS ' + users [id].visto);
}

function foto () {
    document.write ('<img width="60px" src="' + users [id].foto +'"/>');
}

let arquivoMenuAberto = false;
function abrirMenuArquivo () {
    if (arquivoMenuAberto == true) return;
    arquivoMenuAberto = true;
    fecharDigitarMensagem ();
    document.getElementById ("menu-arquivo").style.display = 'block';
    computarSizes ();
    // document.getElementById ("espaco-interacao").classList.add ('espaco-interacao-opened');
    // document.getElementById ('conversa').classList.add ('conversa-opened');
    // document.getElementById ('icone-microfone').classList.add ('microfone-arquivo-aberto');
}

function fecharMenuArquivo () {
    if (arquivoMenuAberto == false) return;
    arquivoMenuAberto = false;
    document.getElementById ("menu-arquivo").style.display = 'none';
    computarSizes ();
    // document.getElementById ("menu-arquivo").classList.remove ('menu-open');
    // document.getElementById ("espaco-interacao").classList.remove ('espaco-interacao-opened');
    // document.getElementById ('conversa').classList.remove ('conversa-opened');
    // document.getElementById ('icone-microfone').classList.remove ('microfone-arquivo-aberto');
}

let digitarMesagemAberto = false;
function abrirDigitarMensagem () {
    if (digitarMesagemAberto == true) return;
    digitarMesagemAberto = true;
    fecharMenuArquivo ();
    document.getElementById ("espaco-interacao").style.display = 'none';
    document.getElementById ("espaco-digitacao").style.display = 'flex';
    document.getElementById ('digitacao-input').focus ();
    document.getElementById ('icone-microfone').style.display = 'none';
}

function fecharDigitarMensagem () {
    if (digitarMesagemAberto == false) return;
    digitarMesagemAberto = false;
    document.getElementById ("espaco-interacao").style.display = 'flex';
    document.getElementById ("espaco-digitacao").style.display = 'none';
    document.getElementById ('icone-microfone').style.display = 'flex';
}

let ignoreClose = false;
function closeAll () {
    if (!ignoreClose) {
        fecharMenuArquivo ();
        fecharDigitarMensagem ();
    }
    ignoreClose = false;
}

function responder () {
    // menuInteracao ('mensagem');
    responderTo = selecionados [0].msg.mess_id;
    document.getElementById ('resp-ancora-int').innerHTML = respostaA (selecionados [0].msg);
    document.getElementById ('resp-ancora').innerHTML = respostaA (selecionados [0].msg);
    clearSelecao ();
}

function clearResponder () {
    responderTo = null;
    document.getElementById ('resp-ancora-int').innerHTML = '';
    document.getElementById ('resp-ancora').innerHTML = '';
}

function menu (item) {
    if (item == 'voltar') execComBckFeedback ('voltar', '#81B8B2', () => {window.location = 'chat.html';});
    else if (item == 'perfil') execComBckFeedback ('perfil', '#81B8B2', naoImplementado);
    else if (item == 'visio') execComBckFeedback ('visio', '#81B8B2', naoImplementado);
    else if (item == 'fone') execComBckFeedback ('fone', '#81B8B2', naoImplementado);
    else if (item == 'outros') execComBckFeedback ('outros', '#81B8B2', naoImplementado);
}

function menuSel (item) {
    if (item == 'voltar-sel') execComBckFeedback ('voltar-sel', '#81B8B2', clearSelecao);
    else if (item == 'responder-sel') execComBckFeedback ('responder-sel', '#81B8B2', responder);
    else if (item == 'favoritar-sel') execComBckFeedback ('favoritar-sel', '#81B8B2', naoImplementado);
    else if (item == 'apagar-sel') execComBckFeedback ('apagar-sel', '#81B8B2', removeSelecao);
    else if (item == 'encaminhar-sel') execComBckFeedback ('encaminhar-sel', '#81B8B2', naoImplementado);
    else if (item == 'outros-sel') execComBckFeedback ('outros-sel', '#81B8B2', naoImplementado);
}

function menuArquivo (item) {
    if (item == 'documento') execComBckFeedback ('documento', '#eeeeee', naoImplementado);
    else if (item == 'camera') execComBckFeedback ('camera', '#eeeeee', naoImplementado);
    else if (item == 'galeria') execComBckFeedback ('galeria', '#eeeeee', selImage);
    else if (item == 'audio') execComBckFeedback ('audio', '#eeeeee', naoImplementado);
    else if (item == 'localizacao') execComBckFeedback ('localizacao', '#eeeeee', naoImplementado);
    else if (item == 'pagamento') execComBckFeedback ('pagamento', '#eeeeee', naoImplementado);
    else if (item == 'contato') execComBckFeedback ('contato', '#eeeeee', naoImplementado);
    else if (item == 'enquete') execComBckFeedback ('enquete', '#eeeeee', naoImplementado);
}

function menuInteracao (item) {
    if (item == 'espaco-interacao-emoji') execComBckFeedback ('espaco-interacao-emoji', '#eeeeee', naoImplementado);
    else if (item == 'espaco-interacao-mensagem') execComBckFeedback ('espaco-interacao-mensagem', '#eeeeee', abrirDigitarMensagem);
    else if (item == 'espaco-interacao-arquivo') execComBckFeedback ('espaco-interacao-arquivo', '#81B8B2', abrirMenuArquivo);
    else if (item == 'espaco-interacao-reais') execComBckFeedback ('espaco-interacao-reais', '#eeeeee', naoImplementado);
    else if (item == 'espaco-interacao-camera') execComBckFeedback ('espaco-interacao-camera', '#eeeeee', naoImplementado);
}

function menuApagar (item) {
    if (item == 'apagar-todos') execComBckFeedback ('apagar-todos', '#eeeeee', () => {
        document.getElementById ('menu-apagar').classList.add ('hide');
        apagarSelecao ();
    });
    else if (item == 'apagar-para-mim') execComBckFeedback ('apagar-para-mim', '#eeeeee', () => {
        document.getElementById ('menu-apagar').classList.add ('hide');
        apagarSelecao ();
    });
    else if (item == 'apagar-cancelar') execComBckFeedback ('apagar-cancelar', '#eeeeee', () => {
        document.getElementById ('menu-apagar').classList.add ('hide');
        document.getElementById ('cabecalho-conversa').classList.add ('hide');
        document.getElementById ('cabecalho-conversa-sel').classList.remove ('hide');
    });
}

function selImage () {
    document.getElementById ('image-sel').click ();
}

function imageSelecao (evt) {
    let file = evt.target.files [0];
    if (file) {
        var reader = new FileReader ();
        reader.onload = function () {
            addNovaMensagem ('mimg', reader.result);
            setTimeout (() => {
                fecharMenuArquivo ();    
            }, 100);
        };
        reader.readAsDataURL (file);
    }
}

let refTime = 0;
let selecionado = null;
let selecionados = [];
function manageSelecionados () {
    let isIn = false;
    for (let i = 0; i < selecionados.length; i++) {
        if (selecionados [i] == selecionado) {
            selecionados.splice (i, 1);
            selecionado.style.background = 'none';
            isIn = true;
            break;
        }
    }
    if (!isIn) {
        selecionados.push (selecionado);
        selecionado.style.background = '#dddddd';
    }
    if (selecionados.length > 0) {
        document.getElementById ('cabecalho-conversa').classList.add ('hide');
        document.getElementById ('cabecalho-conversa-sel').classList.remove ('hide');
        document.getElementById ('label-nb-selecionados').textContent = selecionados.length;
    }
    else {
        document.getElementById ('cabecalho-conversa-sel').classList.add ('hide');
        document.getElementById ('cabecalho-conversa').classList.remove ('hide');
    }
    let apagados = false;
    let cvs = users [id].conversa;
    for (var i = 0; i < selecionados.length; i ++) {
        for (let j = cvs.length - 1; j >= 0; j --) {
            if (cvs [j] == selecionados [i].msg) {
                if (cvs [j].apagada == true) {
                    apagados = true;
                    break;
                }
            }
        }
    }
    if (selecionados.length > 1 || apagados) {
        document.getElementById ('responder-sel').style.display = 'none';
        document.getElementById ('encaminhar-sel').style.display = 'none';
    } else {
        document.getElementById ('responder-sel').style.display = 'flex';
        document.getElementById ('encaminhar-sel').style.display = 'flex';
    }
    if (apagados) {
        document.getElementById ('favoritar-sel').style.display = 'none';
    }
    else {
        document.getElementById ('favoritar-sel').style.display = 'flex';
    }
}

function clearSelecao () {
    for (let i = 0; i < selecionados.length; i++) {
        selecionados [i].style.background = 'none';
    }
    selecionados = [];
    document.getElementById ('cabecalho-conversa-sel').classList.add ('hide');
    document.getElementById ('cabecalho-conversa').classList.remove ('hide');
}

function apagarSelecao () {
    let cvs = users [id].conversa;
    for (let i = 0; i < selecionados.length; i++) {
        for (let j = cvs.length - 1; j >= 0; j --) {
            if (cvs [j] == selecionados [i].msg) {
                if (cvs [j].apagada == true) {
                    cvs.splice (j, 1);
                } else {
                    cvs [j].apagada = true;
                }
            }
        }
    }
    selecionados = [];
    criarConversa ();
    usersUpdated ();
}

function removeSelecao () {
    document.getElementById ('cabecalho-conversa-sel').classList.add ('hide');
    document.getElementById ('cabecalho-conversa').classList.remove ('hide');
    let apagados = 0;
    let cvs = users [id].conversa;
    for (let i = 0; i < selecionados.length; i++) {
        for (let j = cvs.length - 1; j >= 0; j --) {
            if (cvs [j] == selecionados [i].msg) {
                if (cvs [j].apagada == true) apagados ++;
            }
        }
    }
    if (apagados != selecionados.length)
        document.getElementById ('menu-apagar').classList.remove ('hide');
    else
        apagarSelecao ();
}

let itemPressed = false;
function itemConversaPress (id, evt) {
    xPressed = evt.x;
    yPressed = evt.y;
    itemPressed = true;
    fecharMenuArquivo ();
    ignoreClose = true;
    refTime = new Date ().getTime ();
    selecionado = document.getElementById ('mess-' + id);
    selecionado.style.background = '#eeeeee';
    setTimeout (itemConversaRelease, 400);
}

let dragging = false;
function itemDragging (evt) {
    var nY = 0;
    if (evt.type == 'touchmove') var nY = evt.targetTouches [0].pageY;
    else nY = evt.x;
    if (!dragging && Math.abs (yPressed - nY) < 20) return;
    document.getElementById ('conversa').scrollBy (0, yPressed - nY);
    yPressed = nY;
    if (itemPressed == false) return;
    dragging = true;
}

function itemConversaRelease () {
    if (dragging) {
        itemPressed = false;
        dragging = false;
        for (let i = 0; i < selecionados.length; i++) {
            if (selecionados [i] == selecionado) {
                selecionado.style.background = '#dddddd';
                return;
            }
        }
        selecionado.style.background = 'none';
        return;
    }
    if (itemPressed == false) return;
    itemPressed = false;
    diff = new Date ().getTime () - refTime; 
    if (diff > 400) {
        manageSelecionados ();
    }
    else {
        if (selecionados.length == 0) {
            selecionado.style.background = 'none';
            fecharDigitarMensagem ();
            fecharMenuArquivo ();
        }
        else {
            manageSelecionados ();
        }
    }
    computarSizes ();
}

function scrollToMsg (messid) {
    if (selecionados.length > 0) return;
    messid = 'mess-' + messid;
    document.getElementById (messid).scrollIntoView ();
}

function respostaA (msg) {
    let container = '';
    let content = '';
    if (msg.tipo == 'txt') {
        content += '    <div class="msg-resp-content">' + msg.content [0] + '</div>';
        if (msg.content.length > 1) {
            content += '    <div class="msg-resp-content">...</div>';
        }
    }
    else if (msg.tipo == 'au') {
        content += '<div style="display:flex;align-items: center">';
        content += '    <img src="assets/img/microfone2.svg">';
        content += '    <span class="ml-5 msg-resp-content">Mensagem de voz (' + msg.content [1] + ')</span>';
        content += '</div>';
    }
    else {
        content += '<img style="touch-action: none;pointer-events:none;" width="50px" src="' + msg.content + '" />';
    }
    if (msg.fluxo == 'out') {
        container += '<div class="msg-resp-out" onclick="scrollToMsg (\'' + msg.mess_id + '\')">';
        container += '    <div class="msg-resp-out-user">Você</div>';
        container += content;
        container += '</div>';
    }
    else {
        container += '<div class="msg-resp-in" onclick="scrollToMsg (\'' + msg.mess_id + '\')">';
        container += '    <div class="msg-resp-in-user">' + users [id].nome + '</div>';
        container += content;
        container += '</div>';
    }
    return container;
}

function criarMsg (msg) {
    let dv = document.createElement ('div');
    dv.id = "mess-" + msg.mess_id;
    dv.msg = msg;
    dv.style.marginLeft = '2px';
    dv.style.marginRight = '2px';
    dv.style.marginTop = '1px';
    dv.style.paddingTop = '3px';
    dv.style.paddingBottom = '3px';
    dv.style.display = 'flex';
    dv.onpointerdown = (event) => {itemConversaPress (msg.mess_id, event);};
    dv.onpointerup = () => {itemConversaRelease (msg.mess_id);};
    dv.ontouchmove = (event) => {itemDragging (event);};
    dv.ondrag = (event) => {itemDragging (event);};
    dv.ondragend = () => {itemConversaRelease (msg.mess_id);};

    arrow = document.createElement ('div');
    arrow.style.minWidth = '20px';
    arrow.style.minHeight = '20px';

    box = document.createElement ('box');
    box.style.borderRadius = '10px';
    box.style.position = 'relative';
    box.style.maxWidth = '300px';

    if (msg.fluxo == 'in') {
        dv.style.justifyContent = 'start';
        box.style.background = 'white';
        arrow.innerHTML = "<img src='assets/img/conversa-in.svg'>";
        dv.appendChild (arrow);
        dv.appendChild (box);
        arrow.style.position = 'relative';
        arrow.style.left = '5px';
    }
    else {
        dv.style.justifyContent = 'end';
        box.style.background = '#E7FFDB';
        arrow.innerHTML = "<img src='assets/img/conversa-out.svg'>";
        dv.appendChild (box);
        dv.appendChild (arrow);
        arrow.style.position = 'relative';
        arrow.style.right = '5px';
    }

    let content = '';
    if (msg.apagada) {
        content += '<div style="display:flex;align-items:center;justify-content:center">';
        content += '    <img src="assets/img/apagado.svg">';
        content += '    <span class="msg-txt ml-10 mr-5" style="color:#666">MESSAGEM APAGADA</span>';
        content += '    <span class="msg-time">' + msg.hora + '</span>';
        content += '</div>';        
        box.style.paddingLeft = '10px';
        box.style.paddingTop = '10px';
        box.style.paddingRight = '10px';
        box.style.paddingBottom = '10px';
    }
    else {
        if (msg.resposta != null) {
            let cvs = users [id].conversa;
            for (let i = 0; i < cvs.length; i ++) {
                if (cvs [i].mess_id == msg.resposta) {
                    content = respostaA (cvs [i]);
                }
            }
        }
        if (msg.tipo == 'txt') {
            for (let i = 0; i < msg.content.length; i++) {
                if (i == msg.content.length - 1) {
                    content += '<div style="display:flex;justify-content: space-between">';
                    content += '    <div class="msg-txt">' + msg.content [i] + '</div>'; 
                    content += '    <div style="display:inline-block">';
                    content += '        <span class="msg-time">' + msg.hora + '</span>';
                    if (msg.fluxo == 'out') {
                    content += '        <span style="margin-left:6px;position:relative; top:9px">';
                    content += '            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">';
                    content += '                <path d="M0 7.73333L5.33588 12.1075L13.9039 1.59017L12.2096 0L5.02763 8.816L1.3635 5.81208L0 7.73333ZM21.7789 1.59017L20.0846 0L12.9195 8.79546L12.0724 8.06804L10.6661 9.95546L13.194 12.128L21.7789 1.59017Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                    content += '            </svg>';
                    content += '        </span>';
                    }
                    content += '    </div>';
                    content += '</div>';
                }
                else {
                    content += '<div style="margin-bottom:12px">';
                    content += '    <span class="msg-txt"">' + msg.content [i] + '</span>';
                    content += '</div>';
                }
            }
            box.style.paddingLeft = '10px';
            box.style.paddingTop = '10px';
            box.style.paddingRight = '10px';
            box.style.paddingBottom = '10px';
            box.style.maxWidth = '80vw';
        }
        else if (msg.tipo == 'au') {
            content += '<div style="display: flex; align-items:center">';
            if (msg.fluxo == 'out') {
                content += '    <span style="border-radius: 20px; background-image:url(\'' + users [id].foto + '\'); background-size: 40px 40px; width:40px; height:40px; display:inline-block"></span>';
                content += '    <img id="play_pause_btn_' + msg.mess_id + '" onclick="swicthPlaying(\'' + msg.mess_id + '\')" src="assets/img/play.svg" style="margin-left: 5px; margin-right: 5px">';
                content += '    <span id="' + msg.mess_id + '"></span>';
            }
            else {
                content += '    <img id="play_pause_btn_' + msg.mess_id + '" onclick="swicthPlaying(\'' + msg.mess_id + '\')" src="assets/img/play.svg" style="margin-right: 5px">';
                content += '    <span id="' + msg.mess_id + '"></span>';
                content += '    <span style="border-radius: 20px; background-image:url(\'' + users [id].foto +'\'); background-size: 40px 40px; width:40px; height:40px; display:inline-block; margin-left: 5px;"></span>';
            }
            content += '</div>';
            content += '<div style="display: flex; justify-content: space-between; width:220px; position:relative; top: -8px;">';
            content += '    <span class="msg-time">' + msg.content [1] + '</span>';
            
            if (msg.fluxo == 'out') {
                content += '    <div style="position:relative; top:-7px; left:5px">';
                content += '        <span class="msg-time">' + msg.hora + '</span>';
                content += '            <span style="position:relative; top:12px">';
                content += '                <svg width="22" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">';
                content += '                    <path d="M0 7.73333L5.33588 12.1075L13.9039 1.59017L12.2096 0L5.02763 8.816L1.3635 5.81208L0 7.73333ZM21.7789 1.59017L20.0846 0L12.9195 8.79546L12.0724 8.06804L10.6661 9.95546L13.194 12.128L21.7789 1.59017Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                content += '                </svg>';
                content += '            </span>';
            }
            else {
                content += '    <div>';
                content += '        <span class="msg-time">' + msg.hora + '</span>';
            }
            content += '    </div>';
            content += '</div>';
            if (msg.tipo == 'au') {
                setTimeout (() => createPlayer (msg.mess_id, msg.content [0]), 100);
            }
            box.style.paddingLeft = '10px';
            box.style.paddingTop = '5px';
            box.style.paddingRight = '10px';
            box.style.paddingBottom = '5px';
            box.style.maxWidth = '230px';
        }
        else if (msg.tipo == 'img' || msg.tipo == 'mimg') {
            content += '<img width="200px" src="' + msg.content + '" />';
            if (msg.fluxo == 'out') {
                content += '<span class="msg-img-time-out">' + msg.hora + '</span>';
                content += '<span class="msg-img-lido-out">';
                content += '    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">';
                content += '        <path d="M0 7.73333L5.33588 12.1075L13.9039 1.59017L12.2096 0L5.02763 8.816L1.3635 5.81208L0 7.73333ZM21.7789 1.59017L20.0846 0L12.9195 8.79546L12.0724 8.06804L10.6661 9.95546L13.194 12.128L21.7789 1.59017Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                content += '    </svg>';
                content += '</span>';
            } else {
                content += '<span class="msg-img-time-in">' + msg.hora + '</span>';
            }
            box.style.paddingLeft = '5px';
            box.style.paddingTop = '5px';
            box.style.paddingRight = '5px';
            box.style.paddingBottom = '5px';
        }
    }
    box.innerHTML = content;
    return dv;
}

function criarConversa () {
    const cv = users [id].conversa;
    const conv = document.getElementById ('conversa');
    conv.innerHTML = '';
    for (let i = 0; i < cv.length; i ++) {
        const msg = cv [i];
        const el = criarMsg (msg);
        conv.appendChild (el);
    }
    setTimeout (() => {
        conv.scroll (0, conv.scrollHeight);
    }, 100);
}

function addNovaMensagem (tipo, content) {
    let now = new Date ();
    const day = now.getDay () < 10 ? '0' + now.getDay () : now.getDay ();
    const month = now.getMonth () < 10 ? '0' + now.getMonth () : now.getMonth ();
    const minutes = now.getMinutes () < 10 ? '0' + now.getMinutes () : now.getMinutes ();
    let stamp = 'i_' + new Date ().getTime ();
    let msg = {
        'mess_id' : stamp,
        'fluxo': 'out',
        'tipo': tipo,
        'content': content,
        'dia': day + '/' + month + '/' + now.getFullYear (),
        'hora': now.getHours () + ':' + minutes,
        'lida': false,
        'apagada': false,
        'resposta' : responderTo
    };
    clearResponder ();
    users [id].conversa.push (msg);
    users [id].timestamp = new Date ().getTime ();
    usersUpdated ();
    const conv = document.getElementById ('conversa');
    conv.appendChild (criarMsg (msg));
    setTimeout (() => {
        conv.scroll (0, conv.scrollHeight);
    }, 100);
    fecharDigitarMensagem ();
}

function enviar () {
    console.log('Entrei aqui');
    let el = document.getElementById ('digitacao-input');
    const conv = document.getElementById ('conversa');
    let cnt = el.innerHTML;
    cnt = cnt.split ("<br>");
    el.innerHTML = '';
    if (cnt.length == 0) {
        fecharDigitarMensagem ();
        return;
    }
    for (let i = cnt.length - 1; i >= 0; i --) {
        if (cnt [i] == '' || cnt [i] == ' ') cnt.splice (i, 1);
        else {
            break;
        }
    }
    if (cnt.length == 0) {
        fecharDigitarMensagem ();
        return;
    }
    addNovaMensagem ('txt', cnt);
}

function criarAudio (data, time) {
    addNovaMensagem ('au', [data, time]);
}

let xPressed = 0;
let yPressed = 0;
function abrirMicrofone (event) {
    fecharMenuArquivo ();
    xPressed = event.x;
    yPressed = event.y;
    let mic = document.getElementById ('icone-microfone');
    document.getElementById ('audio-unlock').classList.remove ('hide');
    startRec ();
}

function fecharMicrofone () {
    if (locked) return;
    let mic = document.getElementById ('icone-microfone');
    document.getElementById ('audio-unlock').classList.add ('hide');
    document.getElementById ('duracao-unlock').innerHTML = '00:00';
    document.getElementById ('duracao-lock').innerHTML = '00:00';
    stopRec ();
}

let locked = false;
let descartar = false;
function lock () {
    locked = true;
    if (!recording) switchPlayPauseRecorder ();
    document.getElementById ('audio-unlock').classList.add ('hide');
    document.getElementById ('audio-lock').classList.remove ('hide');
}

function drag (x, y) {
    if (x == 0 || y == 0) return;
    let dx = xPressed - x;
    let dy = yPressed - y;
    if (dx > dy) {
        if (dx > 150) {
            descartar = true;
            fecharMicrofone ();
        }
    }
    else {
        if (dy > 120) lock ();
    }
}

function toucheMove (event) {
    var touchLocation = event.targetTouches [0];
    drag (touchLocation.pageX, touchLocation.pageY);
}

function dragEvt (event) {
    drag (event.x, event.y);
} 

function dragEnd (event) {
    if (!locked) fecharMicrofone ();
}

function descartarAudio () {
    descartar = true;
    stopRec ();
}

function enviarAudio () {
    stopRec ();
}

stopRecordingAction = (data, time) => {
    if (time > 1000 && !descartar) {
        criarAudio (data, formatTime (time));
    }
    descartar = false;
    locked = false;
    document.getElementById ('audio-unlock').classList.add ('hide');
    document.getElementById ('audio-lock').classList.add ('hide');
    let mic = document.getElementById ('icone-microfone');
    mic.classList.remove ('microfone-aberto');
    mic.classList.add ('microfone-fechado');
}

sampleRecordingAction = (chunks, time) => {
    const blob = new Blob (chunks, {type: 'audio/ogg; code=opus'});
    audios ['waves'].loadBlob (blob);
    document.getElementById ('duracao-unlock').innerHTML = formatTime (time);
    document.getElementById ('duracao-lock').innerHTML = formatTime (time);
}

let recording = true;
function switchPlayPauseRecorder () {
    if (recording) {
        document.getElementById ('recorder-action-icone').src = 'assets/img/gravar.svg';    
        document.getElementById ('recorder-action-label').innerHTML = 'GRAVAR';
        pauseRec ();
        recording = false;
    }
    else {
        resumeRec ();
        document.getElementById ('recorder-action-icone').src = 'assets/img/pause2.svg';
        document.getElementById ('recorder-action-label').innerHTML = 'PAUSAR';
        recording = true;
    }
}

function computarSizes () {
    // document.getElementById ('body').style.width = 'calc(' + window.visualViewport.width + 'px)';
    // document.getElementById ('body').style.maxWidth = 'calc(' + window.visualViewport.width + 'px)';
    document.getElementById ('body').style.height = 'calc(' + window.visualViewport.height + 'px)';
    document.getElementById ('body').style.maxHeight = 'calc(' + window.visualViewport.height + 'px)';
    // document.getElementById ('tela').style.width = 'calc(' + window.visualViewport.width + 'px)';
    // document.getElementById ('tela').style.maxWidth = 'calc(' + window.visualViewport.width + 'px)';
    document.getElementById ('tela').style.height = 'calc(' + window.visualViewport.height + 'px)';
    document.getElementById ('tela').style.maxHeight = 'calc(' + window.visualViewport.height + 'px)';
    if (arquivoMenuAberto) {
        document.getElementById ('conversa').style.height = 'calc(' + window.visualViewport.height + 'px - 335px)';
        document.getElementById ('conversa').style.maxHeight = 'calc(' + window.visualViewport.height + 'px - 335px)';
    }
    else {
        document.getElementById ('conversa').style.height = 'calc(' + window.visualViewport.height + 'px - 140px)';
        document.getElementById ('conversa').style.maxHeight = 'calc(' + window.visualViewport.height + 'px - 140px)';
    }
    // document.getElementById ('conversa').style.maxWidth = 'calc(' + window.visualViewport.width + 'px)';
    // document.getElementById ('espaco-interacao-mensagem').style.maxWidth = 'calc(' + window.visualViewport.width + 'px - 300px)';
    // document.getElementById ('espaco-interacao-mensagem').style.width = 'calc(' + window.visualViewport.width + 'px - 300px)';
    // document.getElementById ('espaco-interacao').style.width = 'calc(' + window.visualViewport.width + 'px - 40px)';
    // document.getElementById ('div-audio-unlocked').style.top = 'calc(' + window.visualViewport.height + 'px - 50px)';
    // document.getElementById ('div-audio-tolock').style.top = 'calc(' + window.visualViewport.height + 'px - 160px)';
    // document.getElementById ('label-control-audio').style.top = 'calc(' + window.visualViewport.height + 'px - 239px)';
    // document.getElementById ('audio-lock').style.top = 'calc(' + window.visualViewport.height + 'px - 120px)';
    // loggar(window.visualViewport.width)  
    setTimeout (() => {document.getElementById ('cabecalho').scrollIntoView ();}, 1000);
}

window.addEventListener ('load', () => {
    criarConversa ();
    setTimeout (() => {createPlayer ('waves', 'assets/audio/audio.ogg', 250, 50, false);}, 100);
    computarSizes ();
});

window.addEventListener ('resize', () => {
    computarSizes ();    
});