enchant();

window.onload = function() {
    var game = new Core(1220, 820);
    game.fps = 8;
    game.preload("horse1.png", "finishLine.gif", 'bg.gif');

    var Horse = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 102, 91);


            this.x = x;
            this.y = y+170;
           this.image = game.assets['horse1.png'];
           this.frame = 5;
          game.rootScene.addChild(this);



        }
    });

    var Finishline = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 4, 551);
            this.x = x;
            this.y = y;
            this.opacity=0.2;
            this.image = game.assets['finishLine.gif'];
            this.frame = 5;
            game.rootScene.addChild(this);

        }
    });


    var Messageboard = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, message) {
            var label = new enchant.Label();
            label.text = message;
            label.width = 228;
            label.height = 64;
            label.x = x;
            label.y = y;
            label.font = "19px 'Arial'";
            label.addEventListener("touchstart", function() {
                game.gameStart = true;
                label.text = "";
            });
            label.addEventListener('enterframe', function() {
                if (positionQueue.length >= 10) {
                    label.text = "1. winner is " + positionQueue[0] + "<br>2. runner Up is " + positionQueue[1] + "<br>3. Third is " + positionQueue[2];
                    for (i = 3; i < 10; i++) {
                        var pos = i + 1;
                        label.text += "<br>" + pos + ".  " + positionQueue[i];
                    }
                }
            });
            game.rootScene.addChild(label);
        }
    });

    var Rookey = enchant.Class.create(Horse, {
        initialize: function(x, y, name) {
            Horse.call(this, x, y);
            this.name = name;
            this.crossed = false;
            this.addEventListener('enterframe', function() {
                if (game.gameStart == true) {
                    if (parseInt(this.x) > parseInt(finishLine.x) && parseInt(this.x) < parseInt(finishLine.x) + 50) { // Temporory code change this to finishLine position. 
                        this.x == finishLine.x + 71;
                        if (positionQueue.length < 10 && this.crossed == false) {
                            for (i = 0; i < 10; i++) {
                                if (typeof positionQueue[i] == "undefined" && this.crossed == false) {
                                    positionQueue[i] = this.name;
                                    this.crossed = true;
                                    return true;
                                }
                            }
                        }

                    } else {
                        this.x += rand(32);
                        this.frame = this.age % 2 + 5;
                    }
                }
            });
        }
    });


    var FinishLine; //Global Varible so that exposed to Rookey classs;
    var winner = false,
        runnerUp = false,
        consolation = false;
    var positionQueue = [];

    game.onload = function() {
        this.gameStart = false;
        game.rootScene.backgroundColor = "#FFFF";
       

       background = new Sprite(1220, 810);  // 320x320 サイズの Sprite オブジェクトを生成
        background.x = background.y = 0;    // Sprite の左上の x, y 座標を指定
       // background.width=1200;
       // background.height=820;
        background.image = game.assets['bg.gif'] // bg.png を指定
        game.rootScene.addChild(background);


        playerList = 10; // Make this dynamic in future;
        var messageBoard = new Messageboard(450, 10, "Racecourse to Rich <br><br>click to start");


        //Creating finishingLine
        finishLine = new Finishline(1020, 230);
        for (i = 0; i < playerList; i++) {
            var pos = i + 1;
          var rookey = new Rookey(10, 55 * i, "rookey" + pos); // *change* This is tempory code change in to Rookey name dynamically
        }






    };

    game.start();
};

function rand(num) {
    return Math.floor(Math.random() * num)
};
