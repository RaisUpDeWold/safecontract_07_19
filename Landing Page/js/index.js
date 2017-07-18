window.onload = function (){
  if (window.location.protocol === "https:")
    window.location.protocol = "http";
};

$.ajax({ url: "http://www.coincap.io/front", success: function(result) {
  var jsonResult = JSON.stringify(result);
  var jsonArray = JSON.parse(jsonResult);
  for (var i = 0; i < 12; i ++) {
    $('#rankName' + (i + 1)).text(jsonArray[i]['short']);
    $('#rankPrice' + (i + 1)).text('$' + Math.floor(jsonArray[i]['price'] * 100) / 100);
    $('#rankPercent' + (i + 1)).text(jsonArray[i]['cap24hrChange'] + '%');
  }
  console.log(jsonArray);
}});

var socket = io.connect("http://socket.coincap.io");

socket.on("trades", function (tradeMsg) {
  var jsonResult = JSON.stringify(tradeMsg);
  var jsonObject = JSON.parse(jsonResult);
  console.log(tradeMsg);
  //console.log(jsonObject['message']['msg']['position24']);
  if (jsonObject['message']['msg']['position24'] <= 12) {
    $('#rankPercent' + jsonObject['message']['msg']['position24']).text(jsonObject['message']['msg']['cap24hrChange'] + '%');
    $('#rankPrice' + jsonObject['message']['msg']['position24']).text('$' + Math.floor(jsonObject['message']['msg']['price'] * 100) / 100);

    if (jsonObject['message']['msg']['delta'] < 0) {
      $("#rankCircle" + jsonObject['message']['msg']['position24']).css('color', 'red');
      $("#rankCircle" + jsonObject['message']['msg']['position24']).fadeIn(1000);
      $("#rankCircle" + jsonObject['message']['msg']['position24']).fadeOut(1000);
    } else if (jsonObject['message']['msg']['delta'] > 0) {
      $("#rankCircle" + jsonObject['message']['msg']['position24']).css('color', 'green');
      $("#rankCircle" + jsonObject['message']['msg']['position24']).fadeIn(1000);
      $("#rankCircle" + jsonObject['message']['msg']['position24']).fadeOut(1000);
    }
  }
});

socket.on("global", function (globalMsg) {
  /*console.log(globalMsg);*/
});

function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

$(document).scroll(function () {
  var paraHeight = $("#thirdPara").height() / 2;
  var pos = $(this).scrollTop();
  if (pos >= $('#firstPara').offset().top - 150 && pos <= $('#firstPara').offset().top + paraHeight) {
    if ($('#howItWorksTab').css('display') == "none") {
      $('#howItWorksTab').fadeIn('2', function () {
        $('#tab1InfoLink').tab('show');
        $('#tab2Info').hide();
        $('#tab3Info').hide();
      });
    } else {
      $('#tab1InfoLink').tab('show');
      $('#tab2Info').hide();
      $('#tab3Info').hide();
    }
  }
  else if (pos >= $('#secondPara').offset().top - paraHeight && pos <= $('#secondPara').offset().top + paraHeight) {
    $('#tab1Info').hide();
    $('#tab2InfoLink').tab('show');
    $('#tab3Info').hide();
  } else if (pos >= $("#thirdPara").offset().top - paraHeight && pos <= $('#thirdPara').offset().top + 120) {
    if ($('#howItWorksTab').css('display') == "none") {
      $('#howItWorksTab').fadeIn('fast', function () {
        $('#tab1Info').hide();
        $('#tab2Info').hide();
        $('#tab3InfoLink').tab('show');
      });
    } else {
      $('#tab1Info').hide();
      $('#tab2Info').hide();
      $('#tab3InfoLink').tab('show');
    }
  } else {
    $('#howItWorksTab').css('display', 'none');
  }
});

$(window).resize(function () {
  if ($('#howItWorksSection').width() >= 768) {
    $('.worksItemTextRightImage').css('display', 'none');
    if ($(this).scrollTop() < $('#howItWorksSection').offset().top) {
      $('#howItWorksTab').css('display', 'none');
    } else if ($(this).scrollTop() > $('#howItWorksSection').offset().top + $('#howItWorksSection').height() - window.screen.availHeight / 3) {
      $('#howItWorksTab').css('display', 'none');
    } else {
      $('#howItWorksTab').css('display', 'inline');
    }
  } else {
    $('.worksItemTextRightImage').css('display', 'inline');
    $('#howItWorksTab').css('display', 'none');
  }
});

//based on an Example by @curran
$(document).ready( function () {
  $(document).on('click', 'a.page-scroll', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
  });

  window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
  var canvas = document.getElementById("topSpace");
  var c = canvas.getContext("2d");

  var numStars = 1900;
  var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
  var focalLength = canvas.width *2;
  var warp = 0;
  var centerX, centerY;

  var stars = [], star;
  var i;

  var animate = true;

  initializeStars();

  function executeFrame(){
    
    if(animate)
      requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
  }

  function initializeStars(){
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    
    stars = [];
    for(i = 0; i < numStars; i++){
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.'+Math.floor(Math.random() * 99) + 1
      };
      stars.push(star);
    }
  }

  function moveStars(){
    for(i = 0; i < numStars; i++){
      star = stars[i];
      star.z--;
      
      if(star.z <= 0){
        star.z = canvas.width;
      }
    }
  }

  function drawStars(){
    var pixelX, pixelY, pixelRadius;
    
    // Resize to the screen
    if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }
    if(warp==0)
    {c.fillStyle = "rgba(0,10,20,1)";
    c.fillRect(0,0, canvas.width, canvas.height);}
    c.fillStyle = "rgba(209, 255, 255, "+radius+")";
    for(i = 0; i < numStars; i++){
      star = stars[i];
      
      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = 1 * (focalLength / star.z);
      
      c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
      //c.fill();
    }
  }

  executeFrame();

  $(window).resize();
});