# Solution Center Feedback

> Feedback tool for rating services provided by Brand Solutions

[![Build Status](https://travis-ci.org/zalando-incubator/solution-center-feedback.svg?branch=master)](https://travis-ci.org/zalando-incubator/solution-center-feedback)

[Changelog](CHANGELOG.md)

## Installation

```shell
npm install solution-center-feedback
```

## Usage

1. Include the script in your project:

    ```html
    <script src="/node_modules/solution-center-feedback/dist/solutioncenter.feedback.js"></script>
    ```
    
2. Insert the component at the bottom of your app (just before `</body>`):

    ```html
    <sc-feedback id="$ctrl.id" name="$ctrl.name"></sc-feedback>
    ```

### Parameters

All parameters are required.

  * `id`: The ID associated with your project.
  * `name`: The name you wish to display on the feedback component.

## Style

Solution Center Feedback is intended to be used with [dress code](https://github.com/zalando/dress-code). That package is included as a dependency.
Be sure to include dress-code in your project.
	 
## Develop

Clone the repository, then run:

```shell
npm install
```

## Contributing

Before opening a pull request, please ensure that you have included unit tests for your changes
and that all tests are passing.

## License

[MIT](LICENSE)
