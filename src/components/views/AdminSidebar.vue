<script setup>
import { LayoutDashboard, Box, Truck, Users, LogOut } from "lucide-vue-next"

const props = defineProps({
  currentTab: String
})

const emit = defineEmits(['change-tab', 'close'])

const menuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'stock', label: 'Orders', icon: Box },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'customers', label: 'Customers', icon: Users },
]
</script>

<template>
  <aside class="w-72 bg-[#FFD700] flex flex-col p-6 sticky top-0 h-screen shadow-xl z-20 overflow-hidden">
    
    <div class="flex items-start gap-3 mb-16 mt-4 px-2">
      <div class="bg-white p-3 rounded-2xl shadow-lg border-2 border-white flex items-center justify-center min-w-[70px]">
        <span class="text-[#A00000] font-black text-2xl tracking-tighter">MFU</span>
      </div>
      <div class="flex flex-col">
        <h2 class="font-black text-slate-900 leading-none text-xl tracking-tight">น้ำดื่ม</h2>
        <h2 class="font-black text-[#A00000] leading-tight text-2xl tracking-tighter">ลานดาว</h2>
      </div>
    </div>

    <nav class="space-y-6 flex-1">
      <button 
        v-for="item in menuItems" 
        :key="item.id"
        @click="emit('change-tab', item.id)"
        class="w-full flex items-center gap-4 py-3 relative transition-all duration-300 group"
      >
        <div v-if="currentTab === item.id" 
             class="absolute -right-10 inset-y-0 w-[110%] bg-white rounded-l-[3rem] shadow-md z-0">
        </div>

        <div class="relative z-10 flex items-center gap-4 pl-4 w-full"
             :class="currentTab === item.id ? 'text-[#FFD700]' : 'text-white'">
          
          <div :class="currentTab === item.id ? 'bg-[#FFD700] text-white p-2 rounded-xl shadow-inner' : ''">
            <component :is="item.icon" :size="currentTab === item.id ? 28 : 32" stroke-width="2.5" />
          </div>

          <span class="text-3xl font-bold tracking-tight italic" 
                style="font-family: 'Itim', 'Mali', cursive;">
            {{ item.label }}
          </span>
        </div>
      </button>
    </nav>

    <div class="mt-auto">
      <button @click="emit('close')" 
              class="flex items-center gap-2 text-[#A00000] font-black px-6 py-4 hover:bg-white/20 rounded-2xl transition-all w-full justify-center border-t border-[#A00000]/10 uppercase text-xs tracking-widest">
        <LogOut size="18" /> Logout System
      </button>
    </div>
  </aside>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&family=Mali:wght@700&display=swap');
</style>