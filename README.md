# Solution Center Feedback [![Build Status](https://travis-ci.org/zalando-incubator/solution-center-feedback.svg?branch=master)](https://travis-ci.org/zalando-incubator/solution-center-feedback) [![npm Version](https://img.shields.io/npm/v/solution-center-feedback.svg)](https://www.npmjs.com/package/solution-center-feedback)

> Feedback tool for rating services provided by Brand Solutions

## Installation

```shell
npm install solution-center-feedback
```

## Usage

1. Include the script in your project:

    ```html
    <script src="/node_modules/solution-center-feedback/dist/solutioncenter.feedback.js"></script>
    ```
    
2. Insert the component near or at the bottom of your app:

    ```html
    <sc-feedback module-id="$ctrl.id" module-name="$ctrl.name" debug-config="$ctrl.debug"></sc-feedback>
    ```

### Parameters

All the module related parameters are required, the one for debugging is optional

  * `module-id`: The ID associated with your project.
  * `module-name`: The name you wish to display on the feedback component.
  * `debug-config`: Configuration object for debugging purposes

## Style

Solution Center Feedback is intended to be used with [dress code](https://github.com/zalando/dress-code). That package is included as a dependency.
Be sure to include dress-code in your project.
	 
## Develop

Clone the repository, then run:

```shell
npm install
```

### Available commands

* `npm start`: start a development server, open the demo in the browser, and watch for code changes.
* `npm test`: run unit tests and generate a coverage report.
  * `open coverage/index.html`: after running unit tests, open the coverage report.
* `npm clean`: remove build files/directories

## Contributing

Before opening a pull request, please ensure that you have included unit tests for your changes
and that all tests are passing.

## Changelog
[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
