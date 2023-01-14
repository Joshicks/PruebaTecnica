<template>
    <div class="flex justify-center w-full mt-24 mb-8 flex-col">
        <h1 class="text-7xl text-white text-center m-8">PRODUCTOS</h1>
        <div class="flex flex-col bg-white items-center mx-32 p-14 rounded-xl shadow-xl h-full">
            <div class="flex space-x-8">
                <button @click.prevent="obtenerProductos"
                    class="rounded-lg bg-blue-700 text-white text-xl font-bold py-2 px-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">Ver
                    productos</button>
                <button @click.prevent="nuevoProducto = true"
                    class="rounded-lg bg-blue-700 text-white text-xl font-bold py-2 px-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">Registrar
                    productos</button>
                <button @click.prevent="eliminar=true"
                    class="rounded-lg bg-blue-700 text-white text-xl font-bold py-2 px-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">Eliminar
                    producto</button>
                <button
                    class="rounded-lg bg-blue-700 text-white text-xl font-bold py-2 px-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">Actualizar
                    producto</button>

            </div>
            <div class="grid grid-flow-rows grid-cols-4 mt-8 gap-x-8 gap-y-6">
                <div v-for="(i, index) in productos" :key="index" class="border-2 border-gray-600 rounded-lg p-4">
                    <input v-if="eliminar" type="checkbox" @click="productoEliminar = productos[index].id; eliminarProducto = true;" />
                    <p><strong>codigo:</strong> {{ productos[index].codigo }}</p>
                    <p><strong>descripcion:</strong> {{ productos[index].descripcion }}</p>
                    <p><strong>ubicacion:</strong> {{ productos[index].ubicacion }}</p>
                    <p><strong>cantidad:</strong> {{ productos[index].cantidad }}</p>

                </div>
            </div>

        </div>
        <FormularioProducto v-if="nuevoProducto" @success="nuevoProducto = false" />
        <div
            v-if="eliminarProducto" class="overflow-y-auto flex fixed inset-0 w-full h-full z-50 bg-gray-900 bg-opacity-60 items-center justify-center">
            <div class="flex flex-col bg-white py-4 px-8 rounded-xl">
                <div class="flex flex-col items-start">
                    <h1 class="text-xl mb-4">Eliminar producto</h1>
                    <p>Se eliminará el producto.</p>
                </div>
                    <button @click="eliminarElProducto"
                        class="px-4 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 transform hover:scale-110">
                        Eliminar
                    </button>
            </div>

        </div>

    </div>

</template>
<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import FormularioProducto from '@/components/FormularioProducto.vue'
export default {
    data() {
        return {
            productos: [],
            nuevoProducto: false,
            store: useUserStore(),
            productoEliminar: '',
            eliminarProducto: false,
            eliminar:false
        }
    },
    components: {
        FormularioProducto
    },
    methods: {
        async obtenerProductos() {
            let respuesta = await axios.get('https://api-rest-production-9ed7.up.railway.app/Productos', {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: this.store.user.token
                }
            }
            )
            switch (respuesta.status) {
                    case 200: {
                        this.productos = respuesta.data
                    }
                }

        },
        async eliminarElProducto(){
            let respuesta = await axios.delete('https://api-rest-production-9ed7.up.railway.app/eliminar/'+this.productoEliminar, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: this.store.user.token
                }
            }
            )
            switch (respuesta.status) {
                    case 200: {
                        this.productos = respuesta.data
                        this.eliminarProducto=false
                    }
                }
        }
    },
    mounted() {
        this.obtenerProductos()
    }
}
</script>