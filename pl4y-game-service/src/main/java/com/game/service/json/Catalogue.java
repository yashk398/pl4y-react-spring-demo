package com.game.service.json;

public class Catalogue {
    public int id;
    public String title;
    public double rating;
    public int count;

    public Catalogue() {
        super();
    }

    public Catalogue(int id, String title, double rating, int count) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "CatalogueEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", rating=" + rating +
                ", count=" + count +
                '}';
    }
}
