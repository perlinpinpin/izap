let refTime = 0;
let selecionados = [];
let selecionado = null;

let longPressDelay = 400;

function openSelecionadoMenu () {
    document.getElementById ('menu-selecionado').classList.remove ('hide');
}

function closeSelecionadoMenu () {
    document.getElementById ('menu-selecionado').classList.add ('hide');
}

function manageSelecionados () {
    let isIn = false;
    for (let i = 0; i < selecionados.length; i++) {
        if (selecionados [i] == selecionado) {
            selecionados.splice (i, 1);
            selecionado.style.fill = '#F9F9F9';   
            isIn = true;
            break;
        }
    }
    if (!isIn) {
        selecionados.push (selecionado);
        selecionado.style.fill = '#C0C0C0';
    }
    if (selecionados.length == 0) {
        closeSelecionadoMenu ();
    }
    document.getElementById ('sel-nb-selecionados').textContent = selecionados.length;
}

let mousePressed = false;
function mouseUp (id) {
    if (mousePressed == false) return;
    mousePressed = false;
    diff = new Date ().getTime () - refTime; 
    if (diff < longPressDelay) {
        if (selecionados.length == 0) {
            setTimeout (() => {
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
    selecionado.style.fill = '#eeeeee';
    setTimeout (mouseUp, longPressDelay + 1);
}

function chat_svg () {
    let trans = 0;
    let svg = '';
    let usrs = getUsersByTimeStamp ();
    for (let i = 0; i < usrs.length; i ++) {
        let u = usrs [i];
        let cvs = u.conversa;
        if (cvs.length > 0) {
            let u = usrs [i];
            let msg = cvs [cvs.length - 1];
            svg += '<g onpointerdown="mouseDown(' + u.id + ')" onpointerup="mouseUp(' + u.id + ')" transform="translate(0,' + trans + ')">';
            svg += '    <rect id="bck-conversa-' + u.id + '" y="147" width="390" height="88" fill="#F9F9F9"/>';
            svg += '    <rect id="foto-' + u.id + '" x="2" y="153" width="100" height="77" fill="url(#pattern' + u.id + ')" clip-path="url(#clip-foto)"/>';
            svg += '    <text x="112" y="184" class="nome_chat">' + u.nome + '</text>';
            if (msg.tipo == 'txt') {
                if (msg.fluxo = 'out') {
                    svg += '    <path id="lida-' + u.id + '" d="M109.693 207.605L115.029 211.979L123.597 201.462L121.903 199.872L114.721 208.688L111.057 205.684L109.693 207.605ZM131.472 201.462L129.778 199.872L122.613 208.667L121.766 207.94L120.359 209.827L122.887 212L131.472 201.462Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                    svg += '    <text x="136" y="212" class="ultimo_chat">' + msg.content [msg.content.length - 1] + '</text>';
                }
                else {
                    svg += '    <text x="112" y="212" class="ultimo_chat">' + msg.content [msg.content.length - 1] + '</text>';
                }
            }
            else if (msg.tipo == 'au') {
                if (msg.fluxo == 'out') {
                    svg += '    <path id="lida-' + u.id + '" d="M109.693 207.605L115.029 211.979L123.597 201.462L121.903 199.872L114.721 208.688L111.057 205.684L109.693 207.605ZM131.472 201.462L129.778 199.872L122.613 208.667L121.766 207.94L120.359 209.827L122.887 212L131.472 201.462Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                    svg += '    <path transform="translate(139,201)"  d="m 3.0910545,7.9233509 v -4.268309 c 0,-0.8492137 0.3688998,-1.6635489 1.0251159,-2.2640642 0.6568071,-0.60051545 1.5471331,-0.93767345 2.4758857,-0.93767345 0.9287529,0 1.8190789,0.337158 2.4752949,0.93767345 0.656807,0.6005153 1.025707,1.4148505 1.025707,2.2640642 v 4.268309 c 0,0.8492136 -0.3689,1.6635494 -1.025707,2.2635591 -0.656216,0.600515 -1.546542,0.937673 -2.4752949,0.937673 -0.9287526,0 -1.8190786,-0.337158 -2.4758857,-0.937673 C 3.4599543,9.5869003 3.0910545,8.7725645 3.0910545,7.9233509 Z m 9.3360045,0 c 0,-0.1415355 -0.06149,-0.277005 -0.170853,-0.3770912 -0.109369,-0.1000856 -0.257756,-0.1566998 -0.412647,-0.1566998 -0.15489,0 -0.303278,0.056614 -0.412647,0.1566998 -0.10937,0.1000862 -0.170853,0.2355557 -0.170853,0.3770912 0,1.1322844 -0.491867,2.2175591 -1.367413,3.0182471 -0.874955,0.800687 -2.062647,1.250062 -3.3005899,1.250062 -1.2379427,0 -2.4256349,-0.449375 -3.3005898,-1.250062 C 2.4159205,10.14091 1.9240539,9.0556353 1.9240539,7.9233509 c 0,-0.1415355 -0.061484,-0.277005 -0.1708526,-0.3770912 C 1.6438319,7.4461741 1.4954443,7.3895599 1.3405536,7.3895599 c -0.1548907,0 -0.3032782,0.056614 -0.41264763,0.1566998 -0.1093694,0.1000862 -0.1708527,0.2355557 -0.1708527,0.3770912 0.00178,1.3223474 0.53975263,2.5971781 1.50988833,3.5778181 0.9695445,0.98064 2.3032596,1.597331 3.7416145,1.731284 v 1.627154 c 0,0.141535 0.061486,0.27751 0.1708527,0.377597 0.1093692,0.100085 0.2577567,0.156194 0.4126473,0.156194 0.1548906,0 0.3032782,-0.05611 0.4126479,-0.156194 0.109369,-0.100087 0.170852,-0.236062 0.170852,-0.377597 v -1.627154 c 1.438356,-0.133953 2.772071,-0.750644 3.741615,-1.731284 0.970136,-0.98064 1.508115,-2.2554707 1.509888,-3.5778181 z" fill="#8E8E8E"/>';
                    svg += '    <text transform="translate(24,0)" class="ultimo_chat" x="138" y="214">' + msg.content [1] + '</text>';
                }
                else {
                    svg += '    <path transform="translate(115,201)" d="m 3.0910545,7.9233509 v -4.268309 c 0,-0.8492137 0.3688998,-1.6635489 1.0251159,-2.2640642 0.6568071,-0.60051545 1.5471331,-0.93767345 2.4758857,-0.93767345 0.9287529,0 1.8190789,0.337158 2.4752949,0.93767345 0.656807,0.6005153 1.025707,1.4148505 1.025707,2.2640642 v 4.268309 c 0,0.8492136 -0.3689,1.6635494 -1.025707,2.2635591 -0.656216,0.600515 -1.546542,0.937673 -2.4752949,0.937673 -0.9287526,0 -1.8190786,-0.337158 -2.4758857,-0.937673 C 3.4599543,9.5869003 3.0910545,8.7725645 3.0910545,7.9233509 Z m 9.3360045,0 c 0,-0.1415355 -0.06149,-0.277005 -0.170853,-0.3770912 -0.109369,-0.1000856 -0.257756,-0.1566998 -0.412647,-0.1566998 -0.15489,0 -0.303278,0.056614 -0.412647,0.1566998 -0.10937,0.1000862 -0.170853,0.2355557 -0.170853,0.3770912 0,1.1322844 -0.491867,2.2175591 -1.367413,3.0182471 -0.874955,0.800687 -2.062647,1.250062 -3.3005899,1.250062 -1.2379427,0 -2.4256349,-0.449375 -3.3005898,-1.250062 C 2.4159205,10.14091 1.9240539,9.0556353 1.9240539,7.9233509 c 0,-0.1415355 -0.061484,-0.277005 -0.1708526,-0.3770912 C 1.6438319,7.4461741 1.4954443,7.3895599 1.3405536,7.3895599 c -0.1548907,0 -0.3032782,0.056614 -0.41264763,0.1566998 -0.1093694,0.1000862 -0.1708527,0.2355557 -0.1708527,0.3770912 0.00178,1.3223474 0.53975263,2.5971781 1.50988833,3.5778181 0.9695445,0.98064 2.3032596,1.597331 3.7416145,1.731284 v 1.627154 c 0,0.141535 0.061486,0.27751 0.1708527,0.377597 0.1093692,0.100085 0.2577567,0.156194 0.4126473,0.156194 0.1548906,0 0.3032782,-0.05611 0.4126479,-0.156194 0.109369,-0.100087 0.170852,-0.236062 0.170852,-0.377597 v -1.627154 c 1.438356,-0.133953 2.772071,-0.750644 3.741615,-1.731284 0.970136,-0.98064 1.508115,-2.2554707 1.509888,-3.5778181 z" fill="#8E8E8E"/>';
                    svg += '    <text class="ultimo_chat" x="136" y="214">' + msg.content [1] + '</text>';
                }
            }
            else {
                if (msg.fluxo == 'out') {
                    svg += '    <path id="lida-' + u.id + '" d="M109.693 207.605L115.029 211.979L123.597 201.462L121.903 199.872L114.721 208.688L111.057 205.684L109.693 207.605ZM131.472 201.462L129.778 199.872L122.613 208.667L121.766 207.94L120.359 209.827L122.887 212L131.472 201.462Z" fill="' + (msg.lido ? '#4fc3f7' : '#999999') + '"/>';
                    svg += '    <path transform="translate(24,0)" d="M134 202.125V214.875C134 215.439 133.684 215.979 133.121 216.378C132.559 216.776 131.796 217 131 217H113C112.204 217 111.441 216.776 110.879 216.378C110.316 215.979 110 215.439 110 214.875V202.125C110 201.561 110.316 201.021 110.879 200.622C111.441 200.224 112.204 200 113 200H131C131.796 200 132.559 200.224 133.121 200.622C133.684 201.021 134 201.561 134 202.125ZM131 202.125H113V208.904L116.285 206.577L124.13 212.134L125.63 211.071C126.086 210.813 126.66 210.682 127.244 210.703C127.827 210.725 128.379 210.897 128.795 211.188L131 212.75V202.125ZM123.5 205.844C123.5 205.421 123.737 205.016 124.159 204.717C124.581 204.418 125.153 204.25 125.75 204.25C126.347 204.25 126.919 204.418 127.341 204.717C127.763 205.016 128 205.421 128 205.844C128 206.266 127.763 206.672 127.341 206.971C126.919 207.27 126.347 207.438 125.75 207.438C125.153 207.438 124.581 207.27 124.159 206.971C123.737 206.672 123.5 206.266 123.5 205.844Z" fill="#8E8E8E"/>';
                    svg += '    <text transform="translate(24,0)" class="ultimo_chat" x="138" y="214">FOTO</text>';
                }
                else {
                    svg += '    <path d="M134 202.125V214.875C134 215.439 133.684 215.979 133.121 216.378C132.559 216.776 131.796 217 131 217H113C112.204 217 111.441 216.776 110.879 216.378C110.316 215.979 110 215.439 110 214.875V202.125C110 201.561 110.316 201.021 110.879 200.622C111.441 200.224 112.204 200 113 200H131C131.796 200 132.559 200.224 133.121 200.622C133.684 201.021 134 201.561 134 202.125ZM131 202.125H113V208.904L116.285 206.577L124.13 212.134L125.63 211.071C126.086 210.813 126.66 210.682 127.244 210.703C127.827 210.725 128.379 210.897 128.795 211.188L131 212.75V202.125ZM123.5 205.844C123.5 205.421 123.737 205.016 124.159 204.717C124.581 204.418 125.153 204.25 125.75 204.25C126.347 204.25 126.919 204.418 127.341 204.717C127.763 205.016 128 205.421 128 205.844C128 206.266 127.763 206.672 127.341 206.971C126.919 207.27 126.347 207.438 125.75 207.438C125.153 207.438 124.581 207.27 124.159 206.971C123.737 206.672 123.5 206.266 123.5 205.844Z" fill="#8E8E8E"/>';
                    svg += '    <text class="ultimo_chat" x="138" y="214">FOTO</text>';
                }
            }
            svg += '    <text x="327" y="180" class="ultimo_time">' + msg.hora + '</text>';
            svg += '</g>';
            trans += 89;
        }
    }
    document.write (svg);
}

function chat_defs () {
    let defs = '';
    let usrs = getUsersByTimeStamp ();
    for (let i = 0; i < usrs.length; i ++) {
        let u = usrs [i];
        let cvs = u.conversa;
        if (cvs.length > 0 || u.id == 0) {
            defs += '<pattern id="pattern' + u.id + '" patternContentUnits="objectBoundingBox" width="1" height="1">';
            defs += '    <use xlink:href="#image' + u.id + '" transform="matrix(0.003125 0 0 0.00405844 0 -0.149351)"/>';
            defs += '</pattern>';
            defs += '<image id="image' + u.id + '" width="320" height="320" xlink:href="' + u.foto + '"/>';
            defs += '<clipPath id="clip-foto">';
            defs += '   <ellipse cx="52" cy="192" rx="38" ry="38" fill="white"/>';
            defs += '</clipPath>';
            defs += '<clipPath id="clip-foto-main">';
            defs += '   <ellipse cx="100" cy="79" rx="26" ry="26" fill="white"/>';
            defs += '</clipPath>';
        }
    }
    document.write (defs);
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
        selecionados [i].style.fill = '#F9F9F9';   
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
    if (item == 'outros') execComOpacityFeedback ('outros-bck', outros);
    else if (item == 'nova-conversa') execComOpacityFeedback ('nova-conversa-bck', novaConversa);
    else if (item == 'voltar') execComOpacityFeedback ('voltar-bck', clearSelecionados);
    else if (item == 'fixar') execComOpacityFeedback ('fixar-bck', naoImplementado);
    else if (item == 'apagar') execComOpacityFeedback ('apagar-bck', apagarSelecionado);
    else if (item == 'silenciar') execComOpacityFeedback ('silenciar-bck', naoImplementado);
    else if (item == 'arquivar') execComOpacityFeedback ('arquivar-bck', naoImplementado);
    else if (item == 'camera') execComOpacityFeedback ('camera-bck', naoImplementado);
    else if (item == 'search') execComOpacityFeedback ('search-bck', naoImplementado);
    else if (item == 'edit-foto') execComOpacityFeedback ('edit-foto-bck', () => {window.location = 'editar_foto.html?voltar=chat'});
    else if (item == 'edit-perfil') execComOpacityFeedback ('edit-perfil-bck', () => {window.location = 'perfil.html?voltar=chat'});
    else if (item == 'edit-conf') execComOpacityFeedback ('edit-conf-bck', () => {window.location = 'configuracoes.html'});
}

function naoImplementadoL () {
    closeOutros ();
    naoImplementado ();
}

function configuracoes () {
    window.location = 'configuracoes.html';
}

function outrosMenu (item) {
    if (item == 'novo-grupo') execComOpacityFeedback ('novo-grupo-bck', naoImplementadoL);
    else if (item == 'nova-transimissao') execComOpacityFeedback ('nova-transimissao-bck', naoImplementadoL);
    else if (item == 'aparelhos-conectados') execComOpacityFeedback ('aparelhos-conectados-bck', naoImplementadoL);
    else if (item == 'mensagens-favoritas') execComOpacityFeedback ('mensagens-favoritas-bck', naoImplementadoL);
    else if (item == 'encontrar-empresas') execComOpacityFeedback ('encontrar-empresas-bck', naoImplementadoL);
    else if (item == 'pagamentos') execComOpacityFeedback ('pagamentos-bck', naoImplementadoL);
    else if (item == 'configuracoes') execComOpacityFeedback ('configuracoes-bck', configuracoes);
    else if (item == 'close') {
        closeOutros ();
    }
}