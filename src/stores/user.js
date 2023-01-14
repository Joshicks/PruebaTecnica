import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore("user", () => {
    const user = ref({
        islogged: false,
        token: '',
    })

    if (localStorage.getItem("user")) {
        user.value = JSON.parse(localStorage.getItem("user"))
    }

    watch(
        user,
        (userVal) => {
            localStorage.setItem("user", JSON.stringify(userVal))
        }, { deep: true }
    )
    const count = ref(0)

    const website = computed(() =>
        user.value.email.substring(user.value.email.lastIndexOf("@" + 1))
    )

    const login = (userData) => {
        user.value.token = userData.token
        user.value.islogged = true
    }

    //tentativa: crear metodo emailAtuh


    const logout = () => {
        user.value.token = ''
        user.value.islogged = false
        user.value.rol = ''
            //delete user.rol
    }

    const getToken = () => {
        return user.value.token
    }


    return {
        count,
        user,
        website,
        login,
        logout,
        getToken
    }

})