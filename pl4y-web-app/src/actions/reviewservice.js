import axios from 'axios'

const REVIEW_SERVICE = "http://localhost:8085/pl4y/";
class ReviewService{
        addReview(reviewObject){
                console.log("Hi", reviewObject);
                return axios.post(REVIEW_SERVICE+'reviews/', reviewObject); 
        }
}

export default new ReviewService;