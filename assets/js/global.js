
function execComBckFeedback (id, bckCor, toDo) {
    var svgobj = document.getElementById (id);
    let memBckCor = svgobj.style.backgroundColor;
    svgobj.style.backgroundColor = bckCor;
    setTimeout (() => {
        svgobj.style.backgroundColor = memBckCor;
        toDo ();
    }, 150);
}


let first = false;
function naoImplementado () {
    let mess = document.getElementById ('nao_implementado');
    mess.classList.remove ('hide');
    mess.classList.add ('opaco');
    setTimeout (() => {
        mess.classList.remove ('opaco');
        mess.classList.add ('hide');
        first = true;
    }, first ? 1000 : 2000);
}

// if ('serviceWorker' in navigator) {
//     window.addEventListener ('load', () => {
//             navigator.serviceWorker.register ('worker.js').then (
//                 (reg) => {console.log ('Service worker registrado', reg);}
//             ).catch (
//                 (err) => {console.log ('Algo deu errado: ' + err);}
//             );
//         }
//     );
// }

function loggar (text) {
    document.getElementById ('logggg').innerHTML = text;
}

function tm () {
    return new Date ().getTime ();
}