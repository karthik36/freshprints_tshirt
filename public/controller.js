
function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
        ? (object.getSelectionStyles()[styleName] || '')
        : (object[styleName] || '');
};

function setActiveStyle(styleName, value, object) {
    object = object || canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
        var style = { };
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.setCoords();
    }
    else {
        object.set(styleName, value);
    }
    object.setCoords();
    canvas.renderAll();
};

function getActiveProp(name) {
    var object = canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
}

function setActiveProp(name, value) {
    var object = canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    canvas.renderAll();
}


function addAccessors($scope) {

    $scope.getOpacity = function() {
        return getActiveStyle('opacity') * 100;
    };
    $scope.setOpacity = function(value) {
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

    $scope.getFill = function() {
        return getActiveStyle('fill');
    };
    $scope.setFill = function(value) {
        setActiveStyle('fill', value);
    };

    $scope.isBold = function() {
        return getActiveStyle('fontWeight') === 'bold';
    };
    $scope.toggleBold = function() {
        setActiveStyle('fontWeight',
            getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    };
    $scope.isItalic = function() {
        return getActiveStyle('fontStyle') === 'italic';
    };
    $scope.toggleItalic = function() {
        setActiveStyle('fontStyle',
            getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    };

    $scope.getText = function() {
        return getActiveProp('text');
    };
    $scope.setText = function(value) {
        setActiveProp('text', value);
    };

    $scope.getTextAlign = function() {
        return capitalize(getActiveProp('textAlign'));
    };
    $scope.setTextAlign = function(value) {
        setActiveProp('textAlign', value.toLowerCase());
    };

    $scope.getFontFamily = function() {
        return getActiveProp('fontFamily').toLowerCase();
    };
    $scope.setFontFamily = function(value) {
        setActiveProp('fontFamily', value.toLowerCase());
    };

    $scope.getBgColor = function() {
        return getActiveProp('backgroundColor');
    };
    $scope.setBgColor = function(value) {
        setActiveProp('backgroundColor', value);
    };

    $scope.getTextBgColor = function() {
        return getActiveProp('textBackgroundColor');
    };
    $scope.setTextBgColor = function(value) {
        setActiveProp('textBackgroundColor', value);
    };

    $scope.getStroke = function() {
        return getActiveStyle('stroke');
    };
    $scope.setStroke = function(value) {
        setActiveStyle('stroke', value);
    };

    $scope.getStrokeWidth = function() {
        return getActiveStyle('strokeWidth');
    };
    $scope.setStrokeWidth = function(value) {
        setActiveStyle('strokeWidth', parseInt(value, 10));
    };

    $scope.getFontSize = function() {
        return getActiveStyle('fontSize');
    };
    $scope.setFontSize = function(value) {
        setActiveStyle('fontSize', parseInt(value, 10));
    };

    $scope.getLineHeight = function() {
        return getActiveStyle('lineHeight');
    };
    $scope.setLineHeight = function(value) {
        setActiveStyle('lineHeight', parseFloat(value, 10));
    };
    $scope.getCharSpacing = function() {
        return getActiveStyle('charSpacing');
    };
    $scope.setCharSpacing = function(value) {
        setActiveStyle('charSpacing', value);
    };

    $scope.getBold = function() {
        return getActiveStyle('fontWeight');
    };
    $scope.setBold = function(value) {
        setActiveStyle('fontWeight', value ? 'bold' : '');
    };

    $scope.getCanvasBgColor = function() {
        return canvas.backgroundColor;
    };
    $scope.setCanvasBgColor = function(value) {
        canvas.backgroundColor = value;
        canvas.renderAll();
    };

    $scope.addText = function() {
        var text = 'Insert Text Here\n';

        var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });
        canvas.add(textSample);
    };

    $scope.addTextbox = function() {
        var text = 'Insert Text Here\n';

        var textSample = new fabric.Textbox(text.slice(0, getRandomInt(0, text.length)), {
            fontSize: 20,
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            fontWeight: '',
            originX: 'left',
            width: 300,
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };

    $scope.addIText = function() {
        var text = 'Insert Text Here';

        var textSample = new fabric.IText(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };



    document.getElementById('imgLoader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            console.log('fdsf');
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                // start fabricJS stuff
                var image = new fabric.Image(imgObj);
                image.set({
                    left: 150,
                    top: 150,
                    angle: 0,
                    padding: 10,
                    cornersize: 10
                });
                //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                canvas.add(image);

                // end fabricJS stuff
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };



    $scope.confirmClear = function() {
        if (confirm('Are you sure?')) {
            canvas.clear();
        }
    };

    $scope.rasterize3x = function() {
        $scope.rasterize(3);
    }

    $scope.rasterize = function(multiplier) {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('This browser doesn\'t provide means to serialize canvas to an image');
        }
        else {
            var data = canvas.toDataURL({ multiplier: multiplier, format: 'png' });
            document.getElementById('canvasRasterizer').src = data;
        }
    };

    $scope.rasterizeSVG = function() {
        document.getElementById('SVGRasterizer').innerHTML = canvas.toSVG();
    };

    $scope.rasterizeJSON = function() {
        $scope.setConsoleJSON(JSON.stringify(canvas));
    };

    $scope.getSelected = function() {
        return canvas.getActiveObject();
    };

    $scope.removeSelected = function() {
        var activeObjects = canvas.getActiveObjects();
        canvas.discardActiveObject()
        if (activeObjects.length) {
            canvas.remove.apply(canvas, activeObjects);
        }
    };


    $scope.getRotationLock = function() {
        return getActiveProp('lockRotation');
    };
    $scope.setRotationLock = function(value) {
        setActiveProp('lockRotation', value);
    };

    $scope.getOriginX = function() {
        return getActiveProp('originX');
    };

    $scope.setOriginX = function(value) {
        setActiveProp('originX', value);
    };

    $scope.getOriginY = function() {
        return getActiveProp('originY');
    };
    $scope.setOriginY = function(value) {
        setActiveProp('originY', value);
    };

    $scope.getObjectCaching = function() {
        return getActiveProp('objectCaching');
    };

    $scope.setObjectCaching = function(value) {
        return setActiveProp('objectCaching', value);
    };

    $scope.getNoScaleCache = function() {
        return getActiveProp('noScaleCache');
    };

    $scope.setNoScaleCache = function(value) {
        return setActiveProp('noScaleCache', value);
    };


    $scope.setTransparentCorners = function(value) {
        return setActiveProp('transparentCorners', value);
    };

    $scope.getHasBorders = function() {
        return getActiveProp('hasBorders');
    };

    $scope.setHasBorders = function(value) {
        return setActiveProp('hasBorders', value);
    };

    $scope.getHasControls = function() {
        return getActiveProp('hasControls');
    };

    $scope.setHasControls = function(value) {
        return setActiveProp('hasControls', value);
    };


    var pattern = new fabric.Pattern({
        source: '/assets/escheresque.png',
        repeat: 'repeat'
    });

    $scope.patternify = function() {
        var obj = canvas.getActiveObject();

        if (!obj) return;

        if (obj.fill instanceof fabric.Pattern) {
            obj.set('fill', null);
        }
        else {
            if (obj instanceof fabric.PathGroup) {
                obj.getObjects().forEach(function(o) { o.set('fill', pattern); });
            }
            else {
                obj.set('fill', pattern);
            }
        }
        canvas.renderAll();
    };

    $scope.clip = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.clipTo) {
            obj.clipTo = null;
        }
        else {
            var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
            obj.clipTo = function (ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            };
        }
        canvas.renderAll();
    };

    $scope.shadowify = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.shadow) {
            obj.shadow = null;
        }
        else {
            obj.setShadow({
                color: 'rgba(0,0,0,0.3)',
                blur: 10,
                offsetX: 10,
                offsetY: 10
            });
        }
        canvas.renderAll();
    };

    $scope.gradientify = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: (getRandomInt(0, 1) ? 0 : obj.width),
            y2: (getRandomInt(0, 1) ? 0 : obj.height),
            colorStops: {
                0: '#' + getRandomColor(),
                1: '#' + getRandomColor()
            }
        });
        canvas.renderAll();
    };

    $scope.execute = function() {
        if (!(/^\s+$/).test(consoleValue)) {
            eval(consoleValue);
        }
    };

   /* var consoleSVGValue = (
        '<?xml version="1.0" standalone="no"?>' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
        '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>' +
        '</svg>'
    );*/


    var _loadSVG = function(svg) {
        fabric.loadSVGFromString(svg, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).centerObject(obj).renderAll();
            obj.setCoords();
        });
    };

    fabric.Line.prototype._findCenterFromElement = function() {
        var x = this.x1 + this.x2;
        var y = this.y1 + this.y2;
        return {
            x: x/2,
            y: y/2,
        }
    }

    fabric.Object.prototype._findCenterFromElement = function() {
        return { x: this.left + this.width/2, y: this.top + this.height/2 };
    }



    function initCustomization() {
        if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
            Cufon.fonts.delicious.offsetLeft = 75;
            Cufon.fonts.delicious.offsetTop = 25;
        }

        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            fabric.Object.prototype.cornerSize = 30;
        }

        fabric.Object.prototype.transparentCorners = false;

        if (document.location.search.indexOf('guidelines') > -1) {
            initCenteringGuidelines(canvas);
            initAligningGuidelines(canvas);
        }
    }

    initCustomization();

    function addTexts() {
        var iText = new fabric.IText('Customize your T-shirt design her', {
            left: 100,
            top: 150,
            fontFamily: 'Helvetica',
            fill: '#333',
            styles: {
                0: {
                    0: { fill: 'red', fontSize: 20 },
                    1: { fill: 'red', fontSize: 30 },
                    2: { fill: 'red', fontSize: 40 },
                    3: { fill: 'red', fontSize: 50 },
                    4: { fill: 'red', fontSize: 60 },

                    6: { textBackgroundColor: 'yellow' },
                    7: { textBackgroundColor: 'yellow' },
                    8: { textBackgroundColor: 'yellow' },
                    9: { textBackgroundColor: 'yellow' }
                },
                1: {
                    0: { textDecoration: 'underline' },
                    1: { textDecoration: 'underline' },
                    2: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    3: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    4: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' }
                },
                2: {
                    0: { fill: 'blue', fontWeight: 'bold' },
                    1: { fill: 'blue', fontWeight: 'bold' },
                    2: { fill: 'blue', fontWeight: 'bold' },

                    4: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    5: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    6: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    7: { fontFamily: 'Courier', textDecoration: 'line-through' }
                },
                3: {
                    0: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    1: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    2: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    3: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    4: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' }
                }
            }
        });

        canvas.add(iText);
    }

    addTexts();


    $scope.getPreserveObjectStacking = function() {
        return canvas.preserveObjectStacking;
    };
    $scope.setPreserveObjectStacking = function(value) {
        return canvas.preserveObjectStacking = value;
    };

    $scope.getEnableRetinaScaling = function() {
        return canvas.enableRetinaScaling;
    };
    $scope.setEnableRetinaScaling = function(value) {
        canvas.enableRetinaScaling = value;
        canvas.setDimensions({
            width: canvas.width,
            height: canvas.height });
        return value
    };

    $scope.getSkipOffscreen = function() {
        return canvas.skipOffscreen;
    };
    $scope.setSkipOffscreen = function(value) {
        return canvas.skipOffscreen = value;
    };

    $scope.getFreeDrawingMode = function() {
        return canvas.isDrawingMode;
    };
    $scope.setFreeDrawingMode = function(value) {
        canvas.isDrawingMode = !!value;
        $scope.$$phase || $scope.$digest();
    };

    $scope.freeDrawingMode = 'Pencil';

    $scope.getDrawingMode = function() {
        return $scope.freeDrawingMode;
    };
    $scope.setDrawingMode = function(type) {
        $scope.freeDrawingMode = type;

        if (type === 'hline') {
            canvas.freeDrawingBrush = $scope.vLinePatternBrush;
        }
        else if (type === 'vline') {
            canvas.freeDrawingBrush = $scope.hLinePatternBrush;
        }
        else if (type === 'square') {
            canvas.freeDrawingBrush = $scope.squarePatternBrush;
        }
        else if (type === 'diamond') {
            canvas.freeDrawingBrush = $scope.diamondPatternBrush;
        }
        else if (type === 'texture') {
            canvas.freeDrawingBrush = $scope.texturePatternBrush;
        }
        else {
            canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);
        }

        $scope.$$phase || $scope.$digest();
    };

    $scope.getDrawingLineWidth = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.width;
        }
    };
    $scope.setDrawingLineWidth = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
        }
    };

    $scope.getDrawingLineColor = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.color;
        }
    };
    $scope.setDrawingLineColor = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    $scope.getDrawingLineShadowWidth = function() {
        if (canvas.freeDrawingBrush && canvas.freeDrawingBrush.shadow) {
            return canvas.freeDrawingBrush.shadow.blur || 1;
        }
        else {
            return 0
        }
    };
    $scope.setDrawingLineShadowWidth = function(value) {
        if (canvas.freeDrawingBrush) {
            var blur = parseInt(value, 10) || 1;
            if (blur > 0) {
                canvas.freeDrawingBrush.shadow = new fabric.Shadow({blur: blur, offsetX: 10, offsetY: 10}) ;
            }
            else {
                canvas.freeDrawingBrush.shadow = null;
            }
        }
    };

    function initBrushes() {
        if (!fabric.PatternBrush) return;

        initVLinePatternBrush();
        initHLinePatternBrush();
        initSquarePatternBrush();
        initDiamondPatternBrush();
        initImagePatternBrush();
    }
    initBrushes();

    function initImagePatternBrush() {
        var img = new Image();
        img.src = '../assets/honey_im_subtle.png';

        $scope.texturePatternBrush = new fabric.PatternBrush(canvas);
        $scope.texturePatternBrush.source = img;
    }

    function initDiamondPatternBrush() {
        $scope.diamondPatternBrush = new fabric.PatternBrush(canvas);
        $scope.diamondPatternBrush.getPatternSrc = function() {

            var squareWidth = 10, squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRectWidth();

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };
    }

    function initSquarePatternBrush() {
        $scope.squarePatternBrush = new fabric.PatternBrush(canvas);
        $scope.squarePatternBrush.getPatternSrc = function() {

            var squareWidth = 10, squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };
    }

    function initVLinePatternBrush() {
        $scope.vLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.vLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }

    function initHLinePatternBrush() {
        $scope.hLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.hLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }
}

function watchCanvas($scope) {

    function updateScope() {
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }

    canvas
        .on('object:selected', updateScope)
        .on('group:selected', updateScope)
        .on('path:created', updateScope)
        .on('selection:cleared', updateScope);
}

designtshirt.controller('CanvasControls', function($scope) {

    $scope.canvas = canvas;
    $scope.getActiveStyle = getActiveStyle;

    addAccessors($scope);
    watchCanvas($scope);
});