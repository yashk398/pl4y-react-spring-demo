package com.game.service.errors;

public class GameNotFoundException extends Exception{
    private final String message;

    public GameNotFoundException() {
        this.message="";
    }

    public GameNotFoundException(String message) {
        this.message=message;

    }

    @Override
    public String toString() {
        return "Game Was Not Found "+this.message;
    }
}

