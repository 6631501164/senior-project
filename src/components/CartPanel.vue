<script setup>
import { computed } from "vue"

const props = defineProps({
  cart: Array
})

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price, 0)
)
</script>

<template>
  <div class="cartpanel">
    <h3>Cart</h3>

    <div v-if="cart.length === 0">
      ยังไม่มีสินค้า
    </div>

    <div v-for="item in cart" :key="item.id">
      {{ item.name }} - ฿{{ item.price }}
    </div>

    <hr/>

    <h2>Total ฿{{ total }}</h2>

    <button>Buy</button>
  </div>
</template>