<script setup>
defineProps({
  search: String,
  cartCount: Number,
  total: Number
})
const emit = defineEmits(["update:search"])
</script>

<template>
  <div class="navbar">
    <h2>MFU</h2>

    <input
      :value="search"
      @input="emit('update:search',$event.target.value)"
      placeholder="Search products"
    />

    <div class="cart">
      🛒 {{ cartCount }} ชิ้น
    </div>
  </div>
</template>

<style>
.navbar{
  display:flex;
  justify-content:space-between;
  padding:15px;
  border-bottom:2px solid black;
}
</style>