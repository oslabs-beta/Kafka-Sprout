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

> [中文](README_CN.md) | English


## About 

Kafka Sprout is a web GUI that helps you quickly start up Zookeeper and Kafka servers on your local machine without any code configuration. Easily view, manage, and configure your Kafka topics and brokers with a push of a button. Kafka Sprout also displays relevant realtime metrics including Request Rate, Network I/O Rate, etc. Give it a spin and let us know what features you want next! 


<br/>

<h1 align="center"> :wave: Goodbye Clunky Terminal Windows, Hello Web GUI </h1>

<h2 align="center"> Start Cluster </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89587313-6a6f2780-d80f-11ea-8ddb-e93972343d20.gif" /></p>

<h2 align="center"> Configure and Start Brokers </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89585288-9688a980-d80b-11ea-8817-865065c9e69d.gif" /></p>

<h2 align="center"> View, Add, and Delete Topics </h2>

<p align="center"><img src="https://user-images.githubusercontent.com/63560710/89585282-938db900-d80b-11ea-84e4-63a6b5b556a8.gif" /></p>



## Features

#### :rocket:  Push to Start Zookeeper and Kafka Server 

#### :heavy_plus_sign:  Quickly Add and Delete Topics 

#### :muscle:  Setup Kafka Brokers with Ease

#### :vertical_traffic_light:  Monitor Key Performance Metrics

#### :mag_right:  Explore Topic and Broker Configurations

<br/>

## Getting Started

## Installation

1. Clone this repo:
```sh
git clone https://github.com/oslabs-beta/Kafka-Sprout.git
```
2. Run the application in the root folder. This will also install node locally to build the frontend.
```sh
mvn spring-boot:run # for Mac
./mvnw spring-boot:run # for Windows
```
3. Go to http://localhost:8080/ on your browser.

## Set Up
### Requirements
* Java (version 11 or newer)
* Maven (version 3.6.3 or newer)
* Kafka (version 0.11.0 or newer)
* Node.js (version 12.18.3 or newer)

## Built With

<a href="https://spring.io/projects/spring-boot">Spring Boot</a>
 | <a href="https://spring.io/guides/gs/messaging-stomp-websocket/">Spring Web Socket</a>
 | <a href="https://styled-components.com/">Styled Components</a>
 | <a href="https://reactjs.org/">React</a>
 | <a href="https://www.typescriptlang.org/">Typescript</a>
 | <a href="https://kafka.apache.org/">Apache Kafka</a>


## Contributors

Brian Hong | Midori Yang | Nak Kim | Nicole Ip | Winford Lin

### Contributions Welcome!

If you found this interesting or helpful at all, feel free to drop a :star2: **STAR** :star2: on this project to show your support!

You can contribute by:

* Raising any issues you find using Kafka Sprout
* Fixing issues by opening Pull Requests
* Improving documentation

All bugs, tasks or enhancements are tracked as <a href="https://github.com/oslabs-beta/Kafka-Sprout/issues">GitHub issues</a>. Issues which might be a good start for new contributors are marked with "good-start" label.

If you want to get in touch with us first before contributing, shoot us an email at kafkasprout@gmail.com. Kafka Sprout is actively maintained!

## License
MIT
