# Elvis

##### 1、文件上传（文件上传到服务器，服务器通过mqtt协议转发给树莓派）

进入Measurement-live目录
配置环境

```npm install```

运行

```node index.js```

##### 2、文件传输（从树莓派通过ftp传输到Elvis上）

进入Elvis目录
配置环境：

共三个模块


promise-ftp, mqtt, fs (利用npm手动配置即可)

运行

```node app.js```

