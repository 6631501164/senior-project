<script setup>
import { computed } from "vue"

const props = defineProps({
  cart: Array
})

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
)
</script>

<template>
  <div class="cartpanel">
    <h3>Cart</h3>

    <div v-if="cart.length === 0" class="empty">
      ยังไม่มีสินค้า
    </div>

    <div v-for="item in cart" :key="item.id" class="cart-item">

      <img :src="item.image" class="cart-img">

      <div class="info">
        <strong>{{ item.name }}</strong>
        <p>฿ {{ item.price }}</p>
      </div>

      <div class="qty">
        x {{ item.qty }}
      </div>

      <div class="subtotal">
        ฿ {{ item.price * item.qty }}
      </div>

    </div>

    <hr/>

    <div class="summary">
      <h2>Total</h2>
      <h2>฿ {{ total }}</h2>
    </div>

    <button class="buy">Buy</button>

  </div>
</template>

<style>
.cartpanel{
  border:1px solid #ddd;
  padding:20px;
  border-radius:10px;
}

.cart-item{
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 0;
}

.cart-img{
  width:50px;
  height:50px;
  object-fit:contain;
}

.info{
  flex:2;
}

.qty{
  width:40px;
  text-align:center;
}

.subtotal{
  margin-left:auto;
}

.summary{
  display:flex;
  justify-content:space-between;
}

.buy{
  width:100%;
  padding:10px;
  margin-top:10px;
  background:#4CAF50;
  color:white;
  border:none;
  border-radius:6px;
  cursor:pointer;
}

.buy:hover{
  background:#45a049;
}

.empty{
  text-align:center;
  color:#888;
  padding:20px;
}
</style>