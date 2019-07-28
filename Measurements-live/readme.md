## Measurements-live

## 静态页面在 public 下面，用了海康 sdk 和 ni 的一个 web component

NI 提供给我们的资料：

> Hi Yi,
>
> 这个是我们上次提到的部分文档。
>
> [Using Measurements Live](https://measurementslive.ni.com/cdn/coursewaredoc.html): 这个文档可以告诉老师怎么样把 Measurements Live 嵌入到自己的 courseware，然后通过 Measurements Live 直接使用给我们提供的仪器软面板
>
> [Setting up Custom Signaling Server](https://measurementslive.ni.com/cdn/coursewaredoc.html)：这个文档可以教老师如何搭建自己的 Signaling Server 管理自己的 ELVIS III
>
> 进行 Application Board 和 Courseware 开发是否需要额外的授权，你以 Xiaojin 的信息为准。
>
> Yan Jin

项目大致信息：
由于未配置反向代理，我们有一个 express server 和一个 node 写的小脚本，这两个程序走 mqtt 通信，node 脚本和 Evlis III 之前有一个 socket 通信，需要开始烧写就发一个 1，那边会返回一些东西的

---

## 通用信息

### 使用方法

安装依赖

```
npm install
```

前台运行，并在浏览器中访问索引页

```
npm run dev
```

使用 forever 后台运行

```
npm run serve
```

> forever 安装方式
>
> ```
> npm install forever -g
> ```

### 配置文件说明（按需配置）

- static：静态文件目录
- port：监听端口
- mode：最终以哪端文件为准，
- db：数据库配置
  - host：服务器 ip
  - user：登陆 user
  - password：密码
  - database：数据库名
- mail：发送邮件的账号
- cos：腾讯云对象存储配置
