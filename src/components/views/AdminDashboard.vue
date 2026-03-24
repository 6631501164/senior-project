<script setup>
import { ref, computed } from "vue"
import StockManager from "./StockManager.vue"
import { LayoutDashboard, Box, LogOut, Calendar, Package } from "lucide-vue-next"

const props = defineProps({
  products: Array,
  orders: Array
})

const emit = defineEmits(["close", "update-stock"])

const currentTab = ref('overview')
const selectedDate = ref(new Date().toISOString().substr(0, 10))

// สีแดง Crimson MFU: #A00000 | สีเหลือง M-Store: #FFD700
const statuses = [
  { label: 'รอชำระเงิน', key: 'unpaid', color: '#94a3b8' },
  { label: 'ชำระเงินแล้ว', key: 'paid', color: '#2563eb' },
  { label: 'กำลังจัดของ', key: 'preparing', color: '#FFD700' }, 
  { label: 'จัดเสร็จรอส่ง', key: 'ready', color: '#6366f1' },
  { label: 'กำลังจัดส่ง', key: 'shipping', color: '#f97316' },
  { label: 'จัดส่งสำเร็จ', key: 'completed', color: '#22c55e' },
  { label: 'ยกเลิก', key: 'cancelled', color: '#ef4444' }
]

const statusSummary = computed(() => {
  const counts = {}
  statuses.forEach(s => counts[s.key] = props.orders?.filter(o => o.status === s.key).length || 0)
  return counts
})

const totalSales = computed(() => props.orders?.reduce((sum, ord) => sum + ord.total, 0) || 0)
const orderCount = computed(() => props.orders?.length || 0)

const getStatusLabel = (key) => statuses.find(s => s.key === key)?.label || key
const getStatusColor = (key) => statuses.find(s => s.key === key)?.color || '#000'
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 font-sans w-full text-left">
    
    <aside class="w-72 bg-[#FFD700] flex flex-col p-8 sticky top-0 h-screen shadow-xl z-20">
      <div class="flex flex-col items-center gap-2 mb-12">
        <div class="bg-[#A00000] text-white font-black w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-3xl shadow-2xl border-4 border-white">
          MFU
        </div>
        <div class="text-center mt-2">
          <h1 class="font-black text-[#A00000] text-xl leading-none tracking-tighter">M-STORE</h1>
          <p class="text-[#A00000]/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 italic">Admin Console</p>
        </div>
      </div>

      <nav class="space-y-3 flex-1">
        <button @click="currentTab = 'overview'" 
          :class="currentTab === 'overview' ? 'bg-[#A00000] text-white shadow-lg' : 'text-[#A00000] hover:bg-white/50'"
          class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-black transition-all text-sm group">
          <LayoutDashboard size="20" /> แดชบอร์ด
        </button>
        <button @click="currentTab = 'stock'"
          :class="currentTab === 'stock' ? 'bg-[#A00000] text-white shadow-lg' : 'text-[#A00000] hover:bg-white/50'"
          class="w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-black transition-all text-sm group">
          <Box size="20" /> คลังสินค้า
        </button>
      </nav>

      <button @click="emit('close')" class="mt-auto flex items-center gap-2 justify-center bg-white/30 hover:bg-[#A00000] hover:text-white py-4 rounded-2xl text-[#A00000] font-black text-xs transition-all border border-[#A00000]/10">
        <LogOut size="16" /> ออกจากระบบ
      </button>
    </aside>

    <main class="flex-1 p-10 overflow-y-auto">
      
      <header class="flex justify-between items-center mb-10">
        <div class="border-l-8 border-[#A00000] pl-6">
          <h2 class="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Overview</h2>
          <p class="text-slate-400 font-bold text-sm tracking-widest mt-1 uppercase">Management Dashboard</p>
        </div>

        <div class="relative group">
           <Calendar class="absolute left-5 top-1/2 -translate-y-1/2 text-[#A00000]" size="18" />
           <input type="date" v-model="selectedDate" 
             class="bg-white border-4 border-[#FFD700] rounded-[2rem] text-sm font-black pl-14 pr-8 py-4 shadow-sm focus:ring-4 focus:ring-yellow-100 outline-none text-slate-700 transition-all">
        </div>
      </header>

      <div v-if="currentTab === 'overview'" class="space-y-10">
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div v-for="s in statuses" :key="s.key" 
               class="bg-white p-5 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-[#FFD700] transition-all transform hover:-translate-y-1">
            <div class="w-4 h-4 rounded-full shadow-inner" :style="{ backgroundColor: s.color }"></div>
            <span class="text-[12px] font-black text-slate-400 uppercase tracking-tighter text-center leading-tight">{{ s.label }}</span>
            <span class="text-3xl font-black text-slate-900 leading-none">{{ statusSummary[s.key] }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-[#A00000] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden h-40 flex items-center">
            <div class="relative z-10 pl-4">
              <p class="text-red-200/70 text-xs font-black uppercase tracking-[0.2em] mb-2">ยอดขายทั้งหมด</p>
              <h3 class="text-5xl font-black tracking-tighter italic leading-none uppercase">
                ฿ {{ totalSales.toLocaleString() }}
              </h3>
            </div>
            <div class="absolute -right-4 -bottom-6 text-8xl font-black italic text-white/5 pointer-events-none uppercase">REVENUE</div>
          </div>

          <div class="bg-[#A00000] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden h-40 flex items-center">
            <div class="relative z-10 pl-4">
              <p class="text-red-200/70 text-xs font-black uppercase tracking-[0.2em] mb-2">จำนวนออเดอร์</p>
              <h3 class="text-5xl font-black tracking-tighter leading-none italic uppercase">
                {{ orderCount }} 
                <span class="text-2xl font-black uppercase ml-2 opacity-80">Orders</span>
              </h3>
            </div>
            <Package class="absolute right-8 top-1/2 -translate-y-1/2 text-white/10" size="100" />
          </div>

        </div>

        <div class="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-[#FFD700]/10">
            <h4 class="font-black text-slate-800 text-xl tracking-tighter uppercase italic">Recent Transactions</h4>
            <div class="flex items-center gap-2">
               <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
               <span class="text-[10px] font-black text-slate-400 uppercase">Live Update</span>
            </div>
          </div>
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                <th class="p-8">ID</th>
                <th class="p-8 text-center">Amount</th>
                <th class="p-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 font-bold">
              <tr v-for="order in orders" :key="order.id" class="hover:bg-yellow-50/50 transition-all">
                <td class="p-8 text-slate-700 font-mono">{{ order.id }}</td>
                <td class="p-8 text-center text-[#A00000] font-black text-lg">฿ {{ order.total.toLocaleString() }}</td>
                <td class="p-8 text-right">
                  <span class="px-5 py-2.5 rounded-full text-[10px] font-black text-white uppercase shadow-md inline-block"
                    :style="{ backgroundColor: getStatusColor(order.status) }">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="currentTab === 'stock'" class="animate-in fade-in slide-in-from-bottom-5 duration-500">
        <StockManager :products="products" @update-stock="(id, amt) => emit('update-stock', id, amt)" />
      </div>

    </main>
  </div>
</template>