Parse.initialize("3lJfd4T87rxDvs34BJcXEjO7tbJLAyQ4cN3XSwCv", "WInG2A7UMnpzeCH51SXB0pecsWWtmOKvjXyolLUm");

directory.Employee = Parse.Object.extend({

    className: "employees",

    initialize: function() {
        this.reports = new directory.ReportsCollection();
        this.reports.query = new Parse.Query(directory.Employee).equalTo("managerId", this.id);
    }

});


directory.Naviation = Parse.Object.extend({

    className: "navigation",

    initialize: function() {
        this.reports = new directory.ReportsCollection();
        this.reports.query = new Parse.Query(directory.Navigation).equalTo("NavLink", this.id);
    }

});

directory.EmployeeCollection = Parse.Collection.extend(({

    model: directory.Employee,

    fetch: function(options) {
        console.log('custom fetch');
        if (options.data && options.data.name) {
            var firstNameQuery = new Parse.Query(directory.Employee).contains("firstName", options.data.name);
            var lastNameQuery = new Parse.Query(directory.Employee).contains("lastName", options.data.name);
            this.query = Parse.Query.or(firstNameQuery, lastNameQuery);
        }
        Parse.Collection.prototype.fetch.apply(this, arguments);

    }

}));

directory.NavigationCollection = Parse.Collection.extend(({

    model: directory.Navigation,

    fetch: function(options) {
        console.log('nav fetch');
        if (options.data && options.data.name) {
            var href = $("#myList li a:href");
            var label = $("#myList li a:label");
            this.query = Parse.Query.or(firstNameQuery, lastNameQuery);
        }
        Parse.Collection.prototype.fetch.apply(this, arguments);

    }

}));

directory.ReportsCollection = Parse.Collection.extend(({

    model: directory.Employee

}));
directory.ReportsCollection = Parse.Collection.extend(({

    model: directory.Navigation

}));
