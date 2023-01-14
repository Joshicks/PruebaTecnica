import { createStore } from "vuex";

const store = createStore({
    state: {
        appName: "prueba-tecnica",
        loggedIn: false
    },

    getters: {
        appName(state) {
            return state.appName
        }
    },
    mutations: {
        loggedIn(state) {
            state.loggedIn = true
        }
    },
    actions: {
        mockLogin(context) {
            setTimeout(function() {
                alert('User has been logged')
                context.commit('loggedIn')
            }, 1000)
        }
    }
})

export default store