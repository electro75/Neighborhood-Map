# Neighborhood-Map

## Introduction

This project was developed as the part of Udacity's Front-End Nanodegree. It is basically a map depicting the neighborhood that I live in and highlights some of my favourite spots.

## Instructions 
The app can be run by cloning [this repository](https://github.com/electro75/Neighborhood-Map) and then running index.html .

## Technical Specifications

* Knockout JS is used to handle all the functionalities of the list view such as the filter, selection of markers etc.
* A third party API used is [Open Weather Maps API](https://openweathermap.org/). This gives some important weather data of the given area in the form of a JSON file.
* The weather data obtained is presented inside the app in the form of a modal that is developed using [Bootstrap Modal](http://getbootstrap.com/docs/4.0/components/modal/). It also uses jQuery to add the data to the modal.
* Icons are obtained from [Font Awesome](http://fontawesome.io/)
* The side-panel contaning the list-view is made toggle-able using vanilla JS.

## Important Files

### app.js
* Contains the main view model of the app which handles most of the functionalities that have been implemented in the app. Also initialises the map and other components used by the map. 
* Contains all the details of the chosen locations in the for of a `locations[]` which is an array of objects.

### wether.js
* Obtains the weather data from [Open Weather Maps API](https://openweathermap.org/) and updates the modal in the view.

### toggle.js
* Handles the toggling of the side-panel and makes sure it runs smoothly for all viewports.

### foursquare.js
* Obtains the review data form [Foursqueare API](https://https://foursquare.com/) and updates the modal in the view

## Thank You!
