package com.game.service.resource;

import com.game.service.entity.GameEntity;
import com.game.service.errors.GameNotFoundException;
import com.game.service.json.Catalogue;
import com.game.service.json.Game;
import com.game.service.repo.GameRepo;
import com.sun.org.apache.xml.internal.resolver.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/pl4y")
public class GameResource {
    @Autowired
    private GameRepo repoGames;
    @GetMapping(value = "/games/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Game> getAllGames(){
        List<GameEntity>  listOfGames = repoGames.findAll();
        List<Game> gameList = new ArrayList<Game>();
        for(GameEntity game : listOfGames){
            gameList.add(new Game(game.getId(), game.getTitle(), game.getCategory(), game.getDevname(), game.getLink(), game.getYear(), game.getImgurl(), game.getSize()));
        }
        return gameList;
    }
    @GetMapping(value = "/games/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Game searchByTitle(@PathVariable("title") String title) throws GameNotFoundException{
        GameEntity game = repoGames.findByTitle(title);
        if(game==null){
            throw new GameNotFoundException();
        }
        return new Game(game.getId(), game.getTitle(), game.getCategory(), game.getDevname(), game.getLink(), game.getYear(), game.getImgurl(), game.getSize());
    }
    @PostMapping(value = "/games/", produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Game> addGame(@RequestBody Game gameData) throws Exception{
        GameEntity game = repoGames.findByTitle(gameData.getTitle());
        if(game!=null){
            throw new Exception();
        }
        GameEntity gameEntity = repoGames.save(new GameEntity(gameData.getId(), gameData.getTitle(), gameData.getCategory(), gameData.getDevname(), gameData.getLink(), gameData.getYear(), gameData.getImgurl(), gameData.getSize()));
        List<Game> foodList = getAllGames();
        return foodList;
    }
    @DeleteMapping(value = "/games/{id}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Game> deleteGame(@PathVariable("id") int id) throws GameNotFoundException {
        try {
            GameEntity game = repoGames.findById(id);
        }
        catch(Exception e){
            throw new GameNotFoundException();
        }
        GameEntity game = repoGames.findById(id);
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(game);
        Catalogue catalogue = restTemplate.getForObject("http://localhost:8081/pl4y/catalogue/"+game.getTitle()+"/", Catalogue.class);
        List<GameEntity> gamesLeft = repoGames.deleteById(id);
        System.out.println(catalogue);
        int urlId = catalogue.getId();
        System.out.println(urlId);
        restTemplate.delete("htt        p://localhost:8081/pl4y/catalogue/"+urlId+"/", List.class);
        List<Game> gameList = getAllGames();
        return gameList;
    }

}
