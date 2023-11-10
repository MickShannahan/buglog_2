<template>
  <div class="container-fluid px-5">
    <section class="row mt-3">
      <div class="col-12 d-flex justify-content-between">
        <h2>Bugs</h2>
        <button v-if="account.id" type="button" class="btn btn-warning" data-bs-toggle="modal"
          data-bs-target="#bugFormModal">
          Report Bug
        </button>
      </div>
    </section>

  </div>
  <BugsDisplay />


  <BugFormModal />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { bugsService } from '../services/BugsService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js'
import BugFormModal from '../components/BugFormModal.vue';
import BugsDisplay from '../components/BugsDisplay.vue';

export default {
  setup() {
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
      account: computed(() => AppState.account),

    };
  },
  components: { BugFormModal, BugsDisplay }
}
</script>

<style scoped lang="scss"></style>
