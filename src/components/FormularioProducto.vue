<template>
    <div
        class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 flex justify-center items-center">
        <div class="bg-white py-4 px-8 space-y-8 rounded-lg">
            <h1 class="text-2xl font-bold">Registrar nuevo producto</h1>
            <div class="flex flex-col">
                <label class="font-bold" for="codigo">Código</label>
                <input v-model="producto.codigo"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="text"
                    placeholder="Codigo del producto" id="codigo" />
            </div>
            <div class="flex flex-col">
                <label class="font-bold" for="descripcion">Descripción</label>
                <input v-model="producto.descripcion"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="text"
                    placeholder="Descripción del producto" id="descripcion" />
            </div>
            <div class="flex flex-col">
                <label class="font-bold" for="ubicacion">Ubicación</label>
                <input v-model="producto.ubicacion"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="text"
                    placeholder="Ubicación del producto (OPCIONAL)" id="ubicacion" />
            </div>
            <div class="flex flex-col">
                <label class="font-bold" for="cantidad">Cantidad</label>
                <input v-model="producto.cantidad"
                    class="outline-none py-2 border-b-2 border-gray-300 focus:bg-violet-100" type="number"
                    placeholder="Cantidad de producto" id="cantidad" />
            </div>
            <div class="flex justify-center">
                <p v-if="invalido"
                    class=" whitespace-pre-wrap p-2 rounded-md ring-2 ring-red-500 text-red-600 font-medium text-sm">
                    {{ mensajeError }}</p>
            </div>
            <div class="flex justify-center">
                <button @click.prevent="registrar"
                    class="border-b-2 border-gray-600 text-blue-600 text-xl transform hover:scale-105 transition duration-300 ease-in-out">REGISTRAR</button>
            </div>

        </div>

    </div>

</template>
<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
export default {
    data() {
        return {
            producto: {
                codigo: '',
                descripcion: '',
                ubicacion: '',
                cantidad: null

            },
            productos: [],
            invalido: false,
            mensajeError: '',
            store: useUserStore()
        }
    },
    methods: {
        async registrar() {
            if (this.validar()) {
                let respuesta = await axios.get('https://api-rest-production-9ed7.up.railway.app/Alta_Producto', { "body": this.producto }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: this.store.user.token
                    }
                }
                )
                this.productos = respuesta.data
                console.log(this.productos);
                this.$emit('success')
            }
            else {
                this.invalido = true
            }
        },
        validar() {
            if (this.producto.codigo == '' || this.producto.descripcion == '' || this.producto.cantidad == null) {
                this.mensajeError = 'Por favor llene todos los campos solicitados'
                return false
            }
            if (this.producto.cantidad < 1) {
                this.mensajeError = 'La cantidad del producto debe ser mayor a 1 pieza'
                return false
            }
            return true
        }
    }
}
</script>