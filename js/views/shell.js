directory.ShellView = Backbone.View.extend({

    initialize: function () {
        this.searchResults = new directory.EmployeeCollection() ;
		this.navsearchresults = new directory.NavigationCollection();
        this.searchresultsView = new directory.EmployeeListView({model: this.navsearchResults, className: 'dropdown-menu'});
		
        this.navsearchresultsView = new directory.NavigationListView({model: this.navsearchResults, className: 'dropdown-menu'});
    },

    render: function () {
        this.$el.html(this.template());
        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        $('.navbar-search', this.el).append(this.navsearchresultsView.render().el);
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keyup .navsearch-query": "search",
        "keypress .search-query": "onkeypress",
        "keypress .navsearch-query": "onkeypress"
    },

    search: function (event) {
        var key = $('#searchText').val();
        this.searchResults.fetch({reset: true, data: {name: key}});
        var self = this;
        setTimeout(function () {
            $('.dropdown').addClass('open');
        });
    },

    navsearch: function (event) {
        var key = $('#searchText').val();
        this.navsearchResults.fetch({reset: true, data: {name: key}});
        var self = this;
        setTimeout(function () {
            $('.dropdown').addClass('open');
        });
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },

    selectMenuItem: function(menuItem) {
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});