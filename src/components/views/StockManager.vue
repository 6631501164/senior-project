<script setup>
const props = defineProps({
  products: Array
})

const emit = defineEmits(['update-stock'])

// ฟังก์ชันส่งค่าไปที่ App.vue เพื่อคำนวณ
function changeStock(product, amount) {
  // ตรวจสอบไม่ให้ลดจนติดลบจากฝั่ง UI (Optional แต่ช่วยให้ UX ดีขึ้น)
  if (amount === -1 && (product.stock || 0) <= 0) return;
  
  emit('update-stock', product.id, amount)
}
</script>

<template>
  <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
    <div class="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
      <h4 class="font-black text-slate-800 text-2xl tracking-tighter">คลังสินค้าและสต็อก</h4>
      <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">จัดการทีละ 1 หน่วย</div>
    </div>
    
    <table class="w-full text-left">
      <thead class="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
        <tr>
          <th class="p-8">สินค้า</th>
          <th class="p-8 text-center">คงเหลือ</th>
          <th class="p-8 text-center">ปรับสต็อก (ทีละ 1)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50">
        <tr v-for="p in products" :key="p.id" class="hover:bg-blue-50/30 transition-colors">
          <td class="p-8 flex items-center gap-5">
            <img :src="p.image" class="w-16 h-16 object-contain bg-slate-100 rounded-2xl p-2 shadow-sm">
            <div>
              <p class="font-black text-slate-700 text-lg leading-none">{{ p.name }}</p>
              <span class="text-[10px] text-blue-500 font-bold uppercase">{{ p.type }}</span>
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
              <button 
                @click="changeStock(p, -1)" 
                class="w-12 h-12 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-xl hover:bg-red-500 hover:border-red-500 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                -
              </button>

              <button 
                @click="changeStock(p, 1)" 
                class="w-12 h-12 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-xl hover:bg-green-500 hover:border-green-500 hover:text-white transition-all active:scale-90 shadow-sm"
              >
                +
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>