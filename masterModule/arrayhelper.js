(function () {

    Array.implement({

        min: function () {
            return Math.min.apply(null, this);
        },

        max: function () {
            return Math.max.apply(null, this);
        },

        average: function () {
            return this.length ? this.sum() / this.length : 0;
        },

        sum: function () {
            var result = 0, l = this.length;
            if (l) {
                while (l--) {
                    if (this[l] != null) result += parseFloat(this[l]);
                }
            }
            return result;
        },

        unique: function () {
            return [].combine(this);
        },

        shuffle: function () {
            for (var i = this.length; i && --i;) {
                var temp = this[i], r = Math.floor(Math.random() * (i + 1));
                this[i] = this[r];
                this[r] = temp;
            }
            return this;
        }  
    });

})();
