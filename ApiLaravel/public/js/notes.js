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

var resource;

Vue.transition('bounce-out', {    
    leaveClass: 'bounceOut'
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
        show: function () {
            this.errors = [];
            this.draft = $.extend( {}, this.note);
            this.editing = true;            
        },
        cancel: function () {
            this.editing = false;
        },
        update: function () {
            
            this.errors = [];
            this.$dispatch('update-note', this);
             
        },
        remove: function () {

            var component = this;
            this.$dispatch('delete-note', this.note);
            
        },
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
        alert: {
            message: '',
            display: false
        },
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

        Vue.http.interceptors.push(function (request, next) {
            next(function (response) {
                if (response.ok) {
                    return response;
                }
                
                this.alert.message = response.data.message;
                this.alert.display = true;
                

                setTimeout(function () {

                    this.alert.display = false;

                }, 4000);
 
                return response;
            });
        });


    },
    methods: {
        createNote: function () {                

            this.errors = [];

            resource.save({}, this.new_note).then(function (response) {
                this.notes.push(response.data.note);
            }, function (response) {
                this.errors = response.data.errors;
            });
 
            this.new_note = {note: '', category_id: ''};
        },
        deleteNote: function(note){
            resource.delete({id: note.id}).then(function (response) {
                this.notes.$remove(note);
            });
        },
        updateNote: function (component) {

            resource.update({id: component.note.id}, component.draft ).then(function (response) {
                
                for(var key in response.data.note) {
                    component.note[key] = response.data.note[key];
                }

                component.editing = false;

            }, function (response) {
                component.errors = response.data.errors;
            });
        }
    },
    filters: {
    }
});




