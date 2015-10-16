function changeColor(body, header, cardAction, cardHeader) {
    $("body").css('background-color', body);
    $("#header").css('background-color', header);
    $(".card .card-action a").css('background-color', cardAction);
    $(".card-header").css('background-color', cardHeader);
};


// changeColor('#e8ffb1','#48829e','#51dacf','#9ef5cf');
// changeColor('#f1f4c6','#837d7d','#aaa6a4','#d6d0b8');
// changeColor('#e8e3c7','#a65238','#d4ceb0','#b85b3f');
// changeColor('#eeeeee','#00adb5','#393e46','#00adb5');
// changeColor('#ecf0f1','#2196f3','#f44336','#2196f3');
