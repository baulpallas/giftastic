var buttonArray = [
  "Jason Derulo",
  "Owl City",
  "Flo Rida",
  "Black Eyed Peas",
  "Miley Cyrus",
  "David Guetta",
  "BoB",
  "Ne-Yo",
  "Omarion",
  "Chris Brown",
  "Daddy Yankee",
  "Kevin Rudolph",
  "T Pain"
];
var limit = 10;
var buttonInput;
var buttonResponseArr;
var buttonURL;
var searchInput;

function renderButtons() {
  for (var i = 0; i < buttonArray.length; i++) {
    var topButtons = $("<button>").text(buttonArray[i]);
    topButtons.addClass("topButton btn btn-primary m-2");
    $(".button-holder").append(topButtons);
  }
}
renderButtons();

$(".button-holder").on("click", ".topButton", function() {
  $(".row1").html("");
  $(".row2").html("");
  $(".row3").html("");
  buttonInput = this.textContent;
  buttonURL = `https://api.giphy.com/v1/gifs/search?q=${buttonInput}&api_key=1HmF2ApULJrVnZjcuLpVIaVwjx8w6ZCi&limit=${limit}`;
  $.ajax(buttonURL).then(function(response) {
    buttonResponseArr = response.data;
    renderGifs(buttonResponseArr);
  });
});

$(".search-btn").click(function(event) {
  event.preventDefault();
  $(".row1").html("");
  $(".row2").html("");
  $(".row3").html("");
  searchInput = $("#gifInput")
    .val()
    .trim();

  buttonArray.push(searchInput);
  $(".button-holder").html("");
  renderButtons();
});

function renderGifs(array) {
  for (var i = 0; i < limit; i++) {
    if (i < 3) {
      $(
        ".row1"
      )[0].innerHTML += `<div class="col-4"><p class="font-weight-bold text-center">${array[i].title}</p><img
      src="${array[i].images.fixed_height_small.url}"
      alt="${array[i].images.fixed_height_small_still.url}"
      data-alt="${array[i].images.fixed_height_small.url}"
      data-state="animated"
      width="100%"
      class="giphy-embed"
      allowfullscreen
    ></div>`;
    }
    if (i > 3 && i < 7) {
      $(
        ".row2"
      )[0].innerHTML += `<div class="col-4"><p class="font-weight-bold text-center">${array[i].title}</p><img
      src="${array[i].images.fixed_height_small.url}"
      alt="${array[i].images.fixed_height_small_still.url}"
      data-alt="${array[i].images.fixed_height_small.url}"
      data-state="animated"
      width="100%"
      class="giphy-embed"
      allowfullscreen
    ></div>`;
    } else if (i > 7) {
      $(
        ".row3"
      )[0].innerHTML += `<div class="col-4"><p class="font-weight-bold text-center">${array[i].title}</p><img
      src="${array[i].images.fixed_height_small.url}"
      alt="${array[i].images.fixed_height_small_still.url}"
      data-alt="${array[i].images.fixed_height_small.url}"
      data-state="animated"
      width="100%"
      class="giphy-embed"
      allowfullscreen
    ></div>`;
    }
  }
}

$(".gifContainer").on("click", ".giphy-embed", function() {
  var stillGif = $(this).attr("alt");
  var animGif = $(this).attr("data-alt");
  if ($(this).attr("data-state") === "animated") {
    $(this).attr("data-state", "still");
    $(this).attr("src", stillGif);
  } else if ($(this).attr("data-state") === "still") {
    $(this).attr("src", animGif);
    $(this).attr("data-state", "animated");
  }
});
