<script setup>
import { ref, computed, watch, onMounted } from "vue"
import Navbar from "./components/Navbar.vue"
import ProductCard from "./components/ProductCard.vue"
import CartPanel from "./components/CartPanel.vue"
import AdminDashboard from "./components/AdminDashboard.vue" // Import component ใหม่

// ส่วนการ Import รูปภาพ
import img350 from "./assets/products/350.jpg"
import img600 from "./assets/products/600.jpg"
import img1500 from "./assets/products/1500.jpg"
import img35012 from "./assets/products/35012.jpg"
import img60012 from "./assets/products/60012.jpg"
import img15006 from "./assets/products/15006.jpg"

const products = [
  { id: 1, name: "ขวดเล็ก 350 มล.", price: 5, image: img350, size: 350, type: "single" },
  { id: 2, name: "ขวดกลาง 600 มล.", price: 7, image: img600, size: 600, type: "single" },
  { id: 3, name: "ขวดใหญ่ 1500 มล.", price: 14, image: img1500, size: 1500, type: "single" },
  { id: 4, name: "แพ็กขวดเล็ก 12 ขวด 350 มล.", price: 50, image: img35012, size: 350, type: "pack" },
  { id: 5, name: "แพ็กขวดกลาง 12 ขวด 600 มล.", price: 65, image: img60012, size: 600, type: "pack" },
  { id: 6, name: "แพ็กขวดใหญ่ 6 ขวด 1500 มล.", price: 70, image: img15006, size: 1500, type: "pack" }
]

const cart = ref([])
const search = ref("")
const view = ref('shop') // สถานะ: 'shop', 'order', 'admin'

// ฟังก์ชันสลับหน้า
const goToOrder = () => { view.value = 'order'; window.scrollTo(0,0); }
const goToShop = () => { view.value = 'shop'; window.scrollTo(0,0); }
const goToAdmin = () => { view.value = 'admin'; window.scrollTo(0,0); }

// ระบบตะกร้า & LocalStorage
watch(cart, (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem("cart")
  if (saved) cart.value = JSON.parse(saved)
})

// Logic จัดการสินค้า
function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id)
  if (item) item.qty++
  else cart.value.push({ ...product, qty: 1 })
}
function increaseQty(p) { const i = cart.value.find(x => x.id === p.id); if (i) i.qty++ }
function decreaseQty(p) { const i = cart.value.find(x => x.id === p.id); if (i && i.qty > 1) i.qty-- }
function removeItem(p) { cart.value = cart.value.filter(i => i.id !== p.id) }

// การกรองสินค้า
const filteredProducts = computed(() => {
  return products.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
})

// คำนวณยอดเงิน
const subtotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
const shipping = 10
const total = computed(() => cart.value.length === 0 ? 0 : subtotal.value + shipping)
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-20">
    
    <Navbar 
  :search="search" 
  :cartCount="cartCount" 
  :total="total" 
  @update:search="val => search = val"
  @open-order="view = 'order'"
  @go-home="view = 'shop'"
  @open-admin="view = 'admin'"  />
    />

    <main :class="view === 'admin' ? '' : 'max-w-[1400px] mx-auto p-4 md:p-8'">
      
      <div v-if="view === 'shop'" class="animate-in fade-in duration-500">
        <div class="flex items-center justify-between mb-8 border-l-4 border-yellow-400 pl-4">
          <h2 class="text-2xl font-black text-gray-800 uppercase tracking-tight">น้ำดื่มลานดาว M-Store</h2>
          <button @click="goToOrder" class="sm:hidden bg-red-600 text-white p-2 rounded-lg">🛒 {{ cartCount }}</button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="p in filteredProducts" 
            :key="p.id" 
            :product="p" 
            @add="addToCart" 
          />
        </div>
      </div>

      <div v-else-if="view === 'order'" class="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
        <div class="flex items-center justify-between mb-8">
          <button @click="goToShop" class="group flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition-colors">
             <span class="bg-white w-8 h-8 flex items-center justify-center rounded-full shadow group-hover:bg-red-50">←</span>
             กลับไปหน้าหลัก
          </button>
          <h2 class="text-3xl font-black text-gray-800 uppercase">สรุปรายการสั่งซื้อ</h2>
        </div>

        <div class="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div class="p-6 bg-yellow-400 text-red-700 font-bold flex items-center gap-2 text-lg">
            <span>📍 รายการที่คุณเลือก</span>
          </div>
          
          <div class="p-4 sm:p-10">
            <CartPanel 
              :cart="cart" :subtotal="subtotal" :shipping="shipping" :total="total" 
              @increase="increaseQty" @decrease="decreaseQty" @remove="removeItem" 
            />
            
            <div v-if="cart.length > 0" class="mt-10 pt-10 border-t border-dashed">
              <button class="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95 uppercase tracking-widest">
                ยืนยันการสั่งซื้อสินค้า
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="view === 'admin'" class="animate-in fade-in duration-500">
        <AdminDashboard 
          :products="products" 
          @close="goToShop" 
        />
      </div>

    </main>
  </div>
</template>

<style>
.animate-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>