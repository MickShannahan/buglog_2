<template>
  <div class="container-fluid px-5">
    <section class="row labels bg-primary px-4">
      <div class="col-12  pt-2 ">
        <section class="row">
          <div class="col-3">
            <p class="fs-3">Title</p>
          </div>
          <div class="col-2">

            <p class="fs-3">
              <i @click="togglePriority()" role="button" class="mdi mdi-sort-variant"
                :class="{ 'bg-warning': sortByPriority }"></i>
              Priority
            </p>

          </div>
          <div class="col-2">
            <p class="fs-3">Reported By</p>

          </div>
          <div class="col-3">
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
        <section v-for="(bug, index) in bugs" :key="bug.id" class="row bottom-border" :class="{
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
import { computed, ref } from 'vue';
import BugListItem from './BugListItem.vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    const showOpen = ref(false)
    const sortByPriority = ref(false)

    return {
      showOpen,
      sortByPriority,
      togglePriority() {
        sortByPriority.value = !sortByPriority.value
      },
      bugs: computed(() => {
        const bugs = AppState.bugs

        if (sortByPriority.value) {
          bugs.sort((a, b) => b.priority - a.priority)
        }
        else {
          bugs.sort((a, b) => b.updatedAt - a.updatedAt)
        }

        return showOpen.value ? bugs.filter(bug => !bug.closed) : bugs
      })
    };
  },
  components: { BugListItem }
}
</script>


<style lang="scss" scoped>
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

.bottom-border {
  border-bottom: 1px solid black;
}
</style>