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
          <div class="col-2 d-flex justify-content-between">
            <p class="fs-3 me-4">
              {{ showOpen ? 'Open Bugs' : 'All Bugs' }}
            </p>
            <div class="form-check form-switch fs-3">
              <input v-model="showOpen" class="form-check-input" type="checkbox" role="switch"
                id="flexSwitchCheckDefault">
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="row bugs px-4">
      <div class="col-12">
        <section v-for="(bug, index) in bugs" :key="bug.id" class="row" :class="{
          'bg-light': index % 2 == 0 && bug.priority < 5,
          'bg-secondary lighten-10': index % 2 == 1 && bug.priority < 5,
          'bg-warning': bug.priority == 5
        }">
          <BugListItem :bugProp="bug" />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { bugsService } from '../services/BugsService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js'
import BugListItem from '../components/BugListItem.vue';

export default {
  setup() {
    const showOpen = ref(false)
    async function getBugs() {
      try {
        await bugsService.getBugs();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getBugs();
    });
    return {
      showOpen,
      bugs: computed(() => {
        return showOpen.value ? AppState.bugs.filter(bug => !bug.closed) : AppState.bugs
      })
    };
  },
  components: { BugListItem }
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
