<template>
  <div class="container-fluid px-5">
    <section class="row mt-3">
      <div class="col-12">
        <h2>Bugs You're tracking</h2>
      </div>
    </section>
  </div>
  <BugsDisplay />
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { trackedBugsService } from '../services/TrackedBugsService.js';
import { bugsService } from '../services/BugsService.js';
import BugsDisplay from '../components/BugsDisplay.vue';
export default {
  setup() {
    async function getMyTrackedBugs() {
      try {
        await trackedBugsService.getMyTrackedBugs();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      bugsService.clearAppState();
      getMyTrackedBugs();
    });
    return {
      account: computed(() => AppState.account)
    };
  },
  components: { BugsDisplay }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
