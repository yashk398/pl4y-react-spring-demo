package com.game.catalogue.repo;

import com.game.catalogue.entity.CatalogueEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CatalogueRepo extends JpaRepository<CatalogueEntity, Integer> {
    public CatalogueEntity findById(int id) throws NullPointerException;
    public List<CatalogueEntity> deleteById(int id);
    public CatalogueEntity findByTitle(String title) throws NullPointerException;
}
