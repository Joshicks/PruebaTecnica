<template>
    <div class="flex justify-center items-center w-full">
        <div class="bg-white flex flex-col rounded-lg p-8 space-y-14 shadow-lg">
            <h1 class="text-4xl font-bold text-center mb-8">LOGIN</h1>
            <div class="flex flex-col">
                <label for="nombre">Nombre</label>
                <input v-model="usuario.nombre" class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100"
                    type="text" placeholder="Introduzca su nombre" id="nombre" />
            </div>
            <div class="flex flex-col">
                <label for="contraseña">Contraseña</label>
                <input v-model="usuario.contrasena"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="password"
                    placeholder="Introduzca su contraseña" id="contraseña" />
            </div>
            <button @click.prevent="validar"
                class="rounded-lg bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 py-2 font-bold text-white transform hover:scale-105 transition duration-300 ease-in-out">LOGIN</button>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
export default {
    data() {
        return {
            usuario: {
                nombre: '',
                contrasena: ''
            },
            store: useUserStore(),
            mensajeError: '',
            invalido: false
        }
    },
    methods: {
        async validar() {
            if (!(this.usuario.nombre == '' || this.usuario.contrasena == '')) {
                this.invalido = false;
                let respuesta = await axios.get('https://api-rest-production-9ed7.up.railway.app/Login', { "body": this.usuario}, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                switch (respuesta.status) {
                    case 200: {
                        this.store.login(respuesta.token)
                        console.log(this.store.user.token);
                        this.$router.push('/home')
                    }
                }
            }
            else{
                this.mensajeError='Nombre o contrasena incorrectos'
                this.invalido=true
            }

        }
    }
}
</script>