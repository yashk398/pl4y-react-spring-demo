package com.game.reviews.errors;

public class ReviewNotFound extends Exception{
    private final String message;

    public ReviewNotFound() {
        this.message="";
    }

    public ReviewNotFound(String message) {
        this.message=message;

    }

    @Override
    public String toString() {
        return "Review Was Not Found "+this.message;
    }
}
