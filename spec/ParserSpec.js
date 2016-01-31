// expression
    // single argument - value set, left and right should be null
    // two arguments, left null, value and right set
    // three arguments, left, right and value set
    
// preprocess
    // tokenlist should be the logical statement correctly split
    // should recognise every valid logical statement
    
// applyOperator
    // what if given empty operatorStack or exprStack
    // if unary operator, should only pop once off exprstack
        // and expression should be correctly pushed for every expression
    // if binary operator should pop twice off exprstack
        // and expression should be correctly pushed