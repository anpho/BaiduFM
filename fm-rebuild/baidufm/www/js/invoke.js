/*
 * This lib is created by anpho ( anphorea@gmail.com ) , check out my open-source projects here: http://github.com/anpho
 */
var invocation = {
	lastError: null,
	invoke: function(options, callback) {
		blackberry.invoke.invoke(options, function() {
			callback(true);
		}, function(e) {
			invocation.lastError = e;
			callback(false);
		});
	},
	twitter: {
		tweet: function(shareText, callback) {
			invocation.invoke({
				target: "Twitter",
				action: "bb.action.SHARE",
				type: "text/plain",
				data: shareText
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		openProfile: function(username, callback) {
			invocation.invoke({
				target: "com.twitter.urihandler",
				action: "bb.action.VIEW",
				uri: "twitter:connect:" + username
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		search: function(word, callback) {
			invocation.invoke({
				target: "com.twitter.urihandler",
				action: "bb.action.VIEW",
				uri: "twitter:search:" + word
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		shareURL: function(url, callback) {
			invocation.invoke({
				target: "Twitter",
				action: "bb.action.SHARE",
				uri: url
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		sharePhoto: function(photouri, callback) {
			var type = null;
			var ext = photouri.lastIndexOf('.');
			ext = photouri.substring(ext + 1).toLowerCase();
			if (ext === 'jpg' || ext === 'jpeg') {
				type = 'image/jpeg';
			} else if (ext === 'gif') {
				type = 'image/gif';
			} else if (ext === 'png') {
				type = 'image/png';
			} else {
				callback(false);
				console.error('File Extension Not Supported.');
				return;
			}
			invocation.invoke({
				target: "Twitter",
				action: "bb.action.SHARE",
				uri: photouri,
				type: type
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	},
	adobeReader: {
		openPDF: function(fileuri, callback) {
			invocation.invoke({
				target: "com.rim.bb.app.adobeReader",
				action: "bb.action.OPEN",
				uri: fileuri,
				type: 'application/pdf'
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		viewPDF: function(fileuri, callback) {
			invocation.invoke({
				target: "com.rim.bb.app.adobeReader",
				action: "bb.action.VIEW",
				uri: fileuri,
				type: 'application/pdf'
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	},
	BBM: {
		shareFile: function(fileuri, callback) {
			invocation.invoke({
				target: "sys.bbm.sharehandler",
				action: "bb.action.SHARE",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		openApp: function(callback) {
			invocation.invoke({
				target: "sys.bbm",
				action: "bb.action.OPEN"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		setDisplayPicture: function(fileuri, callback) {
			invocation.invoke({
				target: "sys.bbm.imagehandler",
				action: "bb.action.SET",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		shareText: function(text, callback) {
			invocation.invoke({
				target: "sys.bbm.sharehandler",
				action: "bb.action.SHARE",
				type: "text/plain",
				data: text
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		shareTextOrImageWithGroups: function(fileuri, callback) {
			invocation.invoke({
				target: "sys.bbgroups.sharehandler",
				action: "bb.action.SHARE",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		inviteOrChat: function(pin, callback) {
			invocation.invoke({
				target: "sys.bbm.sharehandler",
				action: "bb.action.BBMCHAT",
				uri: "pin:" + pin
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		invite: function(pin, callback) {
			invocation.invoke({
				target: "sys.bbm.sharehandler",
				action: "bb.action.INVITEBBM",
				uri: "pin:" + pin
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		videoChatWith: function(pinOrBBID, callback) {
			invocation.invoke({
				target: "sys.service.videochat",
				action: "bb.action.OPEN",
				uri: "dest=" + pinOrBBID + "&video=1"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		voiceChatWith: function(pinOrBBID, callback) {
			invocation.invoke({
				target: "sys.service.videochat",
				action: "bb.action.OPEN",
				uri: "dest=" + pinOrBBID + "&video=0"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		openChannel: function(channelid, callback) {
			invocation.invoke({
				target: "sys.bbm.channels.card.previewer",
				action: "bb.action.OPENBBMCHANNEL",
				uri: "bbmc:" + channelid
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		shareTextOrImageWithChannels: function(fileuri, callback) {
			invocation.invoke({
				target: "sys.bbm.channels.sharehandler",
				action: "bb.action.SHARE",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		startConference: function(pins, callback) {
			var data = {
				"conference": {
					"contacts": []
				}
			};
			for (var i = 0; i < pins.length; i++) {
				data['conference']['contacts'].push({
					"pin": pins[i]
				});
			};
			invocation.invoke({
				target: "sys.bbm.sharehandler",
				action: "bb.action.BBMCONF",
				type: "vnd.bb.bbm/contactlist",
				data: JSON.stringify(data)
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	},
	BlackBerryWorld: {
		open: function(callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		app: function(id, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://content/" + id
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		catagory: function(cata, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://category/" + cata
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		editorializedMerchandisingUnit: function(id, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://emu/" + id
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		search: function(item, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://search/" + item
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		vendor: function(id, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://vendor/" + id
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		myWorld: function(callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://myworld"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		myWorldSubscriptions: function(callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://myworld/subscriptions"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		parentalControl: function(callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://parentalcontrol"
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		custom: function(str, callback) {
			invocation.invoke({
				target: "sys.appworld",
				action: "bb.action.OPEN",
				uri: "appworld://" + str
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		},
		games: function(callback) {
			this.custom('games', function(d) {
				if (callback) callback(d);
			});
		},
		apps: function(callback) {
			this.custom('apps', function(d) {
				if (callback) callback(d);
			});
		},
		music: function(callback) {
			this.custom('music', function(d) {
				if (callback) callback(d);
			});
		},
		video: function(callback) {
			this.custom('video', function(d) {
				if (callback) callback(d);
			});
		}
	},
	BlueTooth: {
		shareLocalFile: function(fileuri, callback) {
			invocation.invoke({
				target: "sys.btviewer",
				action: "bb.action.SHARE",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	},
	HomeScreen: {
		setWallpaper: function(fileuri, callback) {

			invocation.invoke({
				target: 'sys.pictureeditor.setaswallpaper',
				action: "bb.action.SET",
				uri: fileuri
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	},
	Browser: {
		openurl: function(url, callback) {
			invocation.invoke({
				uri: url
			}, function(d) {
				if (callback) {
					callback(d);
				}
			});
		}
	}
};