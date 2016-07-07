/*
 * Track object
 */
function Track(trackobj) {
    this.inforetreved = trackobj.inforetreved;
    this.albumName = trackobj.albumName;
    this.songName = trackobj.songName;
    this.artistName = trackobj.artistName;
    this.id = trackobj.id;
    this.songlink = trackobj.songlink;
    this.lrcLink = trackobj.lrcLink;
    this.songPicSmall = trackobj.songPicSmall;
    this.songPicBig = trackobj.songPicBig;
    this.songPicRadio = trackobj.songPicRadio;
    this.time = trackobj.time;
    this.rate = trackobj.rate;
    this.size = trackobj.size;
}
/*
 * Playlist Manager
 */
var Plmgr = {
    playlist: [], //Track objects
    channelId: null,
    channelName: null,
    channelURL: null,
    playhistory: [],
    currentTrack: -1, //Track index of this.playlist[]
    getNextTrack: function() {
        if (this.currentTrack + 1 === this.playlist.length) {
            //empty, goto 0
            this.currentTrack = 0;
        } else {
            this.currentTrack++;
            Plmgr.playhistory.push(Plmgr.playlist[this.currentTrack]);
        }

        return this.playlist[this.currentTrack];
    },
    getPrevTrack: function() {
        if (this.currentTrack - 1 < 0) {
            //empty, goto 0
            this.currentTrack = this.playlist.length - 1;
        } else {
            this.currentTrack--;
            Plmgr.playhistory.push(Plmgr.playlist[this.currentTrack]);
        }

        return this.playlist[this.currentTrack];
    },
    getNextTrackRandom: function() {

    },
    updateInfoAsync: function(callback) {
        var playrate = app.config['playrate'];
        for (var i = 0; i < this.playlist.length; i++) {
            if (!this.playlist[i].inforetreved) {
                baidufm.api.getTrackByIdEx(i, playrate, function(index, data) {
                    var ind = Plmgr.playlist[index];
                    var info = data[0];
                    if (ind.id == info.songId) {
                        //符合，开始替换数据
                        ind.albumName = info.albumName;
                        ind.songName = info.songName;
                        ind.artistName = info.artistName;
                        ind.songlink = info.songLink;
                        ind.lrcLink = info.lrcLink;
                        ind.songPicSmall = info.songPicSmall;
                        ind.songPicBig = info.songPicBig;
                        ind.songPicRadio = info.songPicRadio;
                        ind.time = info.time;
                        ind.rate = info.rate;
                        ind.size = info.size;
                        //设置标志位
                        ind.inforetreved = true;
                    }

                    if (index === 0) {
                        if (callback) {
                            //如果设置了callback，此时回调第一个Playlist元素。
                            Plmgr.currentTrack = 0;//当前曲目指针设置为0
                            Plmgr.playhistory.push(Plmgr.playlist[0]);//计入历史记录
                            callback(Plmgr.playlist[0]);
                            //回调当前track
                        }
                    }
                });
            }
        }

    },
    loadFromURL: function(url) {
        Plmgr.playlist = [];
        $.getJSON(url).done(function(data) {
            if (data) {
                console.log(data);
                User.id = data["user_id"];
                User.name = data["user_name"];
                Plmgr.channelId = data['channel_id'];
                Plmgr.channelName = data['channel_name'];
                var li = data['list'];
                for (var i = 0; i < li.length; i++) {
                    //取每首歌的ID，放入playlist[]
                    var songid = li[i]['id'];
                    var song = new Track({
                        id: songid
                    });
                    Plmgr.playlist.push(song);
                }
                Plmgr.updateInfoAsync(function(track) {
                    Player.play(track);
                });
            } else {
                Toast.regular(url + "载入失败", 1500);
            }
        }).fail(function(e) {
            console.error(e);
            try {
                blackberry.ui.dialog.standardAskAsync("音乐服务暂时无法连接，请检查网络连接后重试。注意：本服务仅限中国大陆用户使用(For P.R.C only)", blackberry.ui.dialog.D_OK, function(r) {
                    //bb.popScreen();
                }, {title: "网络错误"});
            } catch (e) {
                Toast.regular("Exception in standardDialog: " + e, 3000);
            }
        });
    }
};
var User = {
    id: null,
    name: null
};
/*
 * Favorites Manager
 */
