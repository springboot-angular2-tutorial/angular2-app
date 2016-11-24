# Angular2 Tutorial
 
[![Build Status][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/github/springboot-angular2-tutorial/angular2-app/badge.svg?branch=master)](https://coveralls.io/github/springboot-angular2-tutorial/angular2-app?branch=master)

This repository is an example application for angular2 tutorial.

[Demo](https://micropost.hana053.com/)

* Ahead-of-time compilation
* Lazy Loading
* Preloading 
* [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) by using [Aphrodite](https://github.com/Khan/aphrodite)
* Hot module reload

## Getting Started

Prepare backend app.

```
git clone https://github.com/springboot-angular2-tutorial/boot-app.git
cd boot-app
mvn spring-boot:run
```

Serve frontend app by webpack-dev-server.

```
npm install -g yarn
yarn install
yarn start
open http://localhost:4200
```

Testing.

```
yarn test
```

Production build.

```
yarn run build
yarn run server:prod
open http://localhost:4200
```

## Tutorial

Under construction...

## Related Projects

* [Spring Boot app](https://github.com/springboot-angular2-tutorial/boot-app)
* [Android app](https://github.com/springboot-angular2-tutorial/android-app)
* [Server provisioning by Ansible and Packer](https://github.com/springboot-angular2-tutorial/micropost-provisionings)
* [Infrastructure by Terraform](https://github.com/springboot-angular2-tutorial/micropost-formation)
* [Lambda functions by Serverless](https://github.com/springboot-angular2-tutorial/micropost-functions)

## Credits

* [Rails tutorial](https://github.com/railstutorial/sample_app_rails_4)
* [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

## License

[MIT](/LICENSE)

[travis-url]: https://travis-ci.org/springboot-angular2-tutorial/angular2-app
[travis-image]: https://travis-ci.org/springboot-angular2-tutorial/angular2-app.svg
