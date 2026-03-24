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
  <div class="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-100 via-white to-yellow-50 p-6">
    
    <div class="w-full max-w-md relative">
      <div class="absolute -top-16 -right-16 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
      <div class="absolute -bottom-16 -left-16 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>

      <div class="relative bg-white/90 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(234,179,8,0.1)] border border-yellow-100 p-10 overflow-hidden">
        
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center bg-yellow-400 w-20 h-20 rounded-[2.2rem] shadow-lg shadow-yellow-200/50 mb-5 transform -rotate-6">
            <h2 class="text-3xl font-black text-red-600">MFU</h2>
          </div>
          <h1 class="text-3xl font-black text-slate-800 tracking-tight">M-Store Login</h1>
          <p class="text-slate-500 font-medium mt-1">น้ำดื่มลานดาว บริการส่งถึงที่</p>
        </div>

        <transition name="fade">
          <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-2xl text-red-600 text-sm font-bold animate-pulse">
            {{ error }}
          </div>
        </transition>

        <div class="space-y-6">
          <div class="group">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6 mb-2 group-focus-within:text-yellow-600 transition-colors">Username</label>
            <div class="relative">
              <User class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-yellow-500 transition-all" size="18" />
              <input v-model="username" type="text" placeholder="ชื่อผู้ใช้งาน" 
                class="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 transition-all outline-none font-bold text-slate-700">
            </div>
          </div>

          <div class="group">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6 mb-2 group-focus-within:text-yellow-600 transition-colors">Password</label>
            <div class="relative">
              <Lock class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-yellow-500 transition-all" size="18" />
              <input v-model="password" type="password" placeholder="••••••••" 
                class="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 transition-all outline-none font-bold text-slate-700">
            </div>
          </div>

          <button @click="handleLogin" 
            class="w-full group mt-4 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3">
            เข้าสู่ระบบเลย
            <ArrowRight class="group-hover:translate-x-2 transition-transform" size="20" />
          </button>
        </div>

        <div class="mt-10 text-center">
          <p class="text-[10px] text-slate-300 font-bold uppercase tracking-widest">จำกัดสิทธิ์เฉพาะสมาชิกเท่านั้น</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* แอนิเมชัน Blobs ขยับไปมานุ่มๆ */
.animate-blob {
  animation: blob 10s infinite;
}
@keyframes blob {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(40px, -60px) scale(1.2); }
  66%  { transform: translate(-30px, 20px) scale(0.8); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animation-delay-2000 { animation-delay: 2s; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>