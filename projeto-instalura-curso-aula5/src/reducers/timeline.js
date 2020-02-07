export function timeline(state=[],action){ //initial state empty EC6
    if(action.type === 'LISTAGEM'){
      return action.fotos;
    }
    return state;
  } 