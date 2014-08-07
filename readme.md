##Markov Chain

This library is an implementation of an observable markov chain.


###How to Use

```
var myMarkovChain = new MarkovChain();
```
The constructor creates a new MarkovChain Object. It can take a data point or an array of data points as an argument.


```
myMarkovChain.add(data);
```
Adds the given data to the MarkovChain. Data can be a single data point of an array of data points.


```
myMarkovChain.get(currentState, nextState);
```
Returns the observed probability (number) of the next state given the current state.

```
myMarkovChain.get(currentState);
```
Returns an Object with the observed next states as keys and their associated observed probabilities as values.

/Returns the entire conditional probability table as an object. 
// Each key is a possible current state and each value is an object representing the possible next states and their associated probabilities
```
myMarkovChain.get();
```
Returns the entire observed conditional probability table as an Object with each observed state as a key and an associated Object with each observed next state as a key and its associated observed probability.