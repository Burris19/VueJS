function findById(items, id) {
    for (var i in items) {
        if (items[i].id == id) {
            return items[i];
        }
    }

    return null;
}

Vue.filter('category', function (id) {
    var category = findById(this.categories, id);

    return category != null ? category.name : '';
});

Vue.component('select-category', {
    template: "#select_category_tpl",
    props: ['categories', 'id']
});

Vue.component('note-row', {
    template: "#note_row_tpl",
    props: ['note', 'categories'],
    data: function() { 
        return {
            editing: false,
            errors: [],            
            draft: {}
        };
    },
    methods: {
        remove: function () {
            var component = this;
            // this.$http.delete('/vuej/ApiLaravel/public/api/v1/notes/'+this.note.id).then(function (response) {
            //     this.$parent.notes.$remove(this.note);
            // });

            resource.delete({id: this.note.id}).then(function (response) {
                this.notes.$remove(component.note);
            });

            // $.ajax({
            //     url: '/vuej/ApiLaravel/public/api/v1/notes/'+this.note.id,
            //     method: 'DELETE',
            //     dataType: 'json',                
            //     success: function (data) {
            //         this.$parent.notes.$remove(this.note);        
            //     }.bind(this),
            //     error: function (jqXHR) {
            //         this.$parrent.error = jqXHR.responseJSON.message;
            //         $('#error_message').delay(3000).fadeOut(1000, function() {
            //             this.$parent.error = '';
            //         });
            //     }.bind(this)
            // });
            
        },
        edit: function () {
            this.errors = [];
            this.draft = $.extend( {}, this.note);
            this.editing = true;
        },
        cancel: function () {
            this.editing = false;
        },
        update: function () {
            this.errors = [];

            var component = this;


            resource.update({id: this.note.id}, this.draft ).then(function (response) {
                this.notes.$set(this.notes.indexOf(component.note), response.data.note)
            }, function (response) {
                component.errors = response.data.errors;
            });

            // this.$http.put('/vuej/ApiLaravel/public/api/v1/notes/'+this.note.id, this.draft ).then(function (response) {
            //     this.$parent.notes.$set(this.$parent.notes.indexOf(this.note), response.data.note)
            // }, function (response) {
            //     this.errors = response.data.errors;
            // });

            // $.ajax({
            //     url: '/vuej/ApiLaravel/public/api/v1/notes/'+this.note.id,
            //     method: 'PUT',
            //     dataType: 'json',
            //     data: this.draft,
            //     success: function (data) {
            //         this.$parent.notes.$set(this.$parent.notes.indexOf(this.note), data.note);
            //         this.editing = false;
            //     }.bind(this),
            //     error: function (jqXHR) {
            //         this.errors = jqXHR.responseJSON.errors;
            //     }.bind(this)
            // });

            
        }
    }
});

var vm = new Vue({
    el: 'body',
    data: {
        new_note: {
            note: '',
            category_id: ''
        },
        notes: [],
        errors: [],
        error: '',
        categories: [
            {
                id: 1,
                name: 'Laravel'
            },
            {
                id: 2,
                name: 'Vue.js'
            },
            {
                id: 3,
                name: 'Publicidad'
            }
        ]
    },
    ready: function () {

        resource = this.$resource('/vuej/ApiLaravel/public/api/v1/notes{/id}');
        
        resource.get().then(function (response) {
            this.notes = response.data;
        });


        // this.$http({url: '/vuej/ApiLaravel/public/api/v1/notes'}).then(function (response) {
        //     this.notes = response.data;
        // });


        // $.getJSON('/vuej/ApiLaravel/public/api/v1/notes', [], function (notes) {
        //     vm.notes = notes;
        // });
    },
    methods: {
        createNote: function () {                

            this.errors = [];

            resource.save({}, this.new_note).then(function (response) {
                this.notes.push(response.data.note);
            }, function (response) {
                this.errors = response.data.errors;
            });

            // this.$http.post('/vuej/ApiLaravel/public/api/v1/notes', this.new_note).then(function (response) {
            //     this.notes.push(response.data.note);
            // }, function (response) {
            //     this.errors = response.data.errors;
            // });

            // $.ajax({
            //     url: '/vuej/ApiLaravel/public/api/v1/notes',
            //     method: 'POST',
            //     data: this.new_note,
            //     dataType: 'json',
            //     success: function (data) {
            //         vm.notes.push(data.note);
            //     },
            //     error: function (jqXHR) {
            //         vm.errors = jqXHR.responseJSON.errors;
            //     }
            // });         

            this.new_note = {note: '', category_id: ''};
        }
    },
    filters: {
    }
});




