<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">交易记录</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 添加新交易 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">添加新交易</h2>
        <form @submit.prevent="addNewTransaction" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">类型:</label>
              <select v-model="newTransaction.type" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="income">收入</option>
                <option value="expense">支出</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">金额:</label>
              <input v-model.number="newTransaction.amount" type="number" step="0.01" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">类别:</label>
              <input v-model="newTransaction.category" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">日期:</label>
              <input v-model="newTransaction.date" type="date" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述:</label>
            <input v-model="newTransaction.description" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">添加交易</button>
        </form>
      </div>

      <!-- 交易列表 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">交易列表</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">描述</th>
                <th class="text-left py-2 hidden sm:table-cell">类别</th>
                <th class="text-left py-2 hidden md:table-cell">日期</th>
                <th class="text-right py-2">金额</th>
                <th class="py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id" class="border-b">
                <td class="py-2">{{ transaction.description }}</td>
                <td class="py-2 hidden sm:table-cell">{{ transaction.category }}</td>
                <td class="py-2 hidden md:table-cell">{{ transaction.date }}</td>
                <td class="py-2 text-right" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                  {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount.toFixed(2) }}
                </td>
                <td class="py-2 text-right">
                  <button @click="removeTransaction(transaction.id)" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFinanceStore } from '../stores/finance'

const financeStore = useFinanceStore()
const { transactions } = storeToRefs(financeStore)

const newTransaction = ref({
  type: 'expense' as 'income' | 'expense',
  amount: 0,
  category: '',
  date: '',
  description: ''
})

function addNewTransaction() {
  financeStore.addTransaction(newTransaction.value)
  newTransaction.value = {
    type: 'expense',
    amount: 0,
    category: '',
    date: '',
    description: ''
  }
}

function removeTransaction(id: number) {
  financeStore.removeTransaction(id)
}
</script>
