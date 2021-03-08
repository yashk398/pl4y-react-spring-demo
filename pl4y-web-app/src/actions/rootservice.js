import axios from 'axios'

const ROOT_URL = "http://localhost:8080/pl4y/";
class RootService{
        fetchAllGames(){
                return axios.get(ROOT_URL+'games/'); 
        }
        addGame(object){
                return axios.post(ROOT_URL+'games/', object); 
        }
        deleteGame(id){
                return axios.delete(ROOT_URL+'games/'+id+'/' );
        }        

        
}

export default new RootService();