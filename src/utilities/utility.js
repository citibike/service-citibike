'use strict';

module.exports = {
    getNextPossibleNumber: function (cur, max, min) {
        cur++;
        return (cur > max) ? min : cur;

    }

}