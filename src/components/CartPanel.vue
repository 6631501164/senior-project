<script setup>
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-vue-next"
const props = defineProps({ cart: Array, subtotal: Number, shipping: Number, total: Number })
const emit = defineEmits(["increase", "decrease", "remove"])
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center gap-2 pb-2 border-b">
      <ShoppingBag class="text-yellow-500" size="20" />
      <h3 class="font-bold text-gray-800">ตะกร้าของคุณ</h3>
    </div>

    <p v-if="cart.length === 0" class="py-10 text-center text-gray-400 italic">ตะกร้าว่างเปล่า...</p>

    <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
      <img :src="item.image" class="w-14 h-14 object-contain bg-white rounded-lg shadow-sm" />
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-gray-800 truncate">{{ item.name }}</p>
        <p class="text-xs text-red-500 font-bold">฿ {{ item.price }}</p>
      </div>

      <div class="flex flex-col items-center gap-1">
        <div class="flex items-center bg-white rounded-lg border shadow-sm">
          <button @click="emit('decrease', item)" class="p-1 hover:text-red-500"><Minus size="14" /></button>
          <span class="px-2 text-xs font-bold">{{ item.qty }}</span>
          <button @click="emit('increase', item)" class="p-1 hover:text-green-500"><Plus size="14" /></button>
        </div>
        <button @click="emit('remove', item)" class="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size="14" /></button>
      </div>
    </div>

    <div v-if="cart.length > 0" class="pt-4 mt-4 border-t border-dashed border-gray-200 space-y-2">
      <div class="flex justify-between text-sm text-gray-600"><span>รวมสินค้า:</span><span>฿ {{ subtotal }}</span></div>
      <div class="flex justify-between text-sm text-gray-600"><span>ค่าจัดส่ง:</span><span>฿ {{ shipping }}</span></div>
      <div class="flex justify-between items-end pt-2">
        <span class="font-bold text-gray-800">ยอดสุทธิ:</span>
        <span class="text-2xl font-black text-red-600 font-mono">฿ {{ total }}</span>
      </div>
      <button class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95 uppercase tracking-wider">
        ชำระเงิน
      </button>
    </div>
  </div>
</template>