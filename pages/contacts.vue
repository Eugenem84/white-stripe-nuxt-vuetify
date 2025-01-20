<template>
  <div class="contacts-page">
    <header class="header bg-cover" :style="{ backgroundImage: `url('/path/to/background.jpg')` || 'none' }">
      <div class="container text-center py-16">
        <h1 class="text-4xl font-bold text-white">Контакты</h1>
      </div>
    </header>

      <!-- Контент для Москвы -->
      <div class="contact-details">
        <h2 class="text-3xl font-bold mb-4">Адресс в Иваново</h2>
        <ul>
          <li><strong>Телефон:</strong>
            <span v-if="loadingPhone">Загрузка...</span>
            <span v-else-if="errorPhone" class="text-red-500">Ошибка загрузки</span>
            <span v-else> {{ phone }}</span>
          </li>
          <li><strong>Email:</strong>
            <span v-if="loadingEmail">Загрузка...</span>
            <span v-else-if="errorEmail" class="text-red-500">Ошибка загрузки</span>
            <span v-else>{{ email }}</span>
          </li>
          <li><strong>Адрес:</strong>
            <span v-if="loadingAddress">Загрузка...</span>
            <span v-else-if="errorAddress" class="text-red-500">Ошибка загрузки</span>
            <span v-else>{{ address }}</span>
          </li>
        </ul>
      </div>

      <!-- Кнопка -->

  </div>
</template>

<script setup>
  import {ref, onMounted} from "vue";
  import axios from "axios";

  const phone = ref(null)
  const email = ref(null)
  const address = ref(null)

  const loadingPhone = ref(true)
  const loadingEmail = ref(true)
  const loadingAddress = ref(true)
  const errorPhone = ref(false)
  const errorEmail = ref(false)
  const errorAddress = ref(false)

  onMounted(() => {
    loadPhone()
    loadEmail()
    loadAddress()
  })

  const loadPhone = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/get_phone')
      phone.value = response.data.phone
    } catch (err) {
      console.error('ошибка загрузки данных', err)
      err.value = true
    } finally {
      loadingPhone.value = false
    }
  }

  const loadEmail = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/get_email')
      email.value = response.data.email
    } catch (err) {
      console.error('ошибка загрузки данных', err)
      err.value = true
    } finally {
      loadingEmail.value = false
    }
  }

  const loadAddress = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/get_address')
      address.value = response.data.address
    } catch (err) {
      console.error('ошибка загрузки данных', err)
      err.value = true
    } finally {
      loadingAddress.value = false
    }
  }

</script>

<style scoped>
  .header {
    background-color: gray;
  }
</style>
