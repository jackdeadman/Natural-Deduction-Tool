var Box = (function() {
    function Box(node) {
        this.node = node;
    }
    
    Box.prototype.hide = function() {
        this.node.classList.add('hidden');
    };
    
    Box.prototype.show = function() {
        this.node.classList.remove('hidden');
    };
    
    return Box;
})();