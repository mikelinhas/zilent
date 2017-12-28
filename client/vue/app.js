
var app = new Vue({
	el: '#app',
	
	data: {
		query: '',
		message : 'hello Endi!!',
		image: '',
		userFile: '',
		uploadedFiles: 0,
		errorMessage: ''
	},
	
	watch: {
		query: {
			handler: function(val,oldVal) {
				data.filterLocations();
			},
			deep: true
		}
	},

	methods: {

		uploadFile: function() {
			let data = new FormData();
			console.log(this.userFile[0]);
			data.append('userFile', this.userFile[0]);

			var vueVars = this;

			console.log(data);
			axios.post('/rest/upload', data, {
				headers: {
					'Content-Type':'multipart/form-data'
				}})
				.then (function (response) {
					vueVars.uploadedFiles ++;
					vueVars.image = '';
					vueVars.errorMessage = '';
					console.log(response);
				})
				.catch(function (error) {
					vueVars.errorMessage = "There has been an Error! Oh no.."
					console.log(error);
				})
		},

		buildGraph: function() {
			axios.get('/rest/graph').then(function (response) {
				console.log(response);
			})	
		},

		onFileChange(e) {
			this.userFile = e.target.files || e.dataTransfer.files;
	    	var files = e.target.files || e.dataTransfer.files;
	    	if (!files.length)
	    	return;
	    	this.createImage(files[0]);
	    },

	    createImage(file) {
	      var image = new Image();
	      var reader = new FileReader();
	      var vm = this;

	      reader.onload = (e) => {
	        vm.image = e.target.result;
	      };
	      reader.readAsDataURL(file);
	    },

	    removeImage: function (e) {
	      this.image = '';
	      this.errorMessage = '';
	    }

	}
});




