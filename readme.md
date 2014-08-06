##Markov Chain

This library is an implementation of an observable markov chain.


###How to Use

var myMarkovChain = new MarkovChain();

Optional arguments: an array of data or a single data point.

myMarkovChain.add(data);

Accepts a single data point or an array of data points.

// Returns the conditional probability of the next state given the current state
myMarkovChain.get(currentState, nextState);

// Returns an object with keys of each nextState and its associated conditional probability
myMarkovChain.get(currentState);

// Returns the entire conditional probability table as an object. 
// Each key is a possible current state and each value is an object representing the possible next states and their associated probabilities
myMarkovChain.get();

