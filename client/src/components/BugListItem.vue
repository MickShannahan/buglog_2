<template>
  <div class="col-3">
    <router-link :title="`Go to ${bugProp.title}'s details page`"
      :to="{ name: 'BugDetails', params: { bugId: bugProp.id } }">
      <p class="fs-4 text-dark">{{ bugProp.title }}</p>
    </router-link>
  </div>
  <div class="col-2">
    <p class="fs-4">{{ bugProp.priority }}</p>
  </div>
  <div class="col-2">
    <p class="fs-4">{{ bugProp.creator.name }}</p>
  </div>
  <div class="col-3">
    <p class="fs-4">{{ bugProp.updatedAt.toLocaleString() }}</p>
  </div>
  <div class="col-2 pe-5">
    <p class="fs-4 d-flex justify-content-between">
      <span>
        {{ bugProp.closed ? 'Closed' : 'Open' }}
      </span>
      <span class="circle-status" :class="{ 'bg-danger': !bugProp.closed, 'bg-success': bugProp.closed }"></span>
    </p>
  </div>
</template>


<script>
import { Bug } from '../models/Bug.js';

export default {
  props: {
    bugProp: { type: Bug, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.circle-status {
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  border: 1px solid black;
}

p {
  margin: .2em;
}
</style>