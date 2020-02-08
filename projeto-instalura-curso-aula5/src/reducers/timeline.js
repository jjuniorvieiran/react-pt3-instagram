import { List } from 'immutable';

export function timeline(state = new List(), action) { //initial state empty EC6
    if (action.type === 'LISTAGEM') {
        return new List(action.fotos);
    }

    if (action.type === 'COMENTARIO') {
        const fotoEstadoAntigo = state.find(foto => foto.id === action.fotoId);
        const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);
    
        //Nós queremos que ele preencha com todas propriedade que tem no fotoEstadoAtual e depois, que troque a propriedade comentarios 
        //pelos novosComentarios. Sempre o último objeto literal, prevalecerá a que estava antes. Isto irá nos retornar o fotoEstadoNovo.
        const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,{comentarios:novosComentarios});
    
        const indiceDaLista = state.findIndex(foto => foto.id === action.fotoId);
        //O próximo passo será o adicionar a variável novaLista com o state.set() para trocarmos um elemento com determinado índice. 
        //Incluiremos dois parâmetros: indiceDaLista e fotoEstadoNovo. No fim, será retornado uma novaLista.
        const novaLista = state.set(indiceDaLista,fotoEstadoNovo);
    
        return novaLista;
    }

    if (action.type === 'LIKE') {
        const fotoAchada = state.find(foto => foto.id === action.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const liker = action.liker;

        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

        if (possivelLiker === undefined) {
            fotoAchada.likers.push(liker);
        } else {
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoAchada.likers = novosLikers;
        }

        return state;
    }

    return state;
} 