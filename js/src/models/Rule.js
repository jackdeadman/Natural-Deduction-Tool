var Rule = (function() {
    
    function conjuctionIntroduction(tree1, tree2) {
        var root = new Expression(Operator.and);
        root.left = tree1;
        root.right = tree2;
        return root;
    }
    
    // Trivial but still a rule
    function conjuctionElimination1(tree) {
        return tree.left;
    }
    
    function conjuctionElimination2(tree) {
        return tree.right;
    }
    
    
    function doubleNegationIntroduction(tree) {
        var root = new Expression(Operator.not);
        root.right = new Expression(Operator.not);
        root.right.right = tree;
        return root;
    }
    
    function doubleNegationElimination(tree) {
        
        if ((tree.value === Operator.not) &&
            (tree.right.value === Operator.not)
        ) {
            return tree.right.right;
        } else {
            throw 'Does not follow, much have two nots at the start of the expression.';
        }
    }
        
    return {
        doubleNegationIntroduction: doubleNegationIntroduction,
        doubleNegationElimination: doubleNegationElimination,
        conjuctionIntroduction: conjuctionIntroduction,
        conjuctionElimination1: conjuctionElimination1,
        conjuctionElimination2: conjuctionElimination2
    };
})();