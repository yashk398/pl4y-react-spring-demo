package com.game.catalogue.resource;

import com.game.catalogue.entity.CatalogueEntity;
import com.game.catalogue.errors.CatalogueAlreadyExistsException;
import com.game.catalogue.errors.CatalogueNotFoundException;
import com.game.catalogue.json.Catalogue;
import com.game.catalogue.json.Game;
import com.game.catalogue.json.Review;
import com.game.catalogue.repo.CatalogueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/pl4y")
public class CatalogueResource {
    @Autowired
    private CatalogueRepo repoCat;
    @GetMapping(value = "/catalogue/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Catalogue> getAllCatalogues(){
        List<CatalogueEntity>  catalogueList = repoCat.findAll();
        List<Catalogue> catalogue = new ArrayList<Catalogue>();
        for(CatalogueEntity ctl : catalogueList){
            catalogue.add(new Catalogue(ctl.getId(), ctl.getTitle(), ctl.getRating(), ctl.getCount()));
        }
        return catalogue;
    }

    @GetMapping(value = "/catalogue/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Catalogue> searchFoodItem(@PathVariable("title") String title) throws CatalogueNotFoundException {
        CatalogueEntity catItems = null;
        try{
            catItems = repoCat.findByTitle(title);
        }
        catch(Exception e){
            throw new CatalogueNotFoundException();
        }
        return new ResponseEntity<Catalogue>((new Catalogue(catItems.getId(), catItems.getTitle(), catItems.getRating(), catItems.getCount())), HttpStatus.OK);
    }

    @PostMapping(value = "/catalogue/", produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Catalogue> addGame(@RequestBody Catalogue cat) throws CatalogueAlreadyExistsException {
        RestTemplate restTemplate = new RestTemplate();
        CatalogueEntity catalogueExists = repoCat.findByTitle(cat.getTitle());
        if(catalogueExists!=null){
            throw new CatalogueAlreadyExistsException();
        }
        Game fetchedGame = restTemplate.getForObject("http://localhost:8080/pl4y/games/"+cat.getTitle(), Game.class);
        if(fetchedGame==null) {
            return null;
        }
        CatalogueEntity catalogue = repoCat.save(new CatalogueEntity(cat.getId(), cat.getTitle(), cat.getRating(), cat.getCount()));
        List<Catalogue> list = getAllCatalogues();
        return list;
    }

    @DeleteMapping(value = "/catalogue/{id}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Catalogue> deleteGame(@PathVariable("id") int id) throws CatalogueNotFoundException {
        try {
            CatalogueEntity catalogue = repoCat.findById(id);
        }
        catch(Exception e){
            throw new CatalogueNotFoundException();
        }
        CatalogueEntity catalogue = repoCat.findById(id);
        RestTemplate restTemplate = new RestTemplate();
        List<Review> fetchedReviews = restTemplate.getForObject("http://localhost:8085/pl4y/reviews/", List.class);
        try{restTemplate.delete("http://localhost:8085/pl4y/reviews/clear/"+catalogue.getTitle());}
        finally {
            List<CatalogueEntity> gamesLeft = repoCat.deleteById(id);
            List<Catalogue> catList = getAllCatalogues();
            return catList;
        }
    }


    @PutMapping(value="/catalogue/{title}/", produces= MediaType.APPLICATION_JSON_VALUE)
    public List<Catalogue> updateCatalogue(@PathVariable ("title") String title, @RequestBody Catalogue catalogue) throws NullPointerException {
        CatalogueEntity editableMovieItem = repoCat.findByTitle(title);
        if(editableMovieItem==null){
            throw new NullPointerException("Invalid Catalogue title");
        }
        CatalogueEntity newMovieUpdate = repoCat.save(new CatalogueEntity(catalogue.getId(), catalogue.getTitle(), catalogue.getRating(), catalogue.getCount()));
        List<Catalogue> catalogueList = getAllCatalogues();
        return catalogueList;
    }
}
