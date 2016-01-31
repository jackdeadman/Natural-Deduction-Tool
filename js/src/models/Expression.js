var Expression = (function() {
    
    function Expression(){
        //either a value (like a word, terminal etc), or an operator in a larger expression
        this.value = arguments[0];
        this.left = this.right = null;
        
        if(arguments.length === 2){
            //unary expression, operator already set so right is single value
            this.right = arguments[1];
        }else if(arguments.length === 3){
            //binary expression, operator comes first (already set), followed by two operands (left, right)
            this.left = arguments[1];
            this.right = arguments[2];
        }
    }
    
    Expression.equals = function(tree1, tree2) {
        if (!tree1 || !tree2) {
            if (!tree1 && !tree2)
                return true;
            else
                return false;
        }
        return tree1.value === tree2.value
                    && Expression.equals(tree1.left, tree2.left)
                    && Expression.equals(tree1.right, tree2.right);
    }
    
    // Counts the number of nodes in a tree
    function size(tree) {
        if (tree) {
            return 1 + size(tree.left) + size(tree.right);
        }
        return 0;
    }
    
    Expression.prototype.size = function() {
        return size(this);
    }
    
    
    function needsBrackets(tree, branch) {
        return size(branch) > 1 && branch.value.precedence < tree.value.precedence;
    }
    
    function walkTree(tree, letters) {
        
        if (tree) {
            var leftBranch = needsBrackets(tree, tree.left);
            var rightBranch = needsBrackets(tree, tree.right);
            
            // Add brackets only if they are needed
            if (leftBranch)
                letters.push('(');
                
            walkTree(tree.left, letters);
            
            if (leftBranch)
                letters.push(')');
            
            // Print the node value, could be a symbol or a string
            if (tree.value.symbol) {
                letters.push(tree.value.symbol);    
            } else {
                letters.push(tree.value);
            }
            
            if (rightBranch)
                letters.push('(');
                
            walkTree(tree.right, letters);
            
            if (rightBranch)
                letters.push(')');
        }
    }
    
    Expression.prototype.toString = function() {
        var s = [];
        walkTree(this, s);
        return s.join('');
    };
    
    return Expression;
})();