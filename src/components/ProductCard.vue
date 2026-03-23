<script setup>
const props = defineProps({ product: Object })
const emit = defineEmits(["add"])
</script>

<template>
  <div class="bg-white border border-gray-100 rounded-3xl p-5 text-center flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
    <div class="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 h-48 flex items-center justify-center">
      <img :src="product.image" class="h-40 object-contain p-2 group-hover:scale-110 transition-transform duration-500">
      <span v-if="product.type === 'pack'" class="absolute top-2 right-2 bg-yellow-400 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">แบบแพ็ก</span>
    </div>

    <div>
      <h4 class="text-lg font-bold text-gray-800 leading-tight h-14 line-clamp-2">{{ product.name }}</h4>
      <p class="text-2xl font-black text-red-600 mt-2">฿ {{ product.price }}</p>
    </div>

    <button 
      @click="emit('add', product)"
      class="mt-5 w-full bg-red-600 hover:bg-gray-800 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <i class="fas fa-plus-circle"></i> สั่งซื้อเลย
    </button>
  </div>
</template>