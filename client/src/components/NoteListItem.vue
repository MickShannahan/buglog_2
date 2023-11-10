<template>
  <div class="py-2 px-3 bg-warning d-flex creator-info align-items-center">
    <img :src="noteProp.creator.picture" alt="Creator picture" class="rounded">
    <p class="fs-6 ms-3 mb-0">
      {{ noteProp.creator.name }}
    </p>
  </div>
  <div class="note-body p-3">
    {{ noteProp.body }}
  </div>
</template>


<script>
import { Note } from '../models/Note.js';

export default {
  props: {
    noteProp: { type: Note, required: true }
  },
  setup(props) {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 5vh;
  width: 5vh;
  border: 2px solid black;
}

.creator-info {
  width: fit-content;
  border-width: 2px 2px 0 2px;
  border-style: solid;
}

.note-body {
  border: 2px solid black;
}
</style>