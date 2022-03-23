# Movie-Search
Beetroot Academy - Lesson 33

Movie Search is a web page that allows you to search any movie!
When opening the page the user can only see an input form for putting in the name (or part of the name) and choosing the type (movie, series, episode). 

After the user puts in the data and clicks Search, all movies / series or episodes are displayed below the search form based on the search. 
If there is no match for the given parameters, {No breeds found for your search. Please try again!} will be displayed.


1. Execute a web page for movie search. When opening the page, a user can only see an input form for putting in the name (or part of the name) and choosing the type (movie, series, episode). 

2. After the user puts in the data and clicks Search, it is necessary to send a corresponding query to an API resource OMDB (http://www.omdbapi.com/) using AJAX.  

3. If you receive a list of movies as a response, it should be displayed below the search form. If there is no match for given parameters, display Movie not found!.

4. Note that OMDB only returns 10 movies by default. This is why you should execute pagination in case there are more than 10 movies. Pagination is the numeration of pages which is usually located at the top or bottom of a web page. You’ve probably seen numbers 1, 2, 3 etc on online store web pages with products. Clicking those numbers displays different blocks of products. This is pagination. So the first search should return the first 10 movies and a button for moving in between pages. Clicking this button should send a query with needed page in parameters, and the received answer should be displayed instead of the current movie list. 

 5. There should be a Details button next to each movie. Clicking it should display detailed information about the movie. This information should be put out on the same page under the movie list and pagination. 

6. All the queries need to be sent using AJAX. So clicking any button should not refresh the page. API OMDB link: http://www.omdbapi.com/ (register to get an AP I KEY). Extra API link with movies (in case OMDB doesn’t work): https://developers.themoviedb.org/3/ search/search-movies .  
