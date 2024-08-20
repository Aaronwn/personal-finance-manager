<template>
  <div class="flex flex-col min-h-screen">
    <nav class="bg-gray-800 text-white fixed top-0 left-0 right-0 z-10">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="text-xl font-bold">财务管理</router-link>
          <div class="flex space-x-4">
            <router-link to="/" class="hover:text-gray-300">首页</router-link>
            <router-link to="/transactions" class="hover:text-gray-300">交易</router-link>
            <router-link to="/budget" class="hover:text-gray-300">预算</router-link>
            <router-link to="/reports" class="hover:text-gray-300">报表</router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="flex-grow mt-16">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// 不需要额外的逻辑
</script>