<script setup>
import { computed } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  products: Array
})

const emit = defineEmits(['update-stock'])

// กรองสินค้าที่สต็อกต่ำกว่า 10
const lowStockItems = computed(() => 
  props.products?.filter(p => (p.stock || 0) < 10) || []
)

function changeStock(product, amount) {
  if (amount === -1 && (product.stock || 0) <= 0) return;
  emit('update-stock', product.id, amount)
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="lowStockItems.length > 0" class="bg-[#A00000] text-white p-5 rounded-[2.5rem] shadow-xl flex items-center justify-between animate-pulse">
      <div class="flex items-center gap-4 ml-4">
        <AlertTriangle size="24" class="text-[#FFD700]" />
        <span class="font-black text-sm uppercase tracking-wider">Stock Warning: สินค้า {{ lowStockItems.length }} รายการใกล้หมด!</span>
      </div>
      <div class="flex gap-2 mr-4">
        <span v-for="item in lowStockItems" :key="item.id" class="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black italic">
          {{ item.name }} ({{ item.stock }})
        </span>
      </div>
    </div>

    <div class="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
      <div class="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
        <h4 class="font-black text-slate-800 text-2xl tracking-tighter italic uppercase">Inventory Control</h4>
        <div class="text-[10px] font-black text-[#A00000] bg-white px-4 py-2 rounded-xl border border-slate-100 uppercase tracking-widest">Live Monitoring</div>
      </div>
      
      <table class="w-full text-left">
        <thead class="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
          <tr>
            <th class="p-8">สินค้า</th>
            <th class="p-8 text-center">คงเหลือ</th>
            <th class="p-8 text-center">ปรับสต็อก</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="p in products" :key="p.id" class="hover:bg-slate-50 transition-colors">
            <td class="p-8 flex items-center gap-5">
              <img :src="p.image" class="w-16 h-16 object-contain bg-slate-100 rounded-2xl p-2 shadow-sm">
              <div>
                <p class="font-black text-slate-700 text-lg italic leading-none">{{ p.name }}</p>
                <span class="text-[10px] text-[#A00000] font-bold uppercase">{{ p.type }}</span>
              </div>
            </td>
            <td class="p-8 text-center">
               <span :class="p.stock < 10 ? 'text-red-600 bg-red-50' : 'text-slate-900 bg-slate-100'" 
                     class="px-6 py-2 rounded-2xl font-black text-2xl inline-block min-w-[80px]">
                 {{ p.stock || 0 }}
               </span>
            </td>
            <td class="p-8 text-center">
              <div class="flex justify-center items-center gap-4">
                <button @click="changeStock(p, -1)" class="w-12 h-12 bg-white border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-[#A00000] hover:text-white transition-all shadow-sm">-</button>
                <button @click="changeStock(p, 1)" class="w-12 h-12 bg-white border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-green-500 hover:text-white transition-all shadow-sm">+</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>