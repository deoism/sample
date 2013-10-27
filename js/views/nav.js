directory.NavListView = Backbone.View.extend({

    tagName:'ul',

    className:'myList',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (Nav) {
            self.$el.append(new directory.NavListItemView({model:Nav}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (Nav) {
            this.$el.append(new directory.NavListItemView({model:Nav}).render().el);
        }, this);
        return this;
    }
});

directory.NavListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        // The clone hack here is to support parse.com which doesn't add the id to model.attributes. For all other persistence
        // layers, you can directly pass model.attributes to the template function
        var data = _.clone(this.model.attributes);
        data.id = this.model.id;
        this.$el.html(this.template(data));
        return this;
    }

});