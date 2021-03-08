    package com.game.catalogue.errors;

    public class CatalogueNotFoundException extends Exception{
        private final String message;

        public CatalogueNotFoundException() {
            this.message="";
        }

        public CatalogueNotFoundException(String message) {
            this.message=message;

        }

        @Override
        public String toString() {
            return "Catalogue Was Not Found "+this.message;
        }
    }
