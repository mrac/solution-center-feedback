# Solution Center Feedback
Feedback tool which allows users to rate the services provided by the Solution Center of Brand Solutions

[![Build Status](https://travis-ci.org/zalando/solution-center-feedback.svg?branch=master)](https://travis-ci.org/zalando/solution-center-feedback)

### Installation

Install via bower

```shell
bower install solution-center-feedback
```

Install via npm

```shell
npm install solution-center-feedback
```

### Usage

1. Load the script in your `<head>` from Bower:

    ```html
    <script src="../bower_components/solution-center-feedback/dist/solution-center-feedback.js"></script>
    ```
    
    Or from NPM:
    
    
    ```html
    <script src="../node_modules/solution-center-feedback/dist/solution-center-feedback.js"></script>
    ```

### Style

The Solution Center feedback is intended to be used with the [dress code](https://github.com/zalando/dress-code) style. That package is included as a dependency.

Follow these steps to ensure you are using the right style for the feedback:

 1. Follow the [usage instructions for the dress code](https://github.com/zalando/dress-code#usage). 
 2. Load the feedback styles. Add this to your `<head>`:
 
    ```<link rel="stylesheet" href="../bower_components/solution-center-feedback/dist/solution-center-feedback.css">```
    
    Or for NPM:
    
    ```<link rel="stylesheet" href="../node_modules/solution-center-feedback/dist/solution-center-feedback.css">``` 
	 
### Develop

Clone the repository, then run:

```shell
npm install
bower install
```

Install Gulp via npm if you don't have it
```shell
npm install -g gulp
```

#### Available commands

* `gulp`: build and test the project
* `gulp build`: build the project and make new files in`dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page
* `gulp test`: run tests
* `gulp serve-test`: runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests

### License
MIT
