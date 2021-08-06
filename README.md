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

* Write unit tests for seearch
* Write tests for api and a reducer
* Instead of making a better date parse, we can just add a date picker and combine it with a search field
* Responnse caching:

Plan is to add two maps or objects: nameSearches: Map<string, Set<Number>> and dateSearches: Set<string> the beerSlice reducer separately for dates and text searches. On every search we will cache the beers forever - recepies almost never change, alternatively after checking response headers, looks like .

For date before search:
1. Find maximum date looked up before
2. Get all beers in the interval of [max_date_from_previous_search, current_serch_date] from punk api.
   Store empty array if max_date is greater
3. 