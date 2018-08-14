# Notificare Lambda Test

This is a simple AWS Lambda based Notificare LiveAPI handler.

It uses the [Claudia API Builder](https://claudiajs.com/) to generate AWS APIGateway endpoints and wrap Lambda events in request objects.

## Usage 
To create a working API, you will first need to install Claudia CLI

```
npm install -g claudia
```

then install dependencies in your checked out clone

```
npm install
```


After that, you can generate a new AWS APIGateway endpoint

```
claudia create --region eu-west-1 --api-module app
```

## License

This software is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt and NOTICE.txt for more information.

