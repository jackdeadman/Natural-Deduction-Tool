var Rule = (function() {
    
    function doubleNegation(tree) {
        var root = new Expression(Operator.not);
        root.right = new Expression(Operator.not);
        root.right.right = tree;
        return root;
    }
    
    return {
        doubleNegation: doubleNegation
    };
})();