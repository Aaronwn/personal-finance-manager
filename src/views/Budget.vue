<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-4xl font-bold mb-12 text-center">预算管理</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 设置预算 -->
      <div class="lg:col-span-1">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-6">设置预算</h2>
          <form @submit.prevent="setBudget" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">类别:</label>
              <input v-model="newBudget.category" type="text" class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">金额:</label>
              <input v-model.number="newBudget.amount" type="number" step="0.01" class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 text-lg font-medium">
              设置预算
            </button>
          </form>
        </div>
      </div>

      <!-- 预算列表 -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-6">预算列表</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left py-3 px-4 font-semibold text-gray-600">类别</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-600">预算金额</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-600">已使用</th>
                  <th class="text-right py-3 px-4 font-semibold text-gray-600">剩余</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(amount, category) in budget" :key="category" class="border-b">
                  <td class="py-3 px-4">{{ category }}</td>
                  <td class="py-3 px-4 text-right font-medium">{{ amount.toFixed(2) }}</td>
                  <td class="py-3 px-4 text-right text-red-600 font-medium">
                    {{ getUsedAmount(category).toFixed(2) }}
                  </td>
                  <td class="py-3 px-4 text-right" :class="getRemainingAmount(category) >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ getRemainingAmount(category).toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 预算使用情况图表 -->
    <div class="mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-6">预算使用情况</h2>
      <div class="h-96">
        <Bar :data="budgetChartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFinanceStore } from '../stores/finance'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const financeStore = useFinanceStore()
const { budget, transactions } = storeToRefs(financeStore)

const newBudget = ref({
  category: '',
  amount: 0
})

function setBudget() {
  financeStore.setBudget(newBudget.value.category, newBudget.value.amount)
  newBudget.value = { category: '', amount: 0 }
}

function getUsedAmount(category: string) {
  return transactions.value
    .filter(t => t.category === category && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

function getRemainingAmount(category: string) {
  return budget.value[category] - getUsedAmount(category)
}

const budgetChartData = computed(() => ({
  labels: Object.keys(budget.value),
  datasets: [
    {
      label: '预算金额',
      data: Object.values(budget.value),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: '已使用',
      data: Object.keys(budget.value).map(getUsedAmount),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>