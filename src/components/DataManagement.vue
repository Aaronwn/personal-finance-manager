<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">数据管理</h2>
    <div class="space-y-4">
      <div>
        <button @click="exportData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          导出数据到Excel
        </button>
      </div>
      <div>
        <label for="importFile" class="block text-sm font-medium text-gray-700 mb-2">从Excel导入数据:</label>
        <input type="file" id="importFile" @change="handleFileUpload" accept=".xlsx, .xls" class="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceStore } from '../stores/finance'

const financeStore = useFinanceStore()

function exportData() {
  financeStore.exportToExcel()
}

async function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      await financeStore.importFromExcel(file)
      alert('数据导入成功')
    } catch (error) {
      alert(error)
    }
  }
}
</script>