var Favorites = {
    favTracks: [],
    addToFav: function(trackobj) {
        /*
         * add track to favorite
         */
        this.favTracks.push(trackobj);
        this.saveToStorage();
    },
    removeFromFav: function(trackobj) {
        /*
         * remove specified track from favorite
         */
        var id = trackobj.id;
        for (var i = 0; i < favTracks.length; i++) {
            if (favTrack[i].id === id) {
                favTracks.splice(i, 1);
                this.saveToStorage();
                break;
            }
        }
    },
    loadFromStorage: function() {
        /*
         * load fav from storage,if not set,set one.
         */
        var f = localStorage.getItem('fav');
        if (f) {
            this.favTracks = JSON.parse(f);
        } else {
            this.saveToStorage();
        }
    },
    saveToStorage: function() {
        /*
         * save fav to storage
         */
        var j = JSON.stringify(this.favTracks);
        localStorage.setItem('fav', j);
    }
};
/*
 * The player.
 */
var Player = {
    current: null,
    player: null,
    updateTitlebar: function() {
        if (this.current) {
            var tb = document.getElementById('titlebar');
            if (tb) {
                tb.setAccentText(this.current.artistName + " " + this.current.albumName);
                tb.setCaption(this.current.songName);
                tb.setImage(this.current.songPicSmall);
                LRC.load(this.current.lrcLink);
            }

            var tabplaying = document.getElementById('playing');
            if (tabplaying) {
                tabplaying.setCaption(this.current.songName);
            }
            var tabchannel = document.getElementById('channel');
            if (tabchannel) {
                tabchannel.setCaption(Plmgr.channelName);
            }

            this.playHandler();
        }
    },
    lrcprefix: "",
    play: function(track) {
        console.log(track);
        this.current = track;
        this.updateTitlebar();
        this.init();
        if (this.player) {
            this.player.pause();
        }
        this.player.src = this.current.songlink;
        this.player.play();
    },
    init: function() {
        if (this.player) {
            return;
        }
        this.player = new Audio();
        this.player.addEventListener('play', function() {
            Player.playHandler();
        }, false);
        this.player.addEventListener('pause', function() {
            Player.pauseHandler();
        }, false);
        this.player.addEventListener('ended', function() {
            Player.endHandler();
        }, false);
        this.player.addEventListener('error', function() {
            Player.errorHandler();
        }, false);
        this.player.addEventListener('waiting', function() {
            Player.waitingHandler();
        }, false);
        this.player.addEventListener('timeupdate', function() {
            LRC.timehandler();
        }, false);
    },
    playHandler: function() {
        /*
         * when start to play, or user paused then un-paused the play process via hardware key.
         */
        try {
            document.getElementById('playbutton').setImage('img/ic_pause.png');
            document.getElementById('playbutton').setCaption('暂停');
            community.preventsleep.setPreventSleep(true);
        } catch (e) {
            console.error(e);
        }
    },
    pauseHandler: function() {
        /*
         * when user taps button to pause or use hardware key to pause.
         */
        try {
            document.getElementById('playbutton').setImage('img/ic_play.png');
            document.getElementById('playbutton').setCaption('播放');
            community.preventsleep.setPreventSleep(false);
        } catch (e) {
            console.error(e);
        }
    },
    endHandler: function() {
        /*
         * when a song is over.
         */
        //从Playlist中获取下一首音乐进行播放
        this.play(Plmgr.getNextTrack());
    },
    errorHandler: function() {
        /*
         * when error happens,should display a toast and move next.
         */
        this.play(Plmgr.getNextTrack());
    },
    waitingHandler: function() {
        /*
         * when buffering.should give a indictactor.
         */
    }
};

