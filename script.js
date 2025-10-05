var character = $("#character");
var leftValue = 0;
character.fms = false;

var bot1 = $("#bot1");
var leftValue1 = 0;
var bot1Speed;
bot1.leftvalue;
bot1.name = "Black";
bot1.fms = false;

var bot2 = $("#bot2");
var leftValue2 = 0;
var bot2Speed;
bot2.leftvalue = leftValue2;
bot2.name = "Green";
bot2.fms = false;

var bot3 = $("#bot3");
var leftValue3 = 0;
var bot3Speed;
bot3.leftvalue = leftValue3;
bot3.name = "Yellow";
bot3.fms = false;

var bot4 = $("#bot4");
var leftValue4 = 0;
var bot4Speed;
bot4.leftvalue = leftValue4;
bot4.name = "Blue";
bot4.fms = false;

var bots = [bot1, bot2, bot3, bot4];

var countdownTimeLeft = 3;
setTimeout(function () {
  $(document).keyup(function (event) {
    if (event.key === " " && leftValue < 950) {
      leftValue += 10;
      character.css({
        left: leftValue + "px",
      });
    } else if (event.key !== " ") {
      $("#info").text("press space to run");
      setTimeout(() => {
        $("#info").text(" ");
      }, 1000);
    }
  });
}, 3000);

setInterval(() => {
  bot1Speed = Math.random() * (150 - 130) + 130;
}, 100);

setTimeout(function () {
  setInterval(() => {
    if (leftValue1 < 950) {
      leftValue1 += 10;
      bot1.css({
        left: leftValue1 + "px",
      });
    }
  }, bot1Speed);
}, 3000);

setInterval(() => {
  bot2Speed = Math.random() * (150 - 130) + 130;
}, 100);

setTimeout(function () {
  setInterval(() => {
    if (leftValue2 < 950) {
      leftValue2 += 10;
      bot2.css({
        left: leftValue2 + "px",
      });
    }
  }, bot2Speed);
}, 3000);

setInterval(() => {
  bot3Speed = Math.random() * (150 - 130) + 130;
}, 100);

setTimeout(function () {
  setInterval(() => {
    if (leftValue3 < 950) {
      leftValue3 += 10;
      bot3.css({
        left: leftValue3 + "px",
      });
    }
  }, bot3Speed);
}, 3000);

setInterval(() => {
  bot4Speed = Math.random() * (150 - 130) + 130;
}, 100);

setTimeout(function () {
  setInterval(() => {
    if (leftValue4 < 950) {
      leftValue4 += 10;
      bot4.css({
        left: leftValue4 + "px",
      });
    }
  }, bot4Speed);
}, 3000);

setInterval(() => {
  bots.forEach((bot) => {
    if (parseInt(bot.css("left")) >= 950 && !bot.fms) {
      $("body").append("<p>" + bot.name + " is finished!</p>");
      bot.fms = true;
    }
  });

  if (leftValue >= 950 && !character.fms) {
    $("body").append("<p>You finished!</p>");
    character.fms = true;
  }
}, 1);

$("#info").text(countdownTimeLeft);

var countdown = setInterval(() => {
  countdownTimeLeft--;
  $("#info").text(countdownTimeLeft);

  if (countdownTimeLeft <= 0) {
    clearInterval(countdown);
    $("#info").text("GO!");
    setTimeout(() => {
      $("#info").text(" ");
    }, 1000);
  }
}, 1000);
