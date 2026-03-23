<script setup>
defineProps({
  search: String,
  cartCount: Number,
  total: Number
})

// เพิ่ม "open-order" (ไปหน้าออเดอร์) และ "go-home" (กลับหน้าสินค้า)
const emit = defineEmits(["update:search", "open-order", "go-home"])
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">

      <div @click="emit('go-home')" class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <div class="bg-yellow-400 p-1.5 rounded-lg">
          <h2 class="text-2xl font-black text-red-600 leading-none">MFU</h2>
        </div>
        <span class="hidden md:block font-bold text-gray-700">M-STORE</span>
      </div>

      <div class="flex-1 max-w-2xl relative group">
        <input
          :value="search"
          @input="emit('update:search', $event.target.value)"
          placeholder="ค้นหาน้ำดื่มลานดาว..."
          class="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all outline-none text-sm"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-[10px] text-gray-500 uppercase font-bold">ยอดรวม</p>
          <p class="text-sm font-black text-red-600">฿ {{ total }}</p>
        </div>
        <div @click="$emit('open-admin')" class="flex items-center gap-2 cursor-pointer border-r pr-4">
  <div class="bg-yellow-400 p-1.5 rounded-lg">
    <h2 class="text-2xl font-black text-red-600 leading-none">MFU</h2>
  </div>
  <span class="hidden md:block font-bold text-gray-700 uppercase">Admin Hub</span>
</div>
        <div 
          @click="emit('open-order')" 
          class="relative bg-gray-100 p-2.5 rounded-xl hover:bg-yellow-400 hover:text-white transition-all cursor-pointer group shadow-sm active:scale-90"
        >
          <span class="text-xl group-hover:scale-110 block transition-transform">🛒</span>
          
          <span v-if="cartCount > 0" 
            class="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {{ cartCount }}
          </span>
        </div>
      </div>

    </div>
  </nav>
</template>