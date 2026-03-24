<script setup>
import { ref, computed } from "vue"
import AdminSidebar from "./AdminSidebar.vue"
import { Package, AlertTriangle, EyeOff, TrendingUp, ShoppingBag, Truck, CheckCircle, XCircle } from "lucide-vue-next"

const props = defineProps({
  products: Array,
  orders: Array
})

const emit = defineEmits(["close", "update-stock", "toggle-status"])
const currentTab = ref('overview')

// --- 1. Logic สำหรับสรุปสถิติด้านบน ---
const stats = computed(() => {
  const orders = props.orders || []
  const today = new Date().toISOString().substr(0, 10)

  return {
    // ยอดขายวันนี้ (กรองเฉพาะรายการที่จ่ายเงินแล้วหรือสำเร็จ)
    todaySales: orders
      .filter(o => o.status !== 'cancelled' && o.status !== 'pending') 
      .reduce((sum, o) => sum + (o.total || 0), 0),
    
    // จำนวนออเดอร์ทั้งหมด
    totalOrders: orders.length,
    
    // ออเดอร์ที่ต้องส่ง (สถานะที่รับเงินแล้วแต่ยังส่งไม่ถึง เช่น 'paid', 'preparing', 'ready')
    toShip: orders.filter(o => ['paid', 'preparing', 'ready', 'pending'].includes(o.status)).length,
    
    // ส่งสำเร็จ
    completed: orders.filter(o => o.status === 'completed').length,
    
    // ยกเลิก
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }
})

// --- 2. Logic สต็อกสินค้า ---
const lowStockItems = computed(() => 
  props.products?.filter(p => (p.stock || 0) < 10 && p.status !== 'inactive') || []
)

function changeStock(product, amount) {
  if (product.status === 'inactive') return;
  emit('update-stock', product.id, amount)
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 font-sans w-full text-left overflow-hidden">
    
    <AdminSidebar 
      :currentTab="currentTab" 
      @change-tab="(tab) => currentTab = tab"
      @close="emit('close')"
    />

    <main class="flex-1 p-10 overflow-y-auto">
      <header class="flex justify-between items-center mb-10">
        <div class="border-l-8 border-[#A00000] pl-6">
          <h2 class="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            {{ currentTab === 'overview' ? 'Dashboard' : 'Inventory' }}
          </h2>
        </div>
      </header>

      <div v-if="currentTab === 'overview'" class="space-y-10 animate-in fade-in duration-500">
        
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          <div class="bg-white p-6 rounded-[2.5rem] border-2 border-red-600 shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md">
  <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
    <TrendingUp size="20" />
  </div>
  <div>
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ยอดขายวันนี้</p>
    <h3 class="text-3xl font-black text-slate-900 italic tracking-tighter">฿{{ stats.todaySales.toLocaleString() }}</h3>
  </div>
</div>

          <div class="bg-white p-6 rounded-[2.5rem] border-2 border-blue-500 shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md">
  <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
    <ShoppingBag size="20" />
  </div>
  <div>
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">จำนวนออเดอร์</p>
    <div class="flex items-baseline gap-2">
      <h3 class="text-3xl font-black text-slate-900 italic tracking-tighter">{{ stats.totalOrders }}</h3>
      <span class="text-sm font-bold text-slate-400 uppercase">รายการ</span>
    </div>
  </div>
</div>

          <div class="bg-white p-6 rounded-[2.5rem] border-2 border-yellow-500 shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md">
  <div class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
    <Truck size="20" />
  </div>
  <div>
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ออเดอร์ที่ต้องส่ง</p>
    <div class="flex items-baseline gap-2">
      <h3 class="text-3xl font-black text-slate-900 italic tracking-tighter">{{ stats.toShip }}</h3>
      <span class="text-sm font-bold text-slate-400 uppercase">งาน</span>
    </div>
  </div>
</div>

          <div class="bg-white p-6 rounded-[2.5rem] border-2 border-green-500 shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md">
  <div class="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
    <CheckCircle size="20" />
  </div>
  <div>
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ส่งสำเร็จ</p>
    <h3 class="text-3xl font-black text-slate-900 italic tracking-tighter">{{ stats.completed }}</h3>
  </div>
</div>

         <div class="bg-white p-6 rounded-[2.5rem] border-2 border-red-500 shadow-sm flex flex-col justify-between h-40 transition-all hover:shadow-md">
  <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
    <XCircle size="20" />
  </div>
  <div>
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ยกเลิก</p>
    <h3 class="text-3xl font-black text-red-600 italic tracking-tighter">{{ stats.cancelled }}</h3>
  </div>
</div>

        </div>

        
      </div>

      <div v-if="currentTab === 'stock'" class="space-y-6 animate-in fade-in slide-in-from-bottom-5">
        <div v-if="lowStockItems.length > 0" class="bg-[#A00000] text-white p-6 rounded-[2.5rem] shadow-xl flex items-center gap-4 animate-pulse">
          <AlertTriangle size="32" class="text-yellow-400" />
          <p class="font-black italic uppercase">Stock Warning! สินค้าใกล้หมด ({{ lowStockItems.length }} รายการ)</p>
        </div>

        <div class="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest">
              <tr>
                <th class="p-8">สินค้า</th>
                <th class="p-8 text-center">คงเหลือ</th>
                <th class="p-8 text-center">จัดการสต็อก</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="p in products" :key="p.id" class="hover:bg-slate-50/50 transition-all">
                <td class="p-8 flex items-center gap-5">
                  <img :src="p.image" class="w-16 h-16 object-contain bg-slate-100 rounded-2xl p-2">
                  <span class="font-black text-slate-800 text-lg italic">{{ p.name }}</span>
                </td>
                <td class="p-8 text-center">
                  <span class="px-6 py-3 rounded-2xl font-black text-3xl inline-block min-w-[100px] shadow-inner bg-slate-100"
                        :class="p.stock < 10 ? 'text-red-600' : 'text-slate-900'">
                    {{ p.stock }}
                  </span>
                </td>
                <td class="p-8 text-center">
                  <div class="flex justify-center items-center gap-4">
                    <button @click="changeStock(p, -1)" class="w-12 h-12 bg-white border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-[#A00000] hover:text-white transition-all">-</button>
                    <button @click="changeStock(p, 1)" class="w-12 h-12 bg-white border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-green-500 hover:text-white transition-all">+</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>