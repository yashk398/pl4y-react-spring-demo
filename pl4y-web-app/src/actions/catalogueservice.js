import axios from 'axios'

const CATALOGUE_URL = "http://localhost:8081/pl4y/catalogue/";
class CatalogueService{
        fetchCatalogue(title){
                return axios.get(CATALOGUE_URL+"/detailed/"+title+"/"); 
        }

        fetchAllCatalogues(){
                return axios.get(CATALOGUE_URL); 
        }

        addCatalogue(object){ 
                return axios.post(CATALOGUE_URL, object);
        }
}

export default new CatalogueService();