var Tab = {
    show: function(tab) {
        try {
            document.querySelector('.playing').classList.add('invisable');
            document.querySelector('.channel').classList.add('invisable');
            document.querySelector('.fav').classList.add('invisable');
            document.querySelector('.playlist').classList.add('invisable');
        } catch (e) {
            console.error(e);
        }
        setTimeout(function() {
            try {
                document.querySelector('.' + tab).classList.remove('invisable');
            } catch (e) {
                console.error(e);
            }
            if (tab === 'playlist') {
                UI.showPlaylist();
            }
        }, 0);
    },
    switchTo: function(tab) {
        this.show(tab);
        if (document.getElementById('ab'))
            document.getElementById('ab').setSelectedTab(document.getElementById(tab));
    }
};

var LRC = {
    load: function(url, callback) {
        this.scrollPanel = document.getElementById('lyrics');
        //清空歌词
        var target = this.scrollPanel.firstElementChild;
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
        document.getElementById('actind').style.display="block";
        $.get(url).done(function(text) {
	        console.log(text);
            LRC.loadText(text);
            LRC.process();
            LRC.buildHTML();
            if (callback) {
                callback(true);
            }
        }).fail(function(e) {
            console.error(e);
            this.scrollPanel.firstElementChild.appencChild(document.createTextNode("载入歌词失败。"));
            if (callback) {
                callback(false);
            }
        });
    },
    loadText: function(text) {
        this.lines = text.split('\n');
    },
    lines: [],
    linesEx: [],
    timetag: /\[(\d+:\d+(\.|:)?\d*)\]/ig,
    process: function() {
        this.linesEx = [];
        for (var i = 0; i < this.lines.length; i++) {
            var content = this.lines[i].replace(/\[\d*:\d*((\.|\:)\d*)*\]/g, '');
            this.timetag.lastIndex = 0;
            var t = this.timetag.exec(this.lines[i]);
            while (t) {
                t = t[1];
                var p = t.split(":");
                t = parseInt(p[0]) * 60 + parseFloat(p[1]);
                this.linesEx.push({
                    time: t,
                    line: content
                });
                t = this.timetag.exec(this.lines[i]);
            }
        }
        this.linesEx.sort(function(a, b) {
            if (a.time > b.time)
                return 1;
            else if (a.time < b.time)
                return -1;
            else
                return 0;
        });
        this.cursor = 0;
        this.lines = [];
    },
    buildHTML: function() {
        //清空歌词
        var target = this.scrollPanel.firstElementChild;
        this.dx = this.scrollPanel.clientHeight / 2;//偏移
        var df = document.createDocumentFragment();
        for (var i = 0; i < this.linesEx.length; i++) {
            var li = document.createElement('div');
            li.id = this.prefix + this.linesEx[i].time;
            li.innerHTML = this.linesEx[i].line;
            df.appendChild(li);
        }
        target.appendChild(df);
        document.getElementById('actind').style.display="none";
    },
    dx: 0,
    scrollTo: function(id) {
        this.dx = this.scrollPanel.clientHeight / 2;//偏移，万一旋转了屏幕，可以及时更新
        if (!this.linesEx[id])
            return;
        var el = document.getElementById(this.prefix + this.linesEx[id].time);
        if (el) {
            var t = this;
            //window.webkitRequestAnimationFrame(function() {
            t.highlight(el);
            t.scrollPanel.scrollTo(el.offsetTop - t.dx);
            //});
        }
    },
    highlight: function(dom) {
        var c = dom;
        c.classList.add('highlight');
        while (c.previousElementSibling) {
            c = c.previousElementSibling;
            c.classList.remove('highlight');
        }
    },
    scrollPanel: null,
    prefix: 'anpho',
    cursor: 0,
    timehandler: function() {
        var time = Player.player.currentTime;
        //  如果下一句歌词的时间还未到，则继续显示当前行歌词
        while (this.linesEx[LRC.cursor] && time >= this.linesEx[LRC.cursor].time) {
            LRC.cursor += 1;
        }
        this.scrollTo(LRC.cursor - 1);
    }
};

