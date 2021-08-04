# PunkAPI UI


This project was created with [Create React App](https://github.com/facebook/create-react-app). and modified using [Craco](https://github.com/gsoft-inc/craco). 

## Running code

### Running bundled code

The build version is committed so on MacOs or Linux we can

```
cd build/
python3 -m http.server 8000
```

### Running dev code

Requirements: node.js, yarn 

```
yarn
yarn start
``` 

## Approaches used

* Responsive design using tailwindcss utility classes
* Typescript with run-time types used for validation of incomming json and user input
* Hybrid css-in-js and functional css approach - provides easy style consistency without littering HTML with utility classes
* State is managed by redux
* Functional components with hooks

## Things left to do

* Write unit tests
* Add loading and failure states for beer list
