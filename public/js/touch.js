var oneTouch = true;
$("#fab-btn").hammer().bind("tap", function() {
    if (oneTouch) toggleFAB();
    oneTouch = !oneTouch;
})
