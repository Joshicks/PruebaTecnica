<template>
  <div class="flex min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: "App",
  components: {
  },
})
</script>

