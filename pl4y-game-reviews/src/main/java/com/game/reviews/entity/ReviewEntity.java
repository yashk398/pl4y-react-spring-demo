package com.game.reviews.entity;

import javax.persistence.*;

@Entity
@Table(name="reviews")
public class ReviewEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;
    public String writer;
    public double rating;
    public String comments;
    public String title;

    public ReviewEntity() {
        super();
    }

    public ReviewEntity(int id, String writer, double rating, String comments, String title) {
        this.id = id;
        this.writer = writer;
        this.rating = rating;
        this.comments = comments;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return "ReviewEntity{" +
                "id=" + id +
                ", writer='" + writer + '\'' +
                ", rating=" + rating +
                ", comments='" + comments + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
