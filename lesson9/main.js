function findById(items, id) {
	for (var i in items) {
		if (items[i].id == id ) {
			return items[i];
		}
	}

	return null;
}

var vm = new Vue({
	el: 'body',
	data: {
		notes: [
			{
				note: 'Laravel 5.1 es LTS',
				category_id: 1			
			},
			{
				note: 'V-for es la directiva que utilizamos para iterar una lista',
				category_id: 2
			},
			{
				note: '@click se utiliza como un alias de v-on:click',
				category_id: 2
			},
			{
				note: 'Registrate hoy en styde.net y obten acceso a todos nuestros cursos',
				category_id: 3
			},
		],
		categories: [
			{
				id: 1,
				name: 'Laravel'
			},
			{
				id: 2,
				name: 'Vue.Js'
			},
			{
				id: 3,
				name: 'Publicidad'
			}
		]
	},
	filters: {
		category: function (id) {
			var category = findById(this.categories, id);

			return category != null ? category.name : '';
		}
	},
	methods: {
		deleteNote: function (note) {
			this.notes.$remove(note);
		},
		editNote: function (note) {		
			Vue.set(note, 'editing', true);				
		},
		updateNote: function (note) {
			Vue.set(note, 'editing', false);	
		}
	}
});