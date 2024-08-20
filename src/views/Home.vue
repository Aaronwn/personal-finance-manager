<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-4xl font-bold mb-12 text-center">欢迎使用财务管理系统</h1>

    <!-- 财务概览 -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-12">
      <h2 class="text-2xl font-semibold mb-4">财务概览</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-green-100 p-4 rounded">
          <h3 class="text-lg font-medium text-gray-700 mb-2">总收入</h3>
          <p class="text-2xl font-bold text-green-600">{{ totalIncome.toFixed(2) }} 元</p>
        </div>
        <div class="bg-red-100 p-4 rounded">
          <h3 class="text-lg font-medium text-gray-700 mb-2">总支出</h3>
          <p class="text-2xl font-bold text-red-600">{{ totalExpense.toFixed(2) }} 元</p>
        </div>
        <div class="bg-blue-100 p-4 rounded">
          <h3 class="text-lg font-medium text-gray-700 mb-2">余额</h3>
          <p class="text-2xl font-bold" :class="balance >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ balance.toFixed(2) }} 元
          </p>
        </div>
      </div>
    </div>

    <!-- 快速访问卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link to="/transactions" class="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300">
        <h2 class="text-2xl lg:text-3xl font-semibold mb-4">交易记录</h2>
        <p class="text-gray-600 text-lg">管理您的收入和支出</p>
      </router-link>

      <router-link to="/budget" class="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300">
        <h2 class="text-2xl lg:text-3xl font-semibold mb-4">预算管理</h2>
        <p class="text-gray-600 text-lg">设置和跟踪您的预算</p>
      </router-link>

      <router-link to="/reports" class="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300">
        <h2 class="text-2xl lg:text-3xl font-semibold mb-4">财务报表</h2>
        <p class="text-gray-600 text-lg">查看您的财务概览和趋势</p>
      </router-link>
    </div>

    <!-- 添加数据管理组件 -->
    <div class="mt-12">
      <DataManagement />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFinanceStore } from '../stores/finance'
import DataManagement from '../components/DataManagement.vue'

const financeStore = useFinanceStore()
const { totalIncome, totalExpense, balance } = storeToRefs(financeStore)
</script>