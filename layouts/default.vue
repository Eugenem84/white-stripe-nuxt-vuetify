<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const drawer = ref(false); // Состояние бокового меню
const dialog = ref(false); //состояние диалога
const { sm, md } = useDisplay(); // Определяем размеры экрана

const isSmallScreen = computed(() => sm.value || md.value);

const phones = [
    '+7912345678',
    '+7998765432'
]

const menuItems = [
  { title: "ГЛАВНАЯ", link: "/" },
  { title: "ПРОГРАММА ТЕРАПИИ", link: "/therapy" },
  { title: "ДНЕВНОЕ ОТДЕЛЕНИЕ", link: "/day-care" },
  { title: "СПЕЦИАЛИСТЫ", link: "/specialists" },
  { title: "НАШ ЦЕНТР", link: "/center" },
  { title: "СТАТЬИ И ВИДЕО", link: "/articles" },
  { title: "КОНСУЛЬТАЦИИ", link: "/consultations" },
  { title: "КОНТАКТЫ", link: "/contacts" },
];
</script>

<template>
  <v-app>

    <v-btn
      icon
      class="phone-button"
      @click="dialog = true"
      >
      <v-icon>mdi-phone</v-icon>
    </v-btn>

    <!-- Диалоговое окно -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Список телефонов</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="phone in phones" :key="phone">
              <a :href="'tel:' + phone" class="phone-link">{{ phone }}</a>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Кнопка-гамбургер -->
    <button v-if="isSmallScreen" class="hamburger" @click="drawer = !drawer">
      <div :class="['line', { active: drawer }]"></div>
      <div :class="['line', { active: drawer }]"></div>
<!--      <div :class="['line', { active: drawer }]"></div>-->
    </button>

    <!-- Мобильное меню -->
    <div
        v-if="isSmallScreen"
        class="mobile-menu"
        :class="{ open: drawer }"
    >
      <v-list class="mobile-menu-list">
        <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="drawer = false"
            class="mobile-menu-item"
        >
          <NuxtLink :to="item.link" class="menu-link">
            {{ item.title }}
          </NuxtLink>
        </v-list-item>
      </v-list>
    </div>

    <!-- Меню для больших экранов -->
    <v-navigation-drawer v-if="!isSmallScreen" app>
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index">
          <NuxtLink :to="item.link" class="text-decoration-none">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Кнопка-гамбургер */
.hamburger {
  position: fixed;
  top: 60px;
  right: 60px;
  z-index: 2000; /* Поверх всего */
  width: 60px;
  height: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.line {
  width: 60px;
  height: 2px;
  background-color: black;
  transition: all 0.3s ease;
}

.line.active:nth-child(1) {
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
}

.line.active:nth-child(2) {
  transform: rotate(-45deg);
  position: absolute;
  top: 50%;
}

/* Мобильное меню */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: gray;
  z-index: 1000; /* Позади кнопки */
  transform: translateY(-100%);
  transition: transform 0.3s ease;

  display: flex;
  flex-direction: column;
}

.mobile-menu.open {
  transform: translateY(0);
}

.menu-link {
  justify-content: center;
  width: 100%;
  display: flex;
  text-align: center;
  color: black;
  background-color: transparent;
  text-decoration: none;
  font-size: 2rem;
  margin: 10px 0;
}

.mobile-menu-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.mobile-menu-item {
  background-color: white;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
}

.mobile-menu-item:hover {
  background-color: yellow;
}

.phone-button {
  box-shadow: none;
  position: absolute;
  top: 40px;
  right: 160px;
  color: black;
  scale: 1.5;
}

.phone-button:hover {
  background-color: transparent;
}

</style>
