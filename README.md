# Movie-Search
Beetroot Academy - Lesson 33

Live Page URL: https://mirinkakotze.github.io/Movie-Search/

Movie Search is a web page that allows you to search any movie!

The movie information is obtained from API OMDB link: http://www.omdbapi.com/.

The enitre web page is build using JAVASCRIPT and styling is done with SCSS.

When opening the page the user can only see an input form for putting in the name (or part of the name) and choosing the type (movie, series, episode). 

After the user puts in the data and clicks Search, all movies / series or episodes are displayed below the search form based on the search. 
If there is no match for the given parameters, {No movies found for your search. Please try again!} will be displayed.

Pagination is used in the case where there are more than 10 movies. 
Pagination is the numeration of pages which is located at the bottom of the movie list. 
Clicking the Next or Previous button will show the next 10 movies, or go back to the previous 10.

There are a details button next to each movie. Clicking it, will display more detailed information about the movie at the bottom of the page.

Any movie can be added or removed from a list of favorites.
The favorites are created using local storage -- after refreshing your page, the list will still be availabe.
