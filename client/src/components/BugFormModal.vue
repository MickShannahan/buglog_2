<template>
  <div class="modal fade" id="bugFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ editableBug ? 'Edit Bug' : 'Create Bug' }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="handleSubmit()">

          <div class="modal-body">

            <div class="form-floating mb-3">
              <input v-model="editable.title" type="text" class="form-control" id="bugTitle" placeholder="Bug Title"
                maxlength="30" required>
              <label for="bugTitle">Bug Title</label>
            </div>

            <div class="form-floating mb-3">
              <textarea v-model="editable.description" class="form-control"
                placeholder="Leave a description of the bug here here" id="bugDescription" maxlength="200"
                required></textarea>
              <label for="bugDescription">Description</label>
            </div>

            <label for="bugPriority" class="form-label">Bug Priority: {{ editable.priority }}</label>
            <input v-model="editable.priority" type="range" class="form-range" min="1" max="5" id="bugPriority">

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">{{ editableBug ? 'Submit Changes' : 'Submit Bug' }}</button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { bugsService } from '../services/BugsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { Bug } from '../models/Bug.js';

export default {
  props: {
    editableBug: { type: Bug }
  },
  setup(props) {
    const router = useRouter()
    const editable = ref({})
    function setEditable() {
      editable.value = props.editableBug ? { ...props.editableBug } : { priority: 1 }
    }
    onMounted(setEditable)
    return {
      editable,
      handleSubmit() {
        props.editableBug ? this.updateBug() : this.createBug()
      },
      async createBug() {
        try {
          const bugData = editable.value
          const bugId = await bugsService.createBug(bugData)
          setEditable()
          Modal.getOrCreateInstance('#bugFormModal').hide()
          router.push({ name: 'BugDetails', params: { bugId } })
        } catch (error) {
          Pop.error(error)
        }
      },
      async updateBug() {
        try {
          const bugData = editable.value
          await bugsService.updateBug(bugData)
          setEditable()
          Modal.getOrCreateInstance('#bugFormModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>