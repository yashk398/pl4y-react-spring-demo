package com.game.service.repo;

import com.game.service.entity.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepo extends JpaRepository<GameEntity, Integer>{
    public GameEntity findById(int id) throws NullPointerException;
    public List<GameEntity> deleteById(int id);
    public GameEntity findByTitle(String title) throws NullPointerException;

}