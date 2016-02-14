function RuleDoesNotFollowException(message) {
    this.name = "RuleDoesNotFollowException";
    this.message = (message || "");
}
RuleDoesNotFollowException.prototype = new Error();
RuleDoesNotFollowException.prototype.constructor = RuleDoesNotFollowException;