package com.game.reviews.repo;

import com.game.reviews.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<ReviewEntity, Integer> {
    public ReviewEntity findById(int id) throws NullPointerException;
    public List<ReviewEntity> deleteById(int id);
}
