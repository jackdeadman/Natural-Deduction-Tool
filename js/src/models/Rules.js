var Rules = (function() {
    
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