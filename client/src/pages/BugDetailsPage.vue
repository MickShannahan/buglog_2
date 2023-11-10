<template>
  <div v-if="bug" class="container-fluid px-5">
    <section class="row">
      <div class="col-12 move-down">
        <h1 class="p-4 mb-0 bg-warning">
          <span>{{ bug.title }}</span>
        </h1>
        <div class="bg-primary backdrop bug-border"></div>
      </div>
      <div class="col-12 move-up">
        <section class="row bg-light bug-border align-items-end mx-4 p-4">
          <div class="col-4 d-flex align-items-end">
            <img :src="bug.creator.picture" alt="Creator picture" class="img-fluid rounded bug-border">
            <div class="ms-3">
              <label class="text-secondary" for="creatorName">Reported By</label>
              <p class="fs-4" id="creatorName">{{ bug.creator.name }}</p>
            </div>
          </div>
          <div class="col-2">
            <label class="text-secondary" for="priority">Priority</label>
            <p class="fs-4" id="priority">{{ bug.priority }}</p>
          </div>
          <div class="col-2">
            <label class="text-secondary" for="lastUpdated">Last Updated</label>
            <p class="fs-4" id="lastUpdated">{{ bug.updatedAt.toLocaleString() }}</p>
          </div>
          <div class="col-4">
          </div>
          <div class="col-12 mt-3">
            {{ bug.description }}
          </div>
          <div class="col-12 mt-3">
            <button @click="createTrackedBug()" class="btn btn-success">
              <i class="mdi mdi-magnify me-1"></i>
              <span>Track Bug</span>
            </button>
          </div>
        </section>
      </div>
    </section>
    <section class="row row bg-light bug-border mx-4 mb-3">
      <div class="col-12 px-0">
        <h2 class="px-5 py-3 mb-0 bg-warning">Notes</h2>
        <form v-if="account.id" @submit.prevent="createNote()">
          <div class="mx-5 mt-3">
            <div class="form-floating">
              <textarea required v-model="editable.body" class="form-control bug-border" placeholder="Leave a note"
                id="notes" maxlength="200"></textarea>
              <label for="notes">Leave a note!</label>
            </div>
            <div class="text-end mt-3">
              <button class="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
        <div v-for="note in notes" :key="note.id" class="px-5 mb-3">
          <NoteListItem :noteProp="note" />
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="p-4">Loading.... <i class="mdi mdi-bug mdi-spin"></i></h1>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { bugsService } from '../services/BugsService.js';
import { notesService } from '../services/NotesService.js';
import { AppState } from '../AppState.js'
import NoteListItem from '../components/NoteListItem.vue';
import { trackedBugsService } from '../services/TrackedBugsService.js';

export default {
  setup() {
    const route = useRoute();
    const editable = ref({});

    async function getBugById(bugId) {
      try {
        await bugsService.getBugById(bugId);
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getNotesByBugId(bugId) {
      try {
        await notesService.getNotesByBugId(bugId);
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getTrackedsBugsByBugId(bugId) {
      try {
        await trackedBugsService.getTrackedBugsById(bugId)
      } catch (error) {
        Pop.error(error)
      }
    }

    watch(
      () => route.params.bugId,
      (bugId) => {
        getBugById(bugId);
        getNotesByBugId(bugId);
        getTrackedsBugsByBugId(bugId);
      },
      { immediate: true }
    );

    return {
      editable,
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),

      async createNote() {
        try {
          const noteData = editable.value;
          noteData.bugId = route.params.bugId;
          await notesService.createNote(noteData);
          editable.value = {};
        }
        catch (error) {
          Pop.error(error);
        }
      },

      async createTrackedBug() {
        try {
          const trackedBugData = { bugId: route.params.bugId }
          await trackedBugsService.createTrackedBug(trackedBugData)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { NoteListItem }
}
</script>


<style lang="scss" scoped>
h1,
h2 {
  width: fit-content;
}

h1 {
  border-width: 2px 2px 0;
  border-style: solid;
  border-color: black;
}

h2 {
  border-width: 0 2px 2px 0;
  border-style: solid;
  border-color: black;
}

p {
  margin: 0;
}

textarea {
  min-height: 150px !important;
}

.backdrop {
  height: 20vh;
}

.move-down {
  transform: translateY(5vh);
}

.move-up {
  transform: translateY(-10vh);
}

.details {
  border: 2px solid black;
}

.bug-border {
  border: 2px solid black;
}

.creator-picture {
  border: 2px solid black;
}
</style>