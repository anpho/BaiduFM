var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.initBBUI();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    config: {},
    loadConfig: function() {
        if (!localStorage.getItem('firstrun')) {
            //第一次安装后运行
            this.config['version'] = blackberry.app.version;
            this.config['darktheme'] = true;
            this.config['wifionly'] = false;
            this.config['unlocked'] = true; //2016.07.07 enable download 
            this.config['firstrun'] = true;
            this.config['playrate'] = 64;
            this.config['downloadrate'] = 128;
            this.config['lastchannel'] = 33;
            this.config['darkscreenbgColor'] = '#262626';
            this.config['darkscreencolor'] = '#88919A';
            this.saveConfig();
            localStorage.setItem('firstrun', this.config['version']);
        } else {
            //已运行过
            this._loadConfig();
            this.config['unlocked'] = true; //2016.07.07 for old users to enable download feature
            
            if (this.config.version !== blackberry.app.verison) {
                //升级判定，保存的版本号不一致，说明版本已变更
                this.config['firstrun'] = true;
            }
        }
    },
    saveConfig: function() {
        localStorage.setItem('config', JSON.stringify(this.config));
    },
    _loadConfig: function() {
        this.config = JSON.parse(localStorage.getItem('config'));
    },
    initBBUI: function() {
        this.loadConfig();
        /*if (!Bbm.registered) {
            Bbm.register();
        }*/
        bb.init({
            controlsDark: app.config.darktheme,
            listsDark: app.config.darktheme,
            onscreenready: function(e, id) {
                bb.screen.controlColor = (app.config['darktheme']) ? 'dark' : 'light';
                bb.screen.listColor = (app.config['darktheme']) ? 'dark' : 'light';
                if (app.config.darktheme) {
                    var screen = e.querySelector('[data-bb-type=screen]');
                    if (screen) {
                        screen.style['background-color'] = app.config.darkscreenbgColor;
                    }
                    if (!document.body.classList.contains("dark")) {
                        document.body.classList.add("dark")
                    }
                } else {
                    if (document.body.classList.contains("dark")) {
                        document.body.classList.remove("dark");
                    }
                }
                if (id === 'player') {
                    if (app.config.unlocked) {
                        e.getElementById('menudownload').setAttribute('data-bb-visible', 'true');
                    } else {
                        e.getElementById('menudownload').setAttribute('data-bb-visible', 'false');
                    }
                }
                if (id === 'settings') {
                    var dbutton = e.getElementById('downloadrate');
                    dbutton.disabled=true;
                    var buttons = e.querySelectorAll('[data-bb-type=button]');
                    var showcodebutton = e.getElementById('showcode');
                    if (app.config.unlocked) {
                        for (var i=0;i<buttons.length;i++) {
                            buttons[i].style.display = 'none';
                        }
                        dbutton.disabled=false;
                        showcodebutton.style.display = 'block';
                    } else {
                        showcodebutton.style.display = 'none';
                        for (var i=0;i<buttons.length;i++) {
                            console.log(i);
                            if (buttons[i].id !== "showcode")
                                buttons[i].style.display = 'block';
                        }
                    }
                }
            },
            ondomready: function(e, id, param) {
                if (id === 'player') {
                    Player.init();
                    Player.updateTitlebar();

                    //LRC.load('http://music.baidu.com/data2/lrc/13764539/13764539.lrc');
                    //Player.player.src = 'http://zhangmenshiting.baidu.com/data2/music/42241598/27851257600128.mp3?xcode=58cfc1038af30fad7c498ac14eafd4a538cc13189dd7f464';
                    //Player.player.play();
                }
                if (id === 'settings') {
                    app.loadSettings(e);
                }
            }
        });
        if (app.config.darktheme) {
            document.body.style['background-color'] = app.config.darkscreenbgColor;
            document.body.style['color'] = app.config.darkscreencolor;
        }
        bb.pushScreen('player.html', 'player');
        navigator.splashscreen.hide();
        ChannelManager.switchto(app.config.lastchannel);
    },
    loadSettings: function(e) {
        //载入settings页面的数据
        var pbutton = e.getElementById('playbackrate');
        switch (app.config['playrate']) {
            case '192':
                pbutton.setSelectedItem(2);
                break;
            case '128':
                pbutton.setSelectedItem(1);
                break;
            default:
                pbutton.setSelectedItem(0);
        }//收听音质选择

        var dbutton = e.getElementById('downloadrate');
        if (app.config.unlocked) {
            switch (app.config['downloadrate']) {
                case '320':
                    dbutton.setSelectedItem(3);
                    break;
                case '192':
                    dbutton.setSelectedItem(2);
                    break;
                case '128':
                    dbutton.setSelectedItem(1);
                    break;
                default:
                    dbutton.setSelectedItem(0);
            }//下载音质选择
        } else {
            dbutton.setSelectedItem(0);
        }

    }
};

var Menu = {
    settings: function() {
        bb.pushScreen('settings.html', 'settings');
    },
    about: function() {
        bb.pushScreen('about.html', 'about');
    },
    rate: function() {
        Invoke.blackberryWorld.app(54702889);
    },
    feedback: function() {
        Invoke.email("anphorea@gmail.com", "[MUSICBOX]FEEDBACK", "");
    },
    playbackratechangeHandler: function(e) {
        app.config.playrate = e.value;
        app.saveConfig();
    },
    downloadratechangeHandler: function(e) {
        if (app.config.unlocked) {
            app.config.downloadrate = e.value;
            app.saveConfig();
        } else {
            e.setSelectedItem(0);
        }
    }
};



function showcode() {
    var k = genCode();
    if (k) {
        Toast.withButton('你的解锁码是:' + k, "确定", function() {
        });
    } else {
        Toast.withButton("BBM未连接,请授权后重试.", "确定", function() {
        });
    }

}

function genCodeBy(key) {
    var step1 = CryptoJS.MD5(key).toString() + "|anpho.baidufm";
    var step2 = CryptoJS.MD5(step1).toString();
    var code = step2.charAt(1) + step2.charAt(9) + step2.charAt(8) + step2.charAt(5);
    return code.toLowerCase();
}

function genKey() {
    var k = Bbm.getppid();
    if (k) {
        return genCodeBy(k);
    } else {
        return null;
    }
}

function genCode() {
    var k = genKey();
    if (k) {
        return genCodeBy(k);
    } else {
        return null;
    }
}