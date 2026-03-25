<script setup>
import { ref, computed } from "vue"
import { 
  LayoutDashboard, ShoppingCart, Truck, Users, Settings,
  Search, Bell, MessageSquare, ChevronRight, X, Filter, Grid, 
  CheckCircle2, TrendingUp, Bottle, Waves, Droplets
} from "lucide-vue-next"

// --- 1. DATA STATE ---
const currentTab = ref('Dashboard')
const searchQuery = ref('')
const selectedOrder = ref(null)

const orders = ref([
  { id: '1023', customer: 'Ploy', items: [{name: 'น้ำดื่ม 600 มล.', qty: 2, price: 48}], total: 96, status: 'Pending', delivery: 'Unassigned', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ploy' },
  { id: '1024', customer: 'John', items: [{name: 'น้ำดื่ม 1.5 ลิตร', qty: 5, price: 50}], total: 250, status: 'Preparing', delivery: 'Rider: A', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '1028', customer: 'May', items: [{name: 'น้ำดื่ม 600 มล.', qty: 10, price: 48}], total: 480, status: 'On the way', delivery: 'Anna', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=May' },
  { id: '1025', customer: 'Sara', items: [{name: 'น้ำดื่ม 1.5 ลิตร', qty: 2, price: 50}, {name: 'น้ำดื่ม 600 มล.', qty: 1, price: 48}], total: 148, status: 'Delivered', delivery: 'Rider', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
  { id: '1018', customer: 'Tony', items: [{name: 'น้ำดื่ม 1.5 ลิตร', qty: 1, price: 50}], total: 50, status: 'Cancelled', delivery: 'Michael', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tony' },
])

// --- 2. COMPUTED LOGIC ---
const filteredOrders = computed(() => {
  return orders.value.filter(o => 
    o.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) || o.id.includes(searchQuery.value)
  )
})

const stats = computed(() => ({
  today: orders.value.length,
  revenue: orders.value.reduce((sum, o) => o.status !== 'Cancelled' ? sum + o.total : sum, 0).toLocaleString(),
  delivering: orders.value.filter(o => o.status === 'On the way').length,
  completed: orders.value.filter(o => o.status === 'Delivered').length
}))

// --- 3. ACTIONS ---
const updateStatus = (orderId, newStatus) => {
  const index = orders.value.findIndex(o => o.id === orderId)
  if (index !== -1) {
    orders.value[index].status = newStatus
    if (selectedOrder.value?.id === orderId) selectedOrder.value.status = newStatus
  }
}

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending': return 'bg-[#FFD700]/20 text-[#B45309]'
    case 'Preparing': return 'bg-[#FEF3C7] text-[#92400E]'
    case 'On the way': return 'bg-[#DBEAFE] text-[#1E40AF]'
    case 'Delivered': return 'bg-[#D1FAE5] text-[#065F46]'
    case 'Cancelled': return 'bg-[#FEE2E2] text-[#991B1B]'
    default: return 'bg-gray-100 text-gray-500'
  }
}
</script>

<template>
  <div class="flex h-screen bg-[#F0F9FF] font-sans p-6 overflow-hidden gap-6 text-left">
    
    <aside class="w-64 bg-[#0284C7] rounded-[2.5rem] flex flex-col p-8 shadow-lg">
      <div class="mb-10 text-center">
        <h2 class="text-white font-black text-2xl tracking-tighter italic uppercase flex flex-col items-center gap-2">
          <Waves size="32" class="text-blue-200" />
          MFU ลานดาว
        </h2>
      </div>

      <nav class="space-y-4 flex-1">
        <button v-for="menu in ['Dashboard', 'Orders', 'Delivery', 'Customers']" :key="menu"
          @click="currentTab = menu"
          :class="currentTab === menu ? 'bg-white text-[#0284C7] shadow-md' : 'text-blue-100 hover:bg-white/10'"
          class="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all">
          <component :is="menu === 'Dashboard' ? LayoutDashboard : menu === 'Orders' ? ShoppingCart : menu === 'Delivery' ? Truck : Users" size="22" />
          {{ menu }}
        </button>
      </nav>

      <div class="bg-white/20 p-4 rounded-[2rem] flex items-center gap-3 mt-auto border border-white/20">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" class="w-10 h-10 rounded-xl bg-white" />
        <div>
          <p class="text-white font-black text-xs leading-none">Admin Manager</p>
          <p class="text-blue-200 text-[10px]">Online</p>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col gap-6 overflow-hidden">
      
      <header class="flex justify-between items-center bg-white/90 px-8 py-4 rounded-[2rem] shadow-sm border border-blue-50">
        <div class="relative w-96">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size="18" />
          <input v-model="searchQuery" type="text" placeholder="ค้นหาเลขออเดอร์..." class="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border-none rounded-2xl text-sm italic outline-none focus:ring-2 ring-blue-100" />
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 ml-4">
            <span class="text-sm font-black text-slate-700">Admin</span>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>
      </header>

      <div v-if="currentTab === 'Dashboard'" class="flex-1 flex flex-col gap-8 overflow-y-auto pr-2 animate-in fade-in duration-500">
        <div class="grid grid-cols-4 gap-6">
          <div class="bg-[#0EA5E9] p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
            <p class="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Orders Today</p>
            <h3 class="text-5xl font-black italic">{{ stats.today }}</h3>
            <Bottle class="absolute -right-4 -bottom-4 opacity-10" size="120" />
          </div>
          <div class="bg-[#38BDF8] p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
            <p class="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 class="text-4xl font-black italic">฿{{ stats.revenue }}</h3>
            <TrendingUp class="absolute -right-4 -bottom-4 opacity-10" size="120" />
          </div>
          <div class="bg-[#818CF8] p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
            <p class="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Delivering</p>
            <h3 class="text-5xl font-black italic">{{ stats.delivering }}</h3>
            <Truck class="absolute -right-4 -bottom-4 opacity-10" size="120" />
          </div>
          <div class="bg-[#34D399] p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
            <p class="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Completed</p>
            <h3 class="text-5xl font-black italic">{{ stats.completed }}</h3>
            <CheckCircle2 class="absolute -right-4 -bottom-4 opacity-10" size="120" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-8 flex-1 min-h-[400px]">
          <div class="col-span-2 bg-white rounded-[3rem] shadow-sm p-10 flex flex-col border border-blue-50/50">
            <h4 class="text-xl font-black text-slate-800 italic mb-8 px-2">สถิติการสั่งน้ำ 7 วันล่าสุด</h4>
            <div class="flex-1 flex items-end justify-between gap-4 px-2">
              <div v-for="(h, i) in [40, 70, 45, 90, 65, 80, 55]" :key="i" class="flex-1 bg-blue-50 rounded-2xl relative group cursor-pointer hover:bg-blue-400 transition-all" :style="{ height: h + '%' }">
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">฿{{ (h * 150).toLocaleString() }}</div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-[3rem] shadow-sm p-8 border border-blue-50/50 flex flex-col">
            <h4 class="text-lg font-black text-slate-800 italic mb-6">ออเดอร์ใหม่</h4>
            <div class="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-hide">
              <div v-for="order in orders.slice(0, 5)" :key="order.id" class="flex items-center gap-4 group cursor-pointer" @click="currentTab = 'Orders'; selectedOrder = order">
                <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400">
                  <Bottle size="20" />
                </div>
                <div class="flex-1">
                  <p class="text-xs font-black text-slate-700 leading-none mb-1">{{ order.customer }}</p>
                  <p class="text-[10px] text-slate-400 font-bold italic">#{{ order.id }}</p>
                </div>
                <p class="text-xs font-black text-blue-600">฿{{ order.total }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'Orders'" class="bg-white rounded-[2.5rem] shadow-sm flex-1 overflow-hidden flex flex-col p-6 animate-in fade-in duration-500">
        <div class="flex justify-between items-center mb-6 px-4">
          <h4 class="font-black text-slate-800 text-lg italic">รายการสั่งน้ำดื่มทั้งหมด</h4>
        </div>
        <div class="flex-1 overflow-y-auto px-2">
          <table class="w-full border-separate border-spacing-y-4">
            <thead class="text-[11px] font-black text-slate-300 uppercase tracking-widest">
              <tr>
                <th class="px-4 text-left"># ID</th>
                <th class="px-4 text-left">Customer</th>
                <th class="px-4 text-left">รายการ (จำนวนแพ็ค)</th>
                <th class="px-4 text-left">ยอดรวม</th>
                <th class="px-4 text-left">สถานะ</th>
                <th class="px-4 text-right"></th>
              </tr>
            </thead>
            <tbody class="text-xs font-bold">
              <tr v-for="order in filteredOrders" :key="order.id" @click="selectedOrder = order"
                  :class="selectedOrder?.id === order.id ? 'bg-blue-50 ring-1 ring-blue-100' : 'bg-[#FAFAFA]'"
                  class="hover:bg-blue-50 transition-all cursor-pointer group">
                <td class="px-4 py-5 rounded-l-3xl text-slate-400 italic">#{{ order.id }}</td>
                <td class="px-4 py-5 flex items-center gap-3">
                  <img :src="order.img" class="w-9 h-9 rounded-full bg-white shadow-sm border border-blue-50" />
                  <span class="text-slate-700 font-black">{{ order.customer }}</span>
                </td>
                <td class="px-4 py-5 text-slate-500 font-medium">
                   {{ order.items[0].name }} x {{ order.items[0].qty }} แพ็ค
                </td>
                <td class="px-4 py-5 text-slate-800 font-black">฿{{ order.total }}</td>
                <td class="px-4 py-5">
                  <span :class="getStatusStyle(order.status)" class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-4 py-5 rounded-r-3xl text-right">
                  <ChevronRight size="18" class="inline text-blue-400 group-hover:translate-x-1 transition-transform" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <aside v-if="selectedOrder" class="w-80 bg-white rounded-[3rem] shadow-2xl p-8 flex flex-col border border-blue-50 animate-in slide-in-from-right duration-300">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="font-black text-slate-900 text-xl italic leading-none mb-1">Order #{{ selectedOrder.id }}</h3>
          <span :class="getStatusStyle(selectedOrder.status)" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">{{ selectedOrder.status }}</span>
        </div>
        <button @click="selectedOrder = null" class="p-2 hover:bg-slate-100 rounded-full text-slate-300 transition-colors"><X size="22" /></button>
      </div>

      <div class="bg-blue-50/50 rounded-[2rem] p-6 mb-8 border border-blue-100">
        <p class="text-[10px] font-black text-blue-300 uppercase mb-4 tracking-widest leading-none">Customer</p>
        <div class="flex items-center gap-4 mb-4">
          <img :src="selectedOrder.img" class="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-white" />
          <span class="font-black text-slate-800 text-lg">{{ selectedOrder.customer }}</span>
        </div>
        <p class="text-[11px] text-slate-500 font-bold italic">📍 MFU Students Dormitory (ลานดาว)</p>
      </div>

      <div class="flex-1 overflow-y-auto mb-8 pr-2 scrollbar-hide">
        <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 leading-none">รายการน้ำดื่ม</p>
        <div v-for="item in selectedOrder.items" :key="item.name" class="flex justify-between items-center mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-400 shadow-sm">
              <Bottle size="20" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black text-slate-700">{{ item.name }}</span>
              <span class="text-[10px] font-bold text-blue-500">{{ item.qty }} แพ็ค</span>
            </div>
          </div>
          <span class="text-xs font-black text-slate-800">฿{{ (item.price * item.qty).toLocaleString() }}</span>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-100 space-y-3">
        <div class="flex justify-between items-center px-2 mb-4">
          <span class="text-xs font-black text-slate-400">ยอดรวม</span>
          <span class="text-2xl font-black text-blue-600">฿{{ selectedOrder.total }}</span>
        </div>
        
        <button v-if="selectedOrder.status === 'Pending'" 
          @click="updateStatus(selectedOrder.id, 'Preparing')"
          class="w-full py-4 bg-blue-500 text-white font-black rounded-2xl text-xs shadow-lg hover:bg-blue-600 active:scale-95 transition-all">
          รับออเดอร์เตรียมแพ็ค
        </button>
        
        <button v-if="selectedOrder.status === 'Preparing'" 
          @click="updateStatus(selectedOrder.id, 'On the way')"
          class="w-full py-4 bg-indigo-400 text-white font-black rounded-2xl text-xs shadow-lg active:scale-95 transition-all">
          ส่งให้ไรเดอร์ (On the way)
        </button>

        <button v-if="selectedOrder.status === 'On the way'" 
          @click="updateStatus(selectedOrder.id, 'Delivered')"
          class="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
          <CheckCircle2 size="16"/> จัดส่งสำเร็จ
        </button>
      </div>
    </aside>

  </div>
</template>

<style scoped>
::-webkit-scrollbar { width: 0px; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.animate-in { animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>