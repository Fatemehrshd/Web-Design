var movies;

function display_movie_names() {
    var select = document.getElementById("movies");
    for (var i = 0 ; i < movies.length ; i++) {
        var option = document.createElement("OPTION");
        option.innerHTML = movies[i].title;
        option.value = i;
        select.appendChild(option);
    }
}

function get_index() {
    for (var i ; i < movies.length ; i++) {
        movies[i].id = i + 1;
    }
    return;
}

async function read_data(path) {
    var x = await fetch(path);
    var y = await x.text();
    movies = JSON.parse(y);
    // get_index();
    // console.log(movies[0].id);
    display_movie_names();
}

function display_info(selected_movie) {
    var movie = selected_movie.selectedOptions[0];

    var parameters = ["year", "title", "info"];
    var info = ["directors", "release_date", "rating", "genres", "image_url", "plot", "rank", "running_time_secs", "actors"];

    document.getElementById("title").innerHTML = "";
    document.getElementById("year").innerHTML = "";
    document.getElementById("directors").innerHTML = "";
    document.getElementById("release_date").innerHTML = "";
    document.getElementById("rate-no").innerHTML = "";
    document.getElementById("genres").innerHTML = "";
    document.getElementById("image_url").src = "";
    document.getElementById("plot").innerHTML = "";
    document.getElementById("rank").innerHTML = "";
    document.getElementById("running_time_secs").innerHTML = "";
    document.getElementById("actors").innerHTML = "";


    // make all divs empty befor display info
    // for (var i = 0 ; i < parameters.length ; i++) {
    //     if (parameters[i] == "info") {
    //         for (var j = 0 ; j < info.length ; j++) {
    //             if (info[j] != "image_url") {
    //                 document.getElementById(info[j]).innerHTML = "";
    //             }
    //             else {
    //                 document.getElementById("image_url").src = "";
    //             }
    //         }
    //     }
    //     else {
    //         document.getElementById(parameters[i]).innerHTML = "";    
    //     }
    // }

    document.getElementById("title").innerHTML += movie.text;
    
    for (var i = 0 ; i < movies.length ; i++) {
        if (movies[i].title == movie.text) {

            document.getElementById("year").innerHTML = movies[i].year;
            document.getElementById("directors").innerHTML = movies[i].info.directors;
            document.getElementById("release_date").innerHTML = "Release date: " + movies[i].info.release_date.substring(0, 10);
            if (movies[i].info.rating != null) {

                document.getElementById("rate-no").innerHTML = String(movies[i].info.rating);
            }
            else {
                document.getElementById("rate-no").innerHTML = "-"
            }

            // var genres = document.getElementById("genres").innerHTML = "Genres" + movies[i].info.genres;
            var genres = document.getElementById("genres");
            var tmp = movies[i].info.genres;
            for (var j = 0 ; j < tmp.length ; j++) {
                var btn = document.createElement("button");
                btn.innerHTML = tmp[j];
                btn.className = "btn btn-outline-secondary genre-btn";
                genres.appendChild(btn);
            }

            
            document.getElementById("image_url").src = movies[i].info.image_url;
            document.getElementById("plot").innerHTML = movies[i].info.plot;
            document.getElementById("rank").innerHTML = movies[i].info.rank;
            if (movies[i].info.running_time_secs != null) {
                var duration = movies[i].info.running_time_secs;
                var hours = Math.floor(duration / 3600);
                var mins = Math.floor((duration % 3600) / 60);
                var time = String(hours) + "h " + String(mins) + "m";
                document.getElementById("running_time_secs").innerHTML = time;
            }
            document.getElementById("actors").innerHTML = movies[i].info.actors;

            var tmp = document.getElementById("all_data");
            tmp.style.visibility = "visible";
        }
    }
    
}

var path = "moviedata.json";
read_data(path);


