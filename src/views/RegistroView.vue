<template>
    <div class="flex justify-center items-center w-full">
        <div class=" flex flex-col bg-white rounded-lg p-8 space-y-8 shadow-lg">
            <h1 class="text-4xl font-bold">REGISTRO</h1>
            <div class="flex flex-col">
                <label for="nombre">Nombre</label>
                <input v-model="usuario.nombre" class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100"
                    type="text" placeholder="Nombre completo" id="nombre" />
            </div>
            <div class="flex flex-col">
                <label for="edad">Edad</label>
                <input v-model="usuario.edad" class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100"
                    type="number" placeholder="Edad" id="edad" />
            </div>
            <div class="flex flex-col">
                <label for="escolaridad">Escolaridad</label>
                <input v-model="usuario.escolaridad"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="text"
                    placeholder="Escolaridad" id="escolaridad" />
            </div>
            <div class="flex flex-col">
                <label for="contraseña">Contraseña</label>
                <input v-model="usuario.contrasena"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="password"
                    placeholder="················" id="contraseña" />
            </div>
            <div class="flex justify-center">
                <p v-if="invalido"
                    class=" whitespace-pre-wrap p-2 rounded-md ring-2 ring-red-500 text-red-600 font-medium text-sm">
                    {{ mensajeError }}</p>
            </div>
            <button @click.prevent="enviarDatos"
                class="rounded-lg bg-blue-700 py-2 transform hover:scale-105 transition duration-300 ease-in-out font-bold text-white">Registrarse</button>


        </div>

    </div>


</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            usuario: {
                nombre: '',
                edad: Number,
                escolaridad: '',
                contrasena: '',
            },
            mensajeError: '',
            invalido: false
        }
    },
    methods: {
        async enviarDatos() {
            if (this.validar()) {
                this.invalido = false;
                let respuesta = await axios.post('https://api-rest-production-fc59.up.railway.app/Registro', { "body": this.usuario }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                switch (respuesta.status) {
                    case 201: {
                        this.$router.push('/login')
                    }
                }
            }
            else {
                this.invalido = true;
            }

        },
        validar() {
            if (this.usuario.nombre == "" || this.usuario.escolaridad == "" || this.usuario.contrasena == "") {
                this.mensajeError = "¡Por favor introduzca todos los datos solicitados!"
                return false
            }
            if (this.usuario.edad < 8 || this.usuario.edad > 85) {
                this.mensajeError = "Introduzca una edad valida"
                return false
            }
            if (this.usuario.contrasena.length <= 6) {
                this.mensajeError = "La contraseña debe tener mas de 6 caracteres"
                return false
            }
            return true
        }


    }
}
</script>