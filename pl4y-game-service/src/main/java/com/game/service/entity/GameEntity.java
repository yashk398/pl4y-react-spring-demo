package com.game.service.entity;

import javax.persistence.*;

@Entity
@Table(name="games")
public class GameEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;
    private String category;
    private String devname;
    private String link;
    private int year;
    private String imgurl;
    private int size;

    public GameEntity(){
        super();
    }

    public GameEntity(int id, String title, String category, String devname, String link, int year, String imgurl, int size) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.devname = devname;
        this.link = link;
        this.year = year;
        this.imgurl = imgurl;
        this.size = size;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDevname() {
        return devname;
    }

    public void setDevname(String devname) {
        this.devname = devname;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return "GameEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", devname='" + devname + '\'' +
                ", link='" + link + '\'' +
                ", year=" + year +
                ", imgurl='" + imgurl + '\'' +
                ", size=" + size +
                '}';
    }
}
