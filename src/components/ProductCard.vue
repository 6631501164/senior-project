<script setup>
const props = defineProps({
  product: Object
})

const emit = defineEmits(["add"])
</script>

<template>
  <div class="card">
    <img :src="product.image" class="image">
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
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.image{
  width:100%;
  height:150px;
  object-fit:contain;
  margin-bottom:10px;
}
</style>