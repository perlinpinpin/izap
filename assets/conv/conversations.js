let users = [
    {
        'timestamp': 1,
        'id': 0,
        'nome': '(Você)',
        'nome_expandido': '+55 91 8263-2655 (Você)',
        'foto': 'assets/conv/perfil/0.png',
        'status': 'Mensagem para mim.',
        'visto' : '8:10',
        'conversa' : [],
    },
    {
        'timestamp': 2,
        'id': 1,
        'nome': 'Carlos',
        'nome_expandido': 'Carlos',
        'foto': 'assets/conv/perfil/1.png',
        'status': 'Olá! Estou usando o WhatsApp.',
        'visto' : '8:15',
        'conversa' : [
            {
                'mess_id' : 'm001',
                'fluxo': 'in',
                'tipo': 'img',
                'content': 'assets/conv/img/img.jpeg',
                'dia': '28/04/2023',
                'hora': '8:20',
                'lido': true,
                'apagada': false,
                'resposta': null
            },
            {
                'mess_id' : 'm002',
                'fluxo': 'out',
                'tipo': 'txt',
                'content': ['Obrigado! Como está?'],
                'dia': '28/04/2023',
                'hora': '8:45',
                'lido': true,
                'apagada': false,
                'resposta': 'm001'
            },
            {
                'mess_id' : 'm003',
                'fluxo': 'in',
                'tipo': 'txt',
                'content': ['Estou bem!', 'E contigo?'],
                'dia': '28/04/2023',
                'hora': '8:53',
                'lido': true,
                'apagada': false,
                'resposta': 'm002'
            },
            {
                'mess_id' : 'a001',
                'fluxo': 'out',
                'tipo': 'au',
                'content': ['assets/conv/audio/audio1.ogg', '0:03'],
                'dia': '30/04/2023',
                'hora': '15:20',
                'lido': true,
                'apagada': false,
                'resposta': 'm003'
            },
            {
                'mess_id' : 'a002',
                'fluxo': 'in',
                'tipo': 'au',
                'content': ['assets/conv/audio/audio2.ogg', '0:12'],
                'dia': '30/04/2023',
                'hora': '15:20',
                'lido': true,
                'apagada': false,
                'resposta': 'a001'
            },
            {
                'mess_id' : 'm005',
                'fluxo': 'out',
                'tipo': 'txt',
                'content': [
                    'Vamos ver se um texto longo provoca problema na paginação... Tomará que não...',
                    'Ficou legal, não?', 
                    'O que achou?'
                ],
                'dia': '29/04/2023',
                'hora': '15:25',
                'lido': false,
                'apagada': false,
                'resposta': 'm001'
            },
            {
                'mess_id' : 'm006',
                'fluxo': 'out',
                'tipo': 'au',
                'content': ['assets/conv/audio/audio2.ogg', '0:12'],
                'dia': '30/04/2023',
                'hora': '15:27',
                'lido': false,
                'apagada': false,
                'resposta': 'm005'
            }
        ]
    },
    {
        'timestamp': 3,
        'id': 2,
        'nome': 'Maria',
        'nome_expandido': 'Maria',
        'foto': 'assets/conv/perfil/2.png',
        'status': 'Disponível',
        'visto' : '8:20',
        'conversa' : [
            {
                'mess_id' : 'm001',
                'fluxo': 'out',
                'tipo': 'txt',
                'content': ['Oi! Como está?'],
                'dia': '28/04/2023',
                'hora': '8:20',
                'lido': true,
                'apagada': false,
                'resposta': null
            },
            {
                'mess_id' : 'm002',
                'fluxo': 'out',
                'tipo': 'img',
                'content': 'assets/conv/img/img.jpeg',
                'dia': '28/04/2023',
                'hora': '8:45',
                'lido': true,
                'apagada': false,
                'resposta': null
            }
        ]
    },
    {
        'timestamp': 4,
        'id': 3,
        'nome': 'João',
        'nome_expandido': 'João',
        'foto': 'assets/conv/perfil/3.png',
        'status': 'Amizade é tudo!',
        'visto' : '8:25',
        'conversa' : [
            {
                'mess_id' : 'm001',
                'fluxo': 'out',
                'tipo': 'txt',
                'content': ['Oi! Como está???'],
                'dia': '28/04/2023',
                'hora': '8:20',
                'lido': true,
                'apagada': false,
                'resposta': null
            },
            {
                'mess_id' : 'm002',
                'fluxo': 'in',
                'tipo': 'au',
                'content': ['assets/conv/audio/audio1.ogg', '0:03'],
                'dia': '28/04/2023',
                'hora': '8:45',
                'lido': true,
                'apagada': false,
                'resposta': null
            },
            {
                'mess_id' : 'm003',
                'fluxo': 'out',
                'tipo': 'txt',
                'content': ['Oi! Como está???'],
                'dia': '28/04/2023',
                'hora': '8:20',
                'lido': true,
                'apagada': true,
                'resposta': null
            }
        ]
    },
    {
        'timestamp': 5,
        'id': 4,
        'nome': 'Paula',
        'nome_expandido': 'Paula',
        'foto': 'assets/conv/perfil/4.png',
        'status': 'Disponível',
        'visto' : '8:30',
        'conversa' : []
    }
];

function usersUpdated () {
    sessionStorage.setItem ('users', JSON.stringify (users));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);
let reset = urlParams.get ('reset');
if (reset == '1') {
    usersUpdated ();
}
else {
    let tmp = sessionStorage.getItem ('users');
    if (tmp == null) {
        usersUpdated ();
    }
    else {
        users = JSON.parse (tmp);
    }
}

function getUsersByTimeStamp () {
    let clone = [];
    for (let i = 0; i < users.length; i++) clone.push (users [i])
    clone = clone.sort ((a, b) => {
        let va = +a.timestamp;
        let vb = +b.timestamp;
        if (va < vb) return 1;
        if (va > vb) return -1;
        return 0;
    });
    return clone;
    
}

function getFotoPath (id) {
    return users [id].foto;
}

function printFoto (id, size) {
    let svg = '<img id="image' + id + '" width="' + size + '" height="' + size + '" src="' + users [id].foto + '" style="border-radius:'+ (size / 2) +'px"/>'
    document.write (svg);
}

