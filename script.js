var character = $("#character");
var leftValue = 0;

var character2 = $("#character2");
var leftValue2 = 0;
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
    } else {
      $("#info").text("you finished!");
    }
  });
}, 3000);

setTimeout(function () {
  setInterval(() => {
    if (leftValue2 < 950) {
      leftValue2 += 10;
      character2.css({
        left: leftValue2 + "px",
      });
    } else if (leftValue < 950) {
      $("#botInfo").text("bot finished before you");
    }
  }, 140);
}, 3000);

$("#info").text(countdownTimeLeft);

var countdown = setInterval(() => {
  countdownTimeLeft--;
  $("#info").text(countdownTimeLeft);

  if (countdownTimeLeft <= 0) {
    clearInterval(countdown);
    $("#info").text("GO!");
  }
}, 1000);
