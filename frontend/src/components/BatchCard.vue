<script setup>
import { ref } from 'vue'
const selectedBatch = ref(null)

const completionActual = ref(0)
const completionWaste = ref(0)

const openCompletionPanel = (batch) => {
  selectedBatch.value = batch
  completionActual.value = batch.actualQty || 0
  completionWaste.value = batch.wastage || 0
}
const confirmCompletion = () => {
  selectedBatch.value.actualQty = Number(completionActual.value)

  selectedBatch.value.wastage = Number(completionWaste.value)

  selectedBatch.value.status = 'done'

  selectedBatch.value = null
}
const markFailed = (batch) => {
  batch.status = 'failed'
}

const props = defineProps({
  batch: {
    type: Object,
    required: true
  }
})
// task 1

const batches = ref([{
  id: 5,
  product: 'Chocolate Cake',
  plannedQty: 20,
  actualQty: 18,
  wastage: 2,
  status: 'done',
  startTime: '6:30',
  endTime: '9:00'
},
{
  id: 6,
  product: 'Cinnamon Roll',
  plannedQty: 30,
  actualQty: null,
  wastage: 0,
  status: 'planned',
  startTime: null,
  endTime: null
},
{
  id: 7,
  product: 'White Bread',
  plannedQty: 50,
  actualQty: 35,
  wastage: 15,
  status: 'done',
  startTime: '5:00',
  endTime: '7:00'
},
{
  id: 8,
  product: 'Meat Pie',
  plannedQty: 40,
  actualQty: null,
  wastage: 0,
  status: 'baking',
  startTime: '10:00',
  endTime: null
}
])
// task 2

const totalBatches = computed(() => batches.value.length)

const completedBatches = computed(() =>
  batches.value.filter(batch => batch.status === 'done').length
)

const plannedBatches = computed(() =>
  batches.value.filter(batch => batch.status === 'planned').length
)

const inProgressCount = computed(() =>
  batches.value.filter(batch =>
    ['mixing', 'baking', 'cooling'].includes(batch.status)
  ).length
)

const lowYieldCount = computed(() =>
  batches.value.filter(batch =>
    batch.actualQty &&
    (batch.actualQty / batch.plannedQty) * 100 < 80
  ).length
)
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white p-4 rounded shadow">
          <h3>Total</h3>
          <p>{{ totalBatches }}</p>
        </div>

       <div class="bg-white p-4 rounded shadow">
         <h3>Completed</h3>
         <p>{{ completedBatches }}</p>
       </div>

       <div class="bg-white p-4 rounded shadow">
         <h3>Planned</h3>
         <p>{{ plannedBatches }}</p>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <h3>In Progress</h3>
          <p>{{ inProgressCount }}</p>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <h3>Low Yield</h3>
          <p>{{ lowYieldCount }}</p>
        </div>
  </div>
  <button
  v-if="batch.status === 'cooling'"
  @click="openCompletionPanel(batch)"
  class="bg-green-500 text-white px-3 py-1 rounded"
  >
  Mark Done
  </button>

  <div
     v-if="selectedBatch"
     class="mt-6 bg-white p-6 rounded shadow"
        >
      <h2 class="text-lg font-bold mb-4">
          Complete Batch: {{ selectedBatch.product }}
      </h2>

     <div class="space-y-4">
         <input
           v-model.number="completionActual"
           type="number"
           placeholder="Actual Quantity"
          class="border p-2 rounded w-full"
         />

          <input
           v-model.number="completionWaste"
           type="number"
           placeholder="Wastage"
           class="border p-2 rounded w-full"
         />

          <button
           @click="confirmCompletion"
           class="bg-green-600 text-white px-4 py-2 rounded"
           >
           Confirm
          </button>
      </div>
  </div>
  <button
      v-if="['mixing', 'baking'].includes(batch.status)"
      @click="markFailed(batch)"
       class="text-red-600 text-sm underline"
      >
      ❌ Mark Failed
   </button>
   <div
      v-if="batch.status === 'failed'"
      class="bg-red-100 text-red-700 p-2 rounded mb-2"
     >
     Batch Failed
    </div>
</template>

<style scoped>
.batch-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>