var ChannelManager = {
    currenturl: null,
    switchto: function(id) {
        app.config['lastchannel'] = id;
        UI.playlistloaded = false;
        app.saveConfig();
        console.log("频道 " + id + " 已选中");
        this.currenturl = baidufm.api.channels[parseInt(id)]['url'];
        console.log("频道地址为: " + this.currenturl);
        //将目标URL导入playlist，交由Playlist进行下一步操作（取信息、播放）
        Plmgr.loadFromURL(this.currenturl + new Date().getTime());
        Tab.switchTo('playing');
    }
};

var UI = {
    playlistloaded: false,
    showPlaylist: function() {
        console.time('showplaylistinit');
        document.getElementById('plind').style.display = "block";
        var t = this;
        var playlistpanel = document.getElementById('playlistlist');
        if (playlistpanel.getItems().length === 0) {
            t.playlistloaded = false;
        }
        if (t.playlistloaded) {
            document.getElementById('plind').hide();
            return;
        }
        playlistpanel.clear();
        console.timeEnd('showplaylistinit');
        setTimeout(function() {
            console.time('prepareItems');
            //Plmgr.playlist
            var items = [],
                    item;
            for (var i = 0; i < Plmgr.playlist.length; i++) {
                if (!Plmgr.playlist[i].inforetreved) {
                    continue;
                }
                item = document.createElement('div');
                item.setAttribute('data-bb-type', 'item');
                item.setAttribute('data-bb-title', Plmgr.playlist[i].songName);
                item.setAttribute('data-bb-id', i);
                item.setAttribute('data-bb-songid', Plmgr.playlist[i].id);
                item.innerHTML = Plmgr.playlist[i].artistName;
                item.onclick = function() {
                    var selectedItem = document.getElementById('playlistlist').selected;
                    var id = parseInt(selectedItem.getAttribute('data-bb-id'));
                    var track = Plmgr.playlist[id];
                    Plmgr.currentTrack = id;
                    Player.play(track);
                };
                item.onbtnclick = function() {
                    var selectedItem = document.getElementById('playlistlist').selected;
                    var id = parseInt(selectedItem.getAttribute('data-bb-id'));
                    Plmgr.playlist[id].inforetreved = false;
                    selectedItem.remove();
                };
                //items.push(item);
                playlistpanel.appendItem(item);
            }
            console.timeEnd('prepareItems');
            //console.time('refreshItems');
            //playlistpanel.refresh(items);
            //console.timeEnd('refreshItems');
            document.getElementById('plind').hide();
            t.playlistloaded = true;
        }, 10);

    },
    prev: function() {
        Player.play(Plmgr.getPrevTrack());
    },
    playtoggle: function() {
        if (Player.player.paused) {
            Player.player.play();
        } else {
            Player.player.pause();
        }
    },
    next: function() {
        Player.play(Plmgr.getNextTrack());
    },
    download: function(u) {

        var downloadrate = app.config.downloadrate;
        var pbrate = app.config.playrate;
        if (downloadrate === pbrate) {
            invocation.Browser.openurl(Player.current.songlink, function(d) {
                console.log(d);
            });
        } else {
            var songid = Player.current.id;
            baidufm.api.getTrackBySongid(songid, downloadrate, function(data) {
                console.log("开始下载");
                console.log(data[0]);
                if (data[0].rate !== parseInt(downloadrate)) {
                    Toast.regular("没有指定速率的源，将以" + data[0].rate + "Kbps下载");
                }
                invocation.Browser.openurl(data[0].songLink, function(e) {
                    console.log(e);
                });
            });
        }
    }, unlockSuccess: function() {
        app.config.unlocked = true;
        app.saveConfig();
        document.getElementById('downloadrate').enable();
        jQuery('#showcode').css('display', 'block');
        document.getElementById('unlockind').hide();
    }, unlockFail: function() {
        document.getElementById('unlockind').hide();
        jQuery('[data-bb-type=button]:not(#showcode)').css('display', 'block');
    }, hideElements: function() {
        jQuery('[data-bb-type=button]').css('display', 'none');
        document.getElementById('unlockind').show();
    },
    purchase: function() {
        this.hideElements();
        UI.unlockSuccess();
        /*
        setTimeout(function() {
            try {
                blackberry.payment.purchase({
                    "digitalGoodSKU": "MUSICBOX_DOWNLOAD"
                },
                function(purchasedItem) {
                    var transId = purchasedItem.transactionID;
                    var sku = purchasedItem.digitalGoodSKU;
                    var dgId = purchasedItem.digitalGoodID;
                    console.log("Purchased Item: " + transId + "," + sku + "," + dgId);
                    UI.unlockSuccess();
                }, function(error) {
                    console.error(error);
                    if (error.errorID == 5) {
                        UI.unlockSuccess();
                    } else {
                        UI.unlockFail();
                    }
                }
                );
            } catch (e) {
                console.error(e);
                UI.unlockFail();
            }
        }, 1);*/
    },
    refresh: function() {
        this.hideElements();
        var t = this;
        t.unlockSuccess();
        /*
        setTimeout(function() {
            try {
                blackberry.payment.getExistingPurchases(true, function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var transId = data[i].transactionID;
                        var sku = data[i].digitalGoodSKU;
                        var dgId = data[i].digitalGoodID;
                        console.log("Purchased Item " + i + ": " + transId + "," + sku + "," + dgId);
                        if (sku === 'MUSICBOX_DOWNLOAD') {
                            t.unlockSuccess();
                            return;
                        }
                    }
                }, function(e) {
                    console.error(e);
                    Toast.regular(e.errorText, 3000);
                    t.unlockFail();
                });
            } catch (e) {
                console.error(e);
                t.unlockFail();
            }

        }, 1);*/
    },
    unlock: function() {
        this.hideElements();
        var k = genKey();
        var t = this;
        t.unlockSuccess();
        /*
        if (k) {
            //show dialog
            try {
                blackberry.ui.dialog.standardAskAsync("你可通过支付宝支付5元RMB至anphorea@gmail.com，并附上此编码：   " + k + "    来索取解锁码。如果你已有解锁码，请在此输入。",
                        blackberry.ui.dialog.D_PROMPT, function(result) {
                            if (result.return === 'Ok' && result.promptText) {
                                var key = result.promptText.toLowerCase();
                                var code = genCode();
                                console.log(code);
                                console.log(key);
                                if (code === key) {
                                    //unlock
                                    Toast.regular("解锁成功。", 1500);
                                    t.unlockSuccess();
                                } else {
                                    Toast.regular("抱歉，解锁码无效。", 1500);
                                    t.unlockFail();
                                }
                            } else {
                                Toast.regular("抱歉，解锁码无效。", 1500);
                                t.unlockFail();
                            }
                        }, {title: "使用解锁码解锁"});
            } catch (e) {
                Toast.regular("发生严重错误: " + JSON.stringify(e), 3000);
            }
        } else {
            try {
                blackberry.ui.dialog.standardAskAsync("未连接至BBM，无法使用此功能", blackberry.ui.dialog.D_OK, function(r) {

                }, {title: "错误"});
            } catch (e) {
                Toast.regular("发生严重错误: " + JSON.stringify(e), 3000);
            }
        }*/
    }, showunlockcode: function() {
        if (app.config.unlocked) {
            var k = genCode();
            if (k) {
                Toast.withButton("你的解锁码为：" + k, "确定", function() {
                });
            } else {
                Toast.withButton("未连接至BBM，无法使用此功能", "确定", function() {
                });
            }
        }
    }
};