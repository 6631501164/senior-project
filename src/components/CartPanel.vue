<script setup>
const props = defineProps({
  cart: Array,
  subtotal: Number,
  shipping: Number,
  total: Number
})

const emit = defineEmits([
  "increase",
  "decrease",
  "remove"
])

</script>

<template>

  <div class="cart">

    <p v-if="cart.length === 0" class="empty">
    ยังไม่มีสินค้าในตะกร้า
    </p>

    <div v-for="item in cart" :key="item.id" class="cart-item">

      <img :src="item.image" class="thumb">

      <div class="info">
        <p>{{ item.name }}</p>
        <p>฿ {{ item.price }}</p>
      </div>

      <!-- ปุ่มเพิ่มลด -->
      <div class="qty">

        <button @click="emit('decrease', item)">-</button>

        <span>{{ item.qty }}</span>

        <button @click="emit('increase', item)">+</button>

      </div>

      <button class="remove" @click="emit('remove', item)">
        🗑
      </button>

    </div>

    <hr>

    <p v-if="cart.length > 0">ยอดรวมสินค้า {{ subtotal }}</p>

    <p v-if="cart.length > 0">
      ค่าจัดส่ง {{ shipping }}
    </p>

    <h3 v-if="cart.length > 0">
      Total ฿ {{ total }}
    </h3>

    <button v-if="cart.length > 0" class="buy">
Buy
</button>

  </div>

</template>

<style>
.cart {
  border-left: 2px solid black;
  padding: 20px;
}

.empty{
  text-align:center;
  color:gray;
  margin-bottom:10px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.qty {
  display: flex;
  align-items: center;
  gap: 5px;
}

.qty button {
  width: 25px;
  height: 25px;
}

.remove {
  background: red;
  color: white;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
}

.buy {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}
</style>