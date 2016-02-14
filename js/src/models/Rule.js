var Rule = (function() {
    
    function conjunctionIntroduction(tree1, tree2) {
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
            throw new RuleDoesNotFollowException('De Morgans law can only be applied to or and and');
        }
        newRoot.right = rightNot;
        newRoot.left = leftNot;
        rootNot.right = newRoot;
        return rootNot;
    }
    
    // Trivial but still a rule
    function conjunctionElimination1(tree) {
        if (tree.value === Operator.and) {
            return tree.left;   
        } else {
            throw new RuleDoesNotFollowException('Can only be applied to conjuction');
        } 
    }
    
    function conjunctionElimination2(tree) {
        if (tree.value === Operator.and) {
            return tree.right;   
        } else {
            throw new RuleDoesNotFollowException('Can only be applied to conjuction');
        } 
    }
    
    function disjunctionIntroduction(tree1, tree2) {
        var root = new Expression(Operator.or);
        root.left = tree1;
        root.right = tree2;
        return root;
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
            throw new RuleDoesNotFollowException('Must have two nots at the start of the expression.');
        }
    }
    
    // i.e a=>b, a
    function implicationElimination(tree1, tree2) {
        if (tree1.value === Operator.implies) {
            if (Expression.equivalent(tree1.left, tree2)) {
                return tree1.right;
            } else {
                throw new RuleDoesNotFollowException('Antecedent does not match the given proposition.');
            }
        } else {
            throw new RuleDoesNotFollowException('Can only apply implication elimination on implication');
        }
        
    }
        
    return {
        doubleNegationIntroduction: doubleNegationIntroduction,
        doubleNegationElimination: doubleNegationElimination,
        
        conjunctionIntroduction: conjunctionIntroduction,
        conjunctionElimination1: conjunctionElimination1,
        conjunctionElimination2: conjunctionElimination2,
        
        disjunctionIntroduction: disjunctionIntroduction,
        
        implicationElimination: implicationElimination,
        
        deMorgans: deMorgans
    };
})();   