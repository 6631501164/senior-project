<script setup>
import { ref } from "vue"
import { Lock, User, ArrowRight } from "lucide-vue-next"

const emit = defineEmits(["login-success"])
const username = ref("")
const password = ref("")
const error = ref("")

const handleLogin = () => {
  if (username.value === "admin" && password.value === "1234") {
    emit("login-success", { role: "admin", name: "ผู้ดูแลระบบ" })
  } else if (username.value === "rider" && password.value === "1234") {
    emit("login-success", { role: "delivery", name: "คนส่งน้ำ" })
  } else if (username.value === "user" && password.value === "1234") {
    emit("login-success", { role: "user", name: "ลูกค้า" })
  } else {
    error.value = "ข้อมูลไม่ถูกต้อง ลองใหม่อีกครั้ง"
    setTimeout(() => error.value = "", 3000)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#FFF5EB] p-6 relative overflow-hidden text-left">
    
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#A0C4FF]/20 rounded-full blur-3xl animate-blob"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#BDB2FF]/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

    <div class="w-full max-w-md relative">
      <div class="relative bg-white/90 backdrop-blur-xl rounded-[3.5rem] shadow-[0_32px_64px_-15px_rgba(255,187,0,0.1)] border border-orange-100 p-10 overflow-hidden">
        
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center bg-[#FFD100] w-20 h-20 rounded-[2.2rem] shadow-lg shadow-yellow-200/50 mb-5 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
            <h2 class="text-3xl font-black text-red-600 tracking-tighter">MFU</h2>
          </div>
          <h1 class="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">น้ำดื่ม ลานดาว</h1>
          <p class="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] mt-2">Management System Login</p>
        </div>

        <transition name="fade">
          <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-2xl text-red-500 text-xs font-black italic">
            {{ error }}
          </div>
        </transition>

        <div class="space-y-5">
          <div class="group">
            <label class="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-6 mb-2 group-focus-within:text-[#FFB300] transition-colors">Username</label>
            <div class="relative">
              <User class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#FFD100] transition-all" size="18" />
              <input v-model="username" type="text" placeholder="ชื่อผู้ใช้งาน" 
                class="w-full pl-14 pr-6 py-4 bg-[#FAFAFA] border-2 border-transparent rounded-[1.8rem] focus:bg-white focus:border-[#FFD100] focus:ring-4 focus:ring-[#FFD100]/5 transition-all outline-none font-bold text-slate-700">
            </div>
          </div>

          <div class="group">
            <label class="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-6 mb-2 group-focus-within:text-[#FFB300] transition-colors">Password</label>
            <div class="relative">
              <Lock class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#FFD100] transition-all" size="18" />
              <input v-model="password" type="password" placeholder="••••••••" 
                class="w-full pl-14 pr-6 py-4 bg-[#FAFAFA] border-2 border-transparent rounded-[1.8rem] focus:bg-white focus:border-[#FFD100] focus:ring-4 focus:ring-[#FFD100]/5 transition-all outline-none font-bold text-slate-700">
            </div>
          </div>

          <button @click="handleLogin" 
            class="w-full group mt-6 bg-[#FFB300] hover:bg-[#FFA000] text-white font-black py-5 rounded-[1.8rem] shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3">
            เข้าสู่ระบบเลย
            <ArrowRight class="group-hover:translate-x-2 transition-transform" size="20" />
          </button>
        </div>

        <div class="mt-10 text-center">
          <p class="text-[10px] text-slate-300 font-black uppercase tracking-widest italic leading-none">น้ำดื่มลานดาว • มหาวิทยาลัยแม่ฟ้าหลวง</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 10s infinite alternate;
}
@keyframes blob {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(30px, -40px) scale(1.1); }
  66%  { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animation-delay-2000 { animation-delay: 2s; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>