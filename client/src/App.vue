<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-warning">
    <div class="container-fluid">
      <section class="row py-2">
        <div class="col-12 p-0">
          <marquee class="w-100" behavior="" direction="" scrollamount="20">
            <i class="mdi mdi-ladybug mdi-rotate-270"></i>
            <i class="mdi mdi-bug mdi-rotate-270 mx-5"></i>
            <i class="mdi mdi-ladybug mdi-rotate-270"></i>
          </marquee>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
