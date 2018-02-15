(function () {

    var Spinner = this.Spinner = new Class({              

        options: {
            'class': 'spinner',
            containerPosition: {},
            content: {
                'class': 'spinner-content'
            },
            messageContainer: {
                'class': 'spinner-msg'
            },
            img: {
                'class': 'spinner-img'
            },
            fxOptions: {
                link: 'chain'
            }
        },

        initialize: function (target, options) {
            this.target = document.id(target) || document.id(document.body);
            this.target.store('spinner', this);
            this.setOptions(options);
            this.render();
            this.inject();

            
            var deactivate = function () { this.active = false; }.bind(this);
            this.addEvents({
                hide: deactivate,
                show: deactivate
            });
        },

        render: function () {
            this.parent();

            this.element.set('id', this.options.id || 'spinner-' + String.uniqueID());

            this.content = document.id(this.options.content) || new Element('div', this.options.content);
            this.content.inject(this.element);

            if (this.options.message) {
                this.msg = document.id(this.options.message) || new Element('p', this.options.messageContainer).appendText(this.options.message);
                this.msg.inject(this.content);
            }

            if (this.options.img) {
                this.img = document.id(this.options.img) || new Element('div', this.options.img);
                this.img.inject(this.content);
            }

            this.element.set('tween', this.options.fxOptions);
        },

        show: function (noeffect) {
            if (this.active) return this.chain(this.show.bind(this));
            if (!this.hidden) {
                this.callChain.delay(20, this);
                return this;
            }

            this.target.set('aria-busy', 'true');
            this.active = true;

            return this.parent(noeffect);
        },

        showMask: function (noeffect) {
            var pos = function () {
                this.content.position(Object.merge({
                    relativeTo: this.element
                }, this.options.containerPosition));
            }.bind(this);

            if (noeffect) {
                this.parent();
                pos();
            } else {
                if (!this.options.style.opacity) this.options.style.opacity = this.element.getStyle('opacity').toFloat();
                this.element.setStyles({
                    display: 'block',
                    opacity: 0
                }).tween('opacity', this.options.style.opacity);
                pos();
                this.hidden = false;
                this.fireEvent('show');
                this.callChain();
            }
        },

        hide: function (noeffect) {
            if (this.active) return this.chain(this.hide.bind(this));
            if (this.hidden) {
                this.callChain.delay(20, this);
                return this;
            }

            this.target.set('aria-busy', 'false');
            this.active = true;

            return this.parent(noeffect);
        },

        hideMask: function (noeffect) {
            if (noeffect) return this.parent();
            this.element.tween('opacity', 0).get('tween').chain(function () {
                this.element.setStyle('display', 'none');
                this.hidden = true;
                this.fireEvent('hide');
                this.callChain();
            }.bind(this));
        },

        destroy: function () {
            this.content.destroy();
            this.parent();
            this.target.eliminate('spinner');
        }

    });

})();
