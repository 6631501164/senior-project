<script setup>
const props = defineProps({
  product: Object
})

const emit = defineEmits(["add"])
</script>

<template>
  <div class="card">
    <div class="image"></div>

    <h4>{{ product.name }}</h4>
    <p>฿ {{ product.price }}</p>

    <button @click="emit('add', product)">Add</button>
  </div>
</template>

<style>
.card{
  border:1px solid #ddd;
  padding:15px;
  text-align:center;
}

.image{
  height:120px;
  background:#eee;
  margin-bottom:10px;
}
</style>