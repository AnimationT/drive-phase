var character = $("#character");
var leftValue = 0;

var character2 = $("#character2");
var leftValue2 = 0;

setTimeout(function () {
  $(document).keydown(function (event) {
    if (event.key === " ") {
      leftValue += 10;
      character.css({
        left: leftValue + "px",
      });
    } else {
      $("#info").text("press space to run");
    }
  });
}, 3000);

setTimeout(function () {
  setInterval(() => {
    leftValue2 += 10;
    character2.css({
      left: leftValue2 + "px",
    });
  }, 200);
}, 3000);

for (let countdown = 3; step > 0; step--) {
  $("#info").text(countdown);
}
