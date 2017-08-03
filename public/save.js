
/*fabric.Image.fromURL('minion.png', function(img){
    img.setWidth(200);
    img.setHeight(200);
    canvas.add(img);
});

$("#b").click(function(){
    $("#c").get(0).toBlob(function(blob){
        saveAs(blob, "myIMG.png");
    });
});*/

/*
function to_image($scope){

    document.getElementById("theimage").src = canvas.toDataURL();
    Canvas2Image.saveAsPNG(canvas);
}*/


$("#b").click(function(){
    $("#canvasT").get(0).toBlob(function(blob){
        saveAs(blob, "myIMG.png");
    });
});

/*
function to_image(){
    //var canvas = document.getElementById("canvasT");
    var context = canvas.getContext("2d");
    var img = canvas.toDataURL("image/png");
    document.write('<img src="'+img+'"/>');
    document.getElementById('canvasImg').src = dataURL;

}*/
