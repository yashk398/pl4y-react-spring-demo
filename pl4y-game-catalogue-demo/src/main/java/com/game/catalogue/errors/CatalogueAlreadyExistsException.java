package com.game.catalogue.errors;

public class CatalogueAlreadyExistsException extends Exception{
    private final String message;

    public CatalogueAlreadyExistsException() {
        this.message="";
    }

    public CatalogueAlreadyExistsException(String message) {
        this.message=message;

    }

    @Override
    public String toString() {
        return "Catalogue Already Exists in the Database.... "+this.message;
    }
}
