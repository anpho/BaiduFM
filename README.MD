百度随心听 for BlackBerry 10
===========================

2016.7.7 本应用全面免费，开源的代码中已经注释掉了“解锁”相关的代码。

本项目使用[BlackBerry WebWorks](https://developer.blackberry.com/html5/) 工具编译，界面部分用了 [bbui.js](https://github.com/blackberry/bbUI.js) 来展现原生样式。本项目中使用的插件清单如下：

```
com.blackberry.app 1.0.0 "BlackBerry 10 Application APIs"
com.blackberry.bbm.platform 1.0.0 "BlackBerry 10 BBM Platform APIs"
com.blackberry.community.preventsleep 1.0.0 "Prevent Sleep"
com.blackberry.connection 1.0.0 "BlackBerry 10 Connection APIs"
com.blackberry.invoke 1.0.0 "BlackBerry 10 Invoke APIs"
com.blackberry.invoke.card 1.0.0 "BlackBerry 10 Invoke Card APIs"
com.blackberry.io 1.0.0 "BlackBerry 10 I/O APIs"
com.blackberry.jpps 1.0.0 "BlackBerry 10 JPPS Library"
com.blackberry.payment 1.0.0 "BlackBerry 10 Payment APIs"
com.blackberry.push 1.0.0 "BlackBerry 10 Push APIs"
com.blackberry.system 1.0.0 "BlackBerry 10 System APIs"
com.blackberry.ui.cover 1.0.0 "BlackBerry 10 Cover APIs"
com.blackberry.ui.dialog 1.0.0 "BlackBerry 10 Dialog APIs"
com.blackberry.ui.toast 1.0.0 "BlackBerry 10 Toast APIs"
com.blackberry.utils 1.0.0 "BlackBerry 10 Utilities Library"
org.apache.cordova.network-information 0.2.6 "Network Information"
org.apache.cordova.splashscreen 0.2.6 "Splashscreen"
```

## HOW TO BUILD

由于webworks / cordova带有大量框架内容，本repo内的内容仅为项目内容，clone到本地后，需要使用`webworks create`创建项目，手动添加上面所列插件，然后在项目目录下使用`webworks build`等命令进行编译、调试等，有关webworks工具的使用说明，请参见[BlackBerry WebWorks](https://developer.blackberry.com/html5/) 中的相关内容。

## ABOUT LICENSE

本项目开源但非免费，如果你将其用于收费项目，请联系原作者[EMAIL](mailto:anphorea@gmail.com)以取得授权；如用于免费项目，需保持开源并在项目内包含本文件。
