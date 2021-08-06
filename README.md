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

## Responnse caching

The api rearly change, Http headers indicate that values are fresh for around 4 hours. In industrial app I'd parse the headers to invalidate cache but I assume here it is out of scope of the project. 

### Random beer

No caching is possible.

### Random non-alcoholic beer

We get all non-alcoholic beers during a first request.
Then we are returning

### By name

Caching by full search string - just like a simple memoize, but we store only object ids to save memory. Other caching approaching won't work:
due to fuzzy search we need exact metric to get a partial order of requests, assuming that fuzzy search is an implementation detail of the backend.

### By Date

Caching is very efficient there, we fetch only in interval [prev_date, query_date) or fetch nothing at all if query date is not present.

## Approaches used

### Responsive design using tailwindcss utility classes

In my experience keeping UI consistent in a big project is not a trivial problem. Maybe 80% of UI is standard with components that can be taken directly from a UI lib, but very often frontent engineers sort of need a lot of interaction with designers to design a componets from the
remaining 20% of cases.

Functional css (e.g. tailwindcss and tachyons.css) mitigates this problem by encoding design language into a formal system where component designer may make much fewer choices. For example we can only pick padding among 6 different sizes, we have only couple of options for border radius and Typography and colors are fixed. This may result in nice looking components out of box without even making visual design iterations,
high-fedelity prototypes and overall ugly look and feel.

### Hybrid css-in-js and functional css approach

Functional css has many benifits but it ultimately results in ugly, bloated and non-semantic html. It may be seen as an implementation detail, 
but css-in-js macros can provide all the benifits of functional css without bloating the markup.

### Typescript with run-time types used for validation of incomming json and user input

Using number of libraries, typescript can be used to validate data, ensuring that a type actually describes parsed json or user input and not just wishfully assumes it. 

### State is managed by redux

Context providers can be used for the same purpose, but stacked context providers complicates testing and preventing component redraws. Also redux toolkit has nice and time-saving slice abstraction keeping business logic co-located mitigating old issue with reduce where changes required updating too many components 

The great alternative to Redux would be using libraries like [SWR](https://swr.vercel.app/) with experimental React <Suspense> but as it was demonstrated in this demo, most of the time manual approaches are not hard to implement and can provide maximum performance and we can just add a memoization wrapper around fetch to memoize responses based on HTTP headers with expiry/lru strategies. 

### Things left to do


* Write unit tests for seearch and beer lists