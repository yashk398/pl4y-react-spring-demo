package com.game.reviews.resource;

import com.game.reviews.entity.ReviewEntity;
import com.game.reviews.errors.ReviewNotFound;
import com.game.reviews.json.Catalogue;
import com.game.reviews.json.Review;
import com.game.reviews.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/pl4y")
public class ReviewResource {
    @Autowired
    private ReviewRepo repoReview;
    @GetMapping(value = "/reviews/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Review> getAllReviews(){
        List<ReviewEntity>  reviewList = repoReview.findAll();
        List<Review> reviews = new ArrayList<Review>();
        for(ReviewEntity review : reviewList){
            reviews.add(new Review(review.getId(), review.getWriter(), review.getRating(), review.getComments(), review.getTitle()));
        }
        return reviews;
    }
    @PostMapping(value = "/reviews/", produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Review> addGame(@RequestBody Review rev) throws Exception{
        RestTemplate restTemplate = new RestTemplate();
        Catalogue fetchedCatalogue = restTemplate.getForObject("http://localhost:8081/pl4y/catalogue/"+rev.getTitle(), Catalogue.class);
        if(fetchedCatalogue==null) {
            return null;
        }
        ReviewEntity rvew = repoReview.save(new ReviewEntity(rev.getId(), rev.writer, rev.rating, rev.comments, rev.title));
        Catalogue updatedCatalogue = new Catalogue(fetchedCatalogue.getId(), fetchedCatalogue.getTitle(), fetchedCatalogue.getRating(), fetchedCatalogue.getCount());
        updatedCatalogue.setCount(updatedCatalogue.getCount()+1);
        updatedCatalogue.setRating(((updatedCatalogue.getRating()*(updatedCatalogue.getCount()-1))+rev.rating)/updatedCatalogue.getCount());
        try{
            restTemplate.put("http://localhost:8081/pl4y/catalogue/"+rev.getTitle()+"/",updatedCatalogue,List.class);
            List<Review> list = getAllReviews();
            return list;
        }
        catch(Exception e){
            throw new Exception(e);
        }
    }

    @DeleteMapping(value = "/reviews/{id}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Review> deleteGame(@PathVariable("id") int id) throws ReviewNotFound, Exception {
        try {
            ReviewEntity rev = repoReview.findById(id);
        }
        catch(Exception e){
            throw new ReviewNotFound();
        }
        ReviewEntity rev = repoReview.findById(id);
        RestTemplate restTemplate = new RestTemplate();
        Catalogue fetchedCatalogue = restTemplate.getForObject("http://localhost:8081/pl4y/catalogue/"+rev.getTitle(), Catalogue.class);
        if(fetchedCatalogue==null){
            return null;
        }
        List<ReviewEntity> gamesLeft = repoReview.deleteById(id);
        Catalogue updatedCatalogue = new Catalogue(fetchedCatalogue.getId(), fetchedCatalogue.getTitle(), fetchedCatalogue.getRating(), fetchedCatalogue.getCount());
        updatedCatalogue.setCount(updatedCatalogue.getCount()-1);
        updatedCatalogue.setRating(((updatedCatalogue.getRating()*(updatedCatalogue.getCount()+1))-rev.rating)/updatedCatalogue.getCount());
        try {
            restTemplate.put("http://localhost:8081/pl4y/catalogue/" + rev.getTitle() + "/", updatedCatalogue, List.class);
            List<Review> reviewList = getAllReviews();
            return reviewList;
        }
        catch(Exception e){
            throw new Exception(e);
        }
    }

    @DeleteMapping(value = "reviews/clear/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Review> ClearReviews(@PathVariable("title") String title) throws NullPointerException, Exception {
        List<Review> reviewList = getAllReviews();
        for(Review review : reviewList){
            System.out.println("this "+review.getTitle()+"==?"+title);
            if(review.getTitle().equals(title)){
                repoReview.deleteById(review.getId());
                System.out.println(review);
            }
        }
        reviewList = getAllReviews();
        return reviewList;
    }
}
