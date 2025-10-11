var bestTime = localStorage.getItem("bestTime");
var raceStarted = false;
var gunShot = new Audio("pistolshot.mp3");
$("#bestTimeInd").text("Your PB is " + bestTime);

$(window).on("keydown", function (event) {
  if (event.code === "Space") event.preventDefault();
});

setTimeout(() => {
  raceStarted = true;
}, 3100);

$(document).keyup(function (event) {
  if (event.key === " " && !raceStarted) {
    $("#timer").append("FALSE START");
    window.location.reload();
  }
});

var character = $("#character");
var leftValue = 0;
character.fms = false;
character.name = "You";

var bot1 = $("#bot1");
var leftValue1 = 0;
var bot1Speed;
bot1.leftvalue = parseFloat(bot1.css("left"));
bot1.name = "Black";
bot1.fms = false;

var bot2 = $("#bot2");
var leftValue2 = 0;
var bot2Speed;
bot2.leftvalue = parseFloat(bot2.css("left"));
bot2.name = "Green";
bot2.fms = false;

var bot3 = $("#bot3");
var leftValue3 = 0;
var bot3Speed;
bot3.leftvalue = parseFloat(bot3.css("left"));
bot3.name = "Yellow";
bot3.fms = false;

var bot4 = $("#bot4");
var leftValue4 = 0;
var bot4Speed;
bot4.leftvalue = parseFloat(bot4.css("left"));
bot4.name = "Blue";
bot4.fms = false;

var players = [bot1, bot2, bot3, bot4, character];
var timer = 0;
var countdownTimeLeft = 3;
setTimeout(function () {
  $(document).keyup(function (event) {
    if (event.key === " " && leftValue < 950) {
      leftValue += 10;
      character.css({
        left: leftValue + "px",
      });
    } else if (event.key !== " " && leftValue < 950) {
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
}, 3100);

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
}, 3100);

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
}, 3100);

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
}, 3100);

setInterval(() => {
  players.forEach((player) => {
    if (parseFloat(player.css("left")) >= 950 && !player.fms) {
      $("#info").append(
        "<p>" +
          player.name +
          " finished with a time of " +
          timer / 1000 +
          " secs</p>"
      );

      $("p").css({
        bottom: "50px",
      });
      player.fms = true;

      if (player.name === "You" && timer / 1000 < bestTime) {
        localStorage.setItem("bestTime", timer / 1000);
        $("#bestTimeInd").text("NEW PB");
        $("#bestTimeInd").css({
          "font-size": "50px",
        });
      }
    }
  });
}, 1);

$("#info").text("Ready,");

var countdown = setInterval(() => {
  countdownTimeLeft--;
  $("#info").text("Set,");

  if (countdownTimeLeft <= 0) {
    clearInterval(countdown);
    $("#info").text("GO!");
    gunShot.play();
    setTimeout(() => {
      $("#info").text(" ");
    }, 1000);
  }
}, 1000);

setTimeout(() => {
  setInterval(() => {
    timer += 10;
    $("#timer").html(timer / 1000 + "secs");
  }, 10);
}, 3000);
