var lat, lon;
var startUnit = "C";

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      whatWeather(lat, lon);      
    });
  } else {
    console.log("your browser do not want to tell me where you are ;");
  }

//read JSONa  
function whatWeather(lat, lon) {  
$.getJSON("https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon, function (json) {
                    var country = "";
                    var city = "";
                    var temp = "";
                    var unit = "";
                    var clouds = [];
                    var description = "";
                    var cloudsImage = "";
                    var startTemp = 0;                    

                    country = json.sys.country;
                    city = json.name + ",";
                    startTemp = Math.round(json.main.temp);
                    unit = "<a class=\"changeUnit\">" + startUnit + "</a>";
                    clouds = json.weather["0"];
                    description = clouds.description;
                    cloudsImage = clouds.icon;

                    $(".city").text(city);
                    $(".country").text(country);
                    $(".temp").html(startTemp);
                    $(".degree").html("<sup>&#186</sup>");
                    $(".unit").html(unit);
                    $(".clouds").text(description);
                    $(".cloudsImage").attr("src", cloudsImage);
                }); 
                
//change C => F
$(".temperature").on("click", function () {
    var whatUnit = $(".unit").text();
    var whatTemp = $(".temp").text();
    var newTemp = 0;
    
    if(whatUnit === 'C') { 
        newTemp = Math.round(9/5 * whatTemp + 32);
         $(".temp").text(newTemp);
         $(".unit").text("F");
    }
    else {        
        newTemp = Math.round(5/9 * (whatTemp - 32));
        $(".unit").text("C");
        $(".temp").text(newTemp);
    }
});               
                
};

});                         