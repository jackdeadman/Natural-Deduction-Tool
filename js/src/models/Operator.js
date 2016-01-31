
var Operator = (function() {
    
    var Symbol = {
        iff: {
            symbol: "<=>",
            precedence: 0,
            arity: 2
        },
        implies: {
            symbol: "=>",
            precedence: 1,
            arity: 2    
        },
        and: {
            symbol: "^",
            precedence: 2,
            arity: 2
        },
        or: {
            symbol: "v",
            precedence: 2,
            arity: 2
        },
        not: {
            symbol: "¬",
            precedence: 3,
            arity: 1
        }
    };
    
    var symbols = Object.keys(Symbol).map(function(name) {
       return Symbol[name].symbol; 
    });
    
    

    // Given a string convert the string to an operator
    function fromSymbol(symbol) {
        
        for (var key in Symbol) {
            var actualSymbol = Symbol[key];
            if (actualSymbol.symbol === symbol) {
                return actualSymbol;
            }
        }
    }
    
    // Predicate to check where a string is a operator
    function isOperator(string){
        return !!fromSymbol(string)
    }
    
    return {
        symbols: symbols,
        
        iff: Symbol.iff,
        implies: Symbol.implies,
        or: Symbol.or,
        and: Symbol.and,
        not: Symbol.not,
        
        fromSymbol: fromSymbol,
        isOperator: isOperator
    };
})();

