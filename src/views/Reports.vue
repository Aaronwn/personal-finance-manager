<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-3xl font-bold mb-8 text-center">财务报表</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">收支概览</h2>
        <div class="space-y-3">
          <p class="flex justify-between text-lg">
            <span>总收入:</span>
            <span class="text-green-600 font-bold">{{ totalIncome.toFixed(2) }} 元</span>
          </p>
          <p class="flex justify-between text-lg">
            <span>总支出:</span>
            <span class="text-red-600 font-bold">{{ totalExpense.toFixed(2) }} 元</span>
          </p>
          <p class="flex justify-between text-lg border-t pt-2">
            <span>余额:</span>
            <span :class="balance >= 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">{{ balance.toFixed(2) }} 元</span>
          </p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">收支比例</h2>
        <div class="h-64 lg:h-80">
          <Pie :data="incomeExpenseData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">月度收支趋势</h2>
      <div class="h-64 lg:h-96">
        <Line :data="monthlyTrendData" :options="chartOptions" />
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">支出类别统计</h2>
      <div class="h-64 lg:h-96">
        <Bar :data="categoryData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFinanceStore } from '../stores/finance'
import { Pie, Line, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement)

const financeStore = useFinanceStore()
const { totalIncome, totalExpense, balance } = storeToRefs(financeStore)

const isLoading = ref(true)

onMounted(() => {
  // 模拟数据加载
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

// 收支比例数据
const incomeExpenseData = computed(() => ({
  labels: ['收入', '支出'],
  datasets: [{
    data: [totalIncome.value, totalExpense.value],
    backgroundColor: ['#10B981', '#EF4444']
  }]
}))

// 月��收支趋势数据
const monthlyTrendData = computed(() => {
  let monthlyData = getMonthlyData()

  // 如果数据少于6个月,添加一些空月份
  if (monthlyData.length < 6) {
    const lastMonth = new Date(monthlyData[monthlyData.length - 1]?.month || new Date())
    for (let i = monthlyData.length; i < 6; i++) {
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      const monthKey = `${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1}`
      monthlyData.unshift({ month: monthKey, income: 0, expense: 0 })
    }
  }

  return {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: '收入',
        data: monthlyData.map(d => d.income),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.1
      },
      {
        label: '支出',
        data: monthlyData.map(d => d.expense),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.1
      }
    ]
  }
})

// 类别统计数据
const categoryData = computed(() => {
  const categoryTotals = getCategoryTotals()
  return {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: '支出金额',
      data: Object.values(categoryTotals),
      backgroundColor: '#60A5FA'
    }]
  }
})

function getMonthlyData() {
  const monthlyData = {}
  financeStore.transactions.forEach(transaction => {
    const date = new Date(transaction.date)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }
    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount
    } else {
      monthlyData[monthKey].expense += transaction.amount
    }
  })

  return Object.entries(monthlyData)
    .map(([key, value]) => ({
      month: key,
      income: value.income,
      expense: value.expense
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

function getCategoryTotals() {
  const categoryTotals = {}
  financeStore.transactions.forEach(transaction => {
    if (transaction.type === 'expense') {  // 只统计支出类别
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0
      }
      categoryTotals[transaction.category] += transaction.amount
    }
  })
  return categoryTotals
}
</script>