import Pubsub from 'pubsub-js';

export default class LogicaTimeline {
    like(fotoId) {
     fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {            
            throw new Error("não foi possível realizar o like da foto");
          }
        })
        .then(liker => {        
           Pubsub.publish('atualiza-liker',{fotoId,liker});
        });      
    }
}