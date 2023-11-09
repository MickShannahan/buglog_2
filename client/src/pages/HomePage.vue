<template>
  <div class="container-fluid px-5">
    <section class="row mt-3">
      <div class="col-12 d-flex justify-content-between">
        <h2>Bugs</h2>
        <button type="button" class="btn btn-warning">
          Report Bug
        </button>
      </div>
    </section>
    <section class="row labels bg-primary px-4">
      <div class="col-12  pt-2 ">
        <section class="row">
          <div class="col-3">
            <p class="fs-3">Title</p>
          </div>
          <div class="col-2">
            <p class="fs-3">Priority</p>

          </div>
          <div class="col-3">
            <p class="fs-3">Reported By</p>

          </div>
          <div class="col-2">
            <p class="fs-3">Last Updated</p>

          </div>
          <div class="col-2">
            <p class="fs-3">All Bugs</p>
          </div>
        </section>
      </div>
    </section>

    <section class="row bugs px-4">
      <div class="col-12">
        <section v-for="(bug, index) in bugs" :key="bug.id" class="row"
          :class="{ 'bg-light': index % 2 == 0, 'bg-secondary lighten-10': index % 2 == 1 }">
          <div class="col-3">
            <p class="fs-4">{{ bug.title }}</p>
          </div>
          <div class="col-2">
            <p class="fs-4">Priority</p>

          </div>
          <div class="col-3">
            <p class="fs-4">Reported By</p>

          </div>
          <div class="col-2">
            <p class="fs-4">Last Updated</p>

          </div>
          <div class="col-2">
            <p class="fs-4">All Bugs</p>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { bugsService } from '../services/BugsService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js'

export default {
  setup() {
    async function getBugs() {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
.labels {
  min-height: 15vh;
  border: 2px solid;
  transform: translateY(3vh);
}

.bugs {
  transform: translateY(-3vh);
}

.bugs>.col-12 {
  border: 2px solid;

}
</style>
