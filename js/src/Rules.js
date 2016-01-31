var Rules = (function() {
    
    var symbols = [
     {
         name: "iff",
         symbol: "<=>",
         precedence: 0,
         arity: 2
     },
     {
         name: "implies",
         symbol: "=>",
         precedence: 1,
         arity: 2    
     },
     {
         name: "and",
         symbol: "^",
         precedence: 2,
         arity: 2
     },
     {
         name: "or",
         symbol: "v",
         precedence: 2,
         arity: 2
     },
     {
         name: "not",
         symbol: "¬",
         precedence: 3,
         arity: 1
     }
    ];
    
    function doubleNegation(tree) {
        var root = symbols[4];
        root.right = symbols[4];
        root.right.tree = tree;
        return root;
    }
    
    
    return {
        doubleNegation: doubleNegation
    };
})();