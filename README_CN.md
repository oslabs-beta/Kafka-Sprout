<p align="center">
 <img src="./kafka_sprout_logo_v3.svg" width="400" height="320">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com"/>
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues"/>
  <img src="https://travis-ci.org/boennemann/badges.svg?branch=master" /> 
</p>

<h2 align="center">Kafka Cluster Management UI Tool</h2>

> [English](README.md) | 中文


## 关于

Kafka Sprout 是一个 Web Gui，让用户容易和快速地开始 Apache Kafka 和 Zookeeper, 不需要代码配置。只需要按一下按钮，用户就可以查看，管理和配置Kafka Cluster。Kafka Sprout 也会让用户观察主要功能表现数据，包括 Request Rate 和 Network I/O Rate。 请试一下！让我们知道您接下来想要什么其他的功能！


<br/>

<h1 align="center"> :wave: 再见，多余的文件，向 Web GUI 问好！</h1>

<h2 align="center"> 开始 Kafka Cluster </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89587313-6a6f2780-d80f-11ea-8ddb-e93972343d20.gif" /></p>

<h2 align="center"> 简单的 Kafka Brokers 的设置 </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89585288-9688a980-d80b-11ea-8817-865065c9e69d.gif" /></p>

<h2 align="center"> 容易添加和删除 Topics </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89585282-938db900-d80b-11ea-84e4-63a6b5b556a8.gif" /></p>

## 特点

#### :rocket:  一按就可以开始 Apache Kafka 和 Zookeeper

#### :heavy_plus_sign:  容易添加和删除 Topics

#### :muscle:  简单的 Kafka Brokers 的设置

#### :vertical_traffic_light:  可显示主要功能表现数据

#### :mag_right:  查看Topic 和Broker 的各种设定

<br/>

## 入门指南

## 安装

1. clone this repo
```sh
git clone https://github.com/oslabs-beta/Kafka-Sprout.git
```
2. install node dependencies
```sh
cd src/main/js
npm i
```
3. run application
```sh
cd ../../..
mvn spring-boot:run
```
4. go to http://localhost:8080/ on your browser

## 设置
#### 要求
* Java (version 11 or newer)
* Maven (version 3.6.3 or newer)
* Kafka (version 0.11.0 or newer)
* Node.js (version 12.18.3 or newer)

## 内置

<a href=“https://spring.io/projects/spring-boot”>Spring Boot</a>
 | <a href=“https://spring.io/guides/gs/messaging-stomp-websocket/”>Spring Web Socket</a>
 | <a href=“https://styled-components.com/”>Styled Components</a>
 | <a href=“https://reactjs.org/”>React</a>
 | <a href=“https://www.typescriptlang.org/”>Typescript</a>
 | <a href=“https://kafka.apache.org/”>Apache Kafka</a>
 
 
## 贡献者

Brian Hong | Midori Yang | Nak Kim | Nicole Ip | Winford Lin

### 贡献者欢迎!!

如果您觉得这个工具很有趣或者有帮助的话，请给一个 :star2: **星** :star2: ，以表示支持！

您可以通过以下方式做出建议：

* 使用 Kafka Sprout 时，请提出任何的问题
* 请通过 Pull Request 解决问题
* 改善相关的文件

All bugs, tasks or enhancements are tracked as <a href="https://github.com/oslabs-beta/Kafka-Sprout/issues">GitHub issues</a>. Issues which might be a good start for new contributors are marked with "good-start" label.

如果您想联系我们，请给我们发送电子邮件 kafkasprout@gmail.com


## License
MIT
