<script setup>
import { ref, computed, watch, onMounted } from "vue"
// Import ให้ตรงตามโครงสร้าง: src/components/...
import Navbar from "./components/shared/Navbar.vue"
import ProductCard from "./components/user/ProductCard.vue"
import CartPanel from "./components/user/CartPanel.vue"

// สำหรับ Admin และ Login ที่อยู่ใน src/components/views/
import AdminDashboard from "./components/views/AdminDashboard.vue"
import LoginView from "./components/views/LoginView.vue"
// 1. Import รูปภาพสินค้า
import img600 from "./assets/products/ขวดกลาง.png"
import img1500 from "./assets/products/ขวดใหญ่.png"

// 2. ข้อมูลสินค้าหลัก (เปลี่ยนเป็น ref เพื่อให้ค่า Stock อัปเดตได้)
const products = ref([
  { id: 1, name: "ขนาด 600 มล.", price: 48, image: img600, size: 600, type: "pack", stock: 50 },
  { id: 2, name: "ขนาด 1.5 ลิตร", price: 50, image: img1500, size: 1500, type: "pack", stock: 24 }
])

// --- สเตตัสหลัก ---
const currentUser = ref(null)
const view = ref('login')
const cart = ref([])
const search = ref("")

// ข้อมูลออเดอร์
const allOrders = ref([
  { id: 'ORD-001', total: 1500, status: 'pending' },
  { id: 'ORD-002', total: 2400, status: 'completed' }
])

// --- ระบบจัดการ Stock (สำหรับส่งให้ AdminDashboard) ---
function handleUpdateStock(productId, amount) {
  const item = products.value.find(p => p.id === productId)
  if (item) {
    item.stock = (item.stock || 0) + amount
    if (item.stock < 0) item.stock = 0
  }
}

// --- ระบบ Login / Logout ---
function onLoginSuccess(user) {
  currentUser.value = user
  if (user.role === 'admin') view.value = 'admin'
  else if (user.role === 'delivery') view.value = 'delivery'
  else view.value = 'shop'
}

function handleLogout() {
  currentUser.value = null
  view.value = 'login'
  cart.value = []
}

// --- การนำทาง ---
const goToOrder = () => { view.value = 'order'; window.scrollTo(0,0); }
const goToShop = () => { view.value = 'shop'; window.scrollTo(0,0); }

// --- ระบบตะกร้า ---
watch(cart, (newCart) => { localStorage.setItem("cart", JSON.stringify(newCart)) }, { deep: true })
onMounted(() => {
  const saved = localStorage.getItem("cart")
  if (saved) cart.value = JSON.parse(saved)
})

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id)
  if (item) item.qty++
  else cart.value.push({ ...product, qty: 1 })
}
function increaseQty(p) { const i = cart.value.find(x => x.id === p.id); if (i) i.qty++ }
function decreaseQty(p) { const i = cart.value.find(x => x.id === p.id); if (i && i.qty > 1) i.qty-- }
function removeItem(p) { cart.value = cart.value.filter(i => i.id !== p.id) }

// --- Computed ---
const filteredProducts = computed(() => products.value.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase())))
const subtotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
const shipping = 10
const total = computed(() => cart.value.length === 0 ? 0 : subtotal.value + shipping)

function placeOrder() {
  const newOrder = {
    id: 'ORD-' + Date.now(),
    total: total.value,
    status: 'pending'
  }
  allOrders.value.push(newOrder)
  cart.value = []
  alert("สั่งซื้อสำเร็จ!")
  goToShop()
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-left">
    <LoginView v-if="!currentUser" @login-success="onLoginSuccess" />

    <template v-else>
      <div class="flex flex-col min-h-screen">
        <Navbar 
          v-if="currentUser.role === 'user'"
          :search="search" :cartCount="cartCount" :total="total" :user="currentUser"
          @update:search="val => search = val"
          @open-order="goToOrder" @go-home="goToShop" @logout="handleLogout"
        />

        <main :class="currentUser.role === 'user' ? 'max-w-[1400px] mx-auto p-4 md:p-8 pb-20 w-full text-left' : 'w-full flex-1'">
          
          <template v-if="currentUser.role === 'user'">
            <div v-if="view === 'shop'" class="animate-in fade-in">
              <div class="flex items-center justify-between mb-8 border-l-4 border-yellow-400 pl-4">
                <h2 class="text-2xl font-black text-gray-800 uppercase">น้ำดื่มลานดาว M-Store</h2>
                <button @click="handleLogout" class="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-600 text-xs font-black uppercase rounded-xl shadow-sm hover:bg-red-50 transition-all">
                  <span>Logout</span>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" @add="addToCart" />
              </div>
            </div>

            <div v-else-if="view === 'order'" class="max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
              <div class="flex items-center justify-between mb-8">
                <button @click="goToShop" class="font-bold text-gray-500 hover:text-red-600">← กลับหน้าหลัก</button>
                <h2 class="text-3xl font-black text-gray-800 uppercase">รายการของคุณ</h2>
              </div>
              <CartPanel :cart="cart" :subtotal="subtotal" :shipping="shipping" :total="total" @increase="increaseQty" @decrease="decreaseQty" @remove="removeItem" @checkout="placeOrder" />
            </div>
          </template>

          <div v-else-if="currentUser.role === 'admin'" class="animate-in fade-in h-screen">
            <AdminDashboard 
              :products="products" 
              :orders="allOrders" 
              @update-stock="handleUpdateStock"
              @close="handleLogout" 
            />
          </div>

          <div v-else-if="currentUser.role === 'delivery'" class="animate-in fade-in min-h-screen bg-slate-50">
            </div>
        </main>
      </div>
    </template>
  </div>
</template>