(function(i,s,o,g,r,a,m){
  i['GoogleAnalyticsObject']=r;
  i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
  a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];
  a.async=1;
  a.src=g;
  m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-49746829-1', 'auto');
	ga('send', 'pageview');

var _gaq = _gaq || [];
  	_gaq.push(['_setAccount', 'UA-49746829-1']);
  	_gaq.push(['_trackPageview']);

  	(function() {
    	var ga = document.createElement('script'); 
      ga.type = 'text/javascript'; 
      ga.async = true;
    	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    	
      var s = document.getElementsByTagName('script')[0]; 
      s.parentNode.insertBefore(ga, s);
  	})();

function people(like){
    if(like === 0){
      return "Please consider liking this!"
    } else if(like === 1){
      return "Thankyou for liking this!";
      // return like + " person likes this!"
    } else{
      return like + " people like this!";
    }
  };

$(document).ready(function(){
  localStorage.clear();
  var title = document.getElementById("PageTitle").innerHTML;

  $.getJSON("/posts.json", function(data){
    $.each(data, function(i){
      if(data[i].Title === title){
        var likes = data[i].Likes

        var heart = document.getElementById("heart");
        var total = document.getElementById("total");
        total.innerHTML = people(likes)


        if(localStorage.getItem(title) === "liked"){
          heart.className = "liked glyphicon glyphicon-heart";
          total.innerHTML = "Thankyou for liking this!"
        }

        heart.onclick = function(){
          if (heart.className == "likeme glyphicon glyphicon-heart-empty") {
              heart.className = "liked glyphicon glyphicon-heart";
              data[i].Likes = likes + 1
              total.innerHTML = people(data[i].Likes)
              
              localStorage.setItem(title, "liked");
              var phpString = {
                title: String(title),
                likes: String(data[i].Likes)
              }
              $.post("http://systems.lukesheard.com/editLikes.php", phpString, function(data){
                alert(data)
              });
          }
        };
      }
    })  
  }) 

  if(title === "Resume"){
    var $ul = $('.skills')
          var $liArr = $ul.children('li');
          
          $liArr.sort(function(a,b){
          var temp = parseInt( Math.random()*10 );
          var isOddOrEven = temp%2;
          var isPosOrNeg = temp>5 ? 1 : -1;
          return( isOddOrEven*isPosOrNeg );
          })
          .appendTo($ul);
  } 
});



$(window).load(function(){
  var now = new Date();
  now = now.getTime()

  if(Date.parse(localStorage.date) !== null){
    var date = Date.parse(localStorage.date);
    var difference = now - date;
    difference = difference / 86400000;
      if(difference > 1){
      $('#myModal').modal('show');
    }
  } else {
    $('#myModal').modal('show');
  }
  
  localStorage.date = new Date();
});