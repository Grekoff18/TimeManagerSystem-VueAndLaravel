export default {
  state: {
  	taskList: [],
  	editMode: false,
    menu: [
      {title: "dfsdff", href: "/lalala"},
      {title: "dfsdff", href: "/lalal"},
      {title: "dfsdff", href: "/lala"},
      {title: "dfsdff", href: "/lal"},
    ],
  },

	getters: {

	},

	actions: {
    getAllTasks({state}) {
    	axios.get("api/tasks")
        .then(response => state.taskList = response.data.reverse())
       	.catch((error) => console.log(error));
    },

    deleteTask({dispatch}, id) {
    	axios.delete(`api/task/${id}`)
        .then(response => {
          if (response.status === 200) {
            dispatch("getAllTasks");
          }
        })
        .catch((error) => console.log(error));
    },

    addTask({commit, dispatch}, inputData) {
    	axios.post("api/task/store", {
        "task": {
          "description": inputData
        },
      })
      	.then(response => console.log("task added"))
      	.catch(error => console.log(error));
      	
    },

    updateTask({commit, state, dispatch}, payload) {
	    axios.patch(`api/task/${payload.id}`, {
        "task": {
          "description": payload.inputData
        },
      })
      	.then(response => {
      		if (response.status === 200) {
      			dispatch('getAllTasks');
						commit('changeEditMode');
      		}
      	})
      	.catch(error => console.log(error));
    },
	},

	mutations: {
    changeEditMode(state) {
    	state.editMode === false ? state.editMode = true : state.editMode = false; 
    },

    fillMenu(state, item) {
      if (item) {
        state.menu.forEach(elem => {
          item.push(elem);
        })
      }
    },
  }
}