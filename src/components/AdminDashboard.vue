<script setup>
defineProps({
  products: Array // รับข้อมูลสินค้าจาก App.vue มาโชว์ในตาราง
})
const emit = defineEmits(["close"])
</script>

<template>
  <div class="flex min-h-screen bg-slate-100 font-sans w-full">
    
    <aside class="w-72 bg-slate-900 text-slate-300 flex flex-col p-6 sticky top-0 h-screen shadow-2xl">
      <div class="flex items-center gap-3 mb-10 px-2">
        <div class="bg-yellow-400 text-red-600 font-black p-2 rounded-xl text-xl leading-none shadow-lg">MFU</div>
        <span class="font-bold text-white text-xl tracking-tighter">ADMIN SYSTEM</span>
      </div>

      <nav class="space-y-3 flex-1">
        <button class="w-full flex items-center gap-3 px-5 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all">
          <span class="text-xl">📊</span> แดชบอร์ดรวม
        </button>
        <button class="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 rounded-2xl transition-all font-medium">
          <span class="text-xl">📦</span> จัดการสต็อก
        </button>
        <button class="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 rounded-2xl transition-all font-medium">
          <span class="text-xl">🛒</span> ออเดอร์ลูกค้า
        </button>
      </nav>

      <button @click="emit('close')" class="mt-auto flex items-center gap-3 px-5 py-4 text-slate-400 hover:text-white transition-all border-t border-slate-800 pt-6 font-bold">
        <span>←</span> กลับไปหน้าขายสินค้า
      </button>
    </aside>

    <main class="flex-1 p-8 md:p-12 overflow-y-auto">
      <header class="flex justify-between items-center mb-10">
        <h2 class="text-4xl font-black text-slate-800 tracking-tighter uppercase">ภาพรวมระบบ</h2>
        <div class="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-200">
          <div class="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-black shadow-inner">A</div>
          <div>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">สถานะ</p>
            <p class="text-sm font-bold text-slate-700 leading-none">ผู้ดูแลระบบ (Admin)</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border-b-8 border-green-500 hover:shadow-xl transition-all group">
          <p class="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">ยอดขายวันนี้</p>
          <h3 class="text-4xl font-black text-slate-800 group-hover:text-green-600 transition-colors">฿ 14,200</h3>
        </div>
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border-b-8 border-blue-500 hover:shadow-xl transition-all group">
          <p class="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">ออเดอร์รอจัดส่ง</p>
          <h3 class="text-4xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">24 รายการ</h3>
        </div>
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border-b-8 border-yellow-500 hover:shadow-xl transition-all group">
          <p class="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">สินค้าใกล้หมด</p>
          <h3 class="text-4xl font-black text-slate-800 group-hover:text-yellow-600 transition-colors">3 ชนิด</h3>
        </div>
      </div>

      <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div class="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h4 class="font-black text-slate-800 text-2xl tracking-tighter">รายการสต็อกปัจจุบัน</h4>
          <button class="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95 uppercase text-sm tracking-widest">
            + เพิ่มสินค้าใหม่
          </button>
        </div>
        
        <table class="w-full text-left">
          <thead class="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
            <tr>
              <th class="p-8">สินค้า</th>
              <th class="p-8 text-center">ราคาขาย</th>
              <th class="p-8 text-center">ประเภท</th>
              <th class="p-8 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="p in products" :key="p.id" class="hover:bg-blue-50/30 transition-colors">
              <td class="p-8 flex items-center gap-5">
                <img :src="p.image" class="w-16 h-16 object-contain bg-slate-100 rounded-2xl p-2 shadow-sm">
                <span class="font-black text-slate-700 text-lg">{{ p.name }}</span>
              </td>
              <td class="p-8 text-center font-black text-slate-900 text-xl">฿ {{ p.price }}</td>
              <td class="p-8 text-center">
                <span :class="p.type === 'pack' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-blue-100 text-blue-700 border-blue-200'" 
                  class="text-xs px-4 py-1.5 rounded-full font-black uppercase border-2 shadow-sm">
                  {{ p.type }}
                </span>
              </td>
              <td class="p-8 text-center">
                <div class="flex justify-center gap-3">
                  <button class="px-5 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all font-bold text-sm">แก้ไข</button>
                  <button class="px-5 py-2 bg-slate-100 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm">ลบ</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>