var Rule = (function() {
    
    function conjuctionIntroduction(tree1, tree2) {
        var root = new Expression(Operator.and);
        root.left = tree1;
        root.right = tree2;
        return root;
    }
    
    function deMorgans(tree) {
        var leftNot = new Expression(Operator.not);
        var rightNot = new Expression(Operator.not);
        var rootNot = new Expression(Operator.not);
        
        leftNot.right = tree.left;
        rightNot.right = tree.right;
        
        var newRoot;
        
        if (tree.value === Operator.and) {
            newRoot = new Expression(Operator.or);
        } else if (tree.value === Operator.or) {
            newRoot = new Expression(Operator.and); 
        } else {
            throw 'Demorgans law can only be applied to or and and';
        }
        newRoot.right = rightNot;
        newRoot.left = leftNot;
        rootNot.right = newRoot;
        return rootNot;
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
    
    // i.e a=>b, a
    function implicationElimination(tree1, tree2) {
        if ((tree1.value === Operator.implies) && (Expression.equivalent(tree1.left, tree2))) {
            return tree1.right;
        } else {
            throw 'Does not follow.';
        }
    }
        
    return {
        doubleNegationIntroduction: doubleNegationIntroduction,
        doubleNegationElimination: doubleNegationElimination,
        
        conjuctionIntroduction: conjuctionIntroduction,
        conjuctionElimination1: conjuctionElimination1,
        conjuctionElimination2: conjuctionElimination2,
        
        implicationElimination: implicationElimination,
        
        deMorgans: deMorgans
    };
})();   