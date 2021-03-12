export default {
  state: {
  	TASK_LIST: [],
  	EDIT_MODE: false,
    // add to config 
    MENU: [
      {title: "dagdfsf", href: "/lalala"},
      {title: "dagdfsf", href: "/lalal"},
      {title: "dagdfsf", href: "/lala"},
      {title: "dagdfsf", href: "/lal"}
    ],
    SHOW_TOOLTIP: false,
    TOOLTIP_TEXT: "",
  },

	getters: {
    
	},

	actions: {
    GET_ALL_TASKS({state}) {
    	return axios.get("api/tasks")
        .then(response => state.TASK_LIST = response.data.reverse())
       	.catch(error => console.log(error));
    },

    DELETE_TASK({dispatch}, id) {
    	return axios.delete(`api/task/${id}`)
        .then(response => response.status === 200 ? dispatch("GET_ALL_TASKS") : console.log(response.data))
        .catch((error) => console.log(error));
    },

    ADD_TASK({dispatch, commit}, payload) {
    	return axios.post("api/task/store", {
        "task": {
          "description": payload.inputData,
          "timeLimit":   payload.timeLimit
        },
      })
      	.then(response => {
          if (response.status === 201) {
            dispatch("GET_ALL_TASKS");
          }
        })
      	.catch(error => console.log(error, inputData));
      	
    },

    EDIT_TASK({commit, dispatch}, payload) {
	    return axios.patch(`api/task/${payload.id}`, {
        "task": {
          "description": payload.inputData,
          "updated_at": moment_global().format("YYYY-MM-DD HH:mm:ss")
        },
      })
      	.then(response => {
          if (response.status === 200) {
            dispatch('GET_ALL_TASKS');
						commit('CHANGE_EDIT_MODE');
          }
        })
      	.catch(error => console.log(error));
    },

    COMPLETE_TASK({dispatch}, id) {
      return axios.put(`api/task/${id}`, {
        "task": { "completed": true }
      })
      .then(response => response.status === 200 ? dispatch("GET_ALL_TASKS") : console.log(response.data))
      .catch(error => console.log(error));
    }
	},

	mutations: {
    CHANGE_EDIT_MODE(state) {
    	state.EDIT_MODE === false ? state.EDIT_MODE = true : state.EDIT_MODE = false; 
    },

    CHANGE_STATE_TOOLTIP(state) {
      state.SHOW_TOOLTIP === false ? state.SHOW_TOOLTIP = true : state.SHOW_TOOLTIP = false;
    },

    FILL_MENU(state, item) {
      if (item) state.MENU.forEach(elem => item.push(elem)); 
    },

    FILL_TOOLTIP_TEXT(state, text) {
      text.length > 0 ? state.TOOLTIP_TEXT = text : console.log("ToolTipText length == 0");
    },
  }
}