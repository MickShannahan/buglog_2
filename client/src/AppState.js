import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Bug.js').Bug[]} */
  bugs: [],
  /** @type {import('./models/Bug.js').Bug | null} */
  bug: null,
  /** @type {import('./models/Note.js').Note[]} */
  notes: [],
  /** @type {import('./models/TrackedBug.js').TrackedBug[]} */
  trackedBugs: []
})
