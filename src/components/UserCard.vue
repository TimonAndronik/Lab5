<template>
  <div class="user-card-container">
    <div class="toolbar">
      <button
        @click="filterGender('all')"
        :class="{ active: selectedGender === 'all' }"
      >
        All
      </button>
      <button
        @click="filterGender('Male')"
        :class="{ active: selectedGender === 'Male' }"
      >
        Male
      </button>
      <button
        @click="filterGender('Female')"
        :class="{ active: selectedGender === 'Female' }"
      >
        Female
      </button>
    </div>

    <div>
      <div class="container" v-if="filteredUsers.length > 0">
        <div
          v-for="(userData, index) in filteredUsers"
          :key="index"
          :class="['user-card', userData.age >= 18 ? 'adult' : 'child']"
        >
          <img :src="userData.photo" alt="User photo" class="user-photo" />
          <h2>{{ userData.firstName }} {{ userData.lastName }}</h2>
          <p class="gender">Gender: {{ userData.gender }}</p>
          <p v-if="userData.age >= 18" class="age">Age: {{ userData.age }}</p>
          <p class="position">Position: {{ userData.position }}</p>
          <h3 class="hobbies-title">Hobbies</h3>
          <ul class="hobbies-list">
            <li v-for="(hobby, index) in userData.hobbies" :key="index">
              {{ hobby }}
            </li>
          </ul>
        </div>
      </div>
      <p v-else class="container empty">Список юзерів пустий</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { User } from "@/models/User";

export default defineComponent({
  name: "UserCard",
  setup() {
    const userArr = createUsers();
    const users = reactive(userArr);
    const filteredUsers = ref([...users]);
    const selectedGender = ref("all");

    const filterGender = (gender: string) => {
      selectedGender.value = gender;
      if (gender === "all") {
        filteredUsers.value = users;
      } else {
        filteredUsers.value = users.filter((user) => user.gender === gender);
      }
    };

    return {
      filteredUsers,
      filterGender,
      selectedGender,
    };
  },
});

function createUsers(): User[] {
  const users: User[] = [];

  for (let i = 0; i < 20; i++) {
    const user = new User(
      `FirstName${i}`,
      `LastName${i}`,
      i % 2 === 0 ? "Male" : "Female",
      15 + i,
      `Position${i}`,
      ["Reading", "Gaming", "Sports"]
    );
    users.push(user);
  }

  return users;
}
</script>

<style scoped>
.user-card-container {
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.toolbar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.toolbar button {
  padding: 10px 20px;
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
}

.toolbar button:hover {
  background: linear-gradient(90deg, #0056b3, #004085);
  transform: scale(1.05);
}

.toolbar button.active {
  background: linear-gradient(90deg, #004085, #007bff);
}

.user-card {
  border: 2px solid transparent;
  padding: 20px;
  width: calc(24% - 15px); /* 4 картки в ряд */
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-card:hover {
  transform: translateY(-5px);
}

.adult {
  border-color: #28a745; /* зелений для дорослих */
}

.child {
  border-color: #dc3545; /* червоний для дітей */
}

.user-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 3px solid #007bff;
}

.gender,
.age,
.position {
  margin: 5px 0;
  color: #555;
  font-size: 14px;
}

.hobbies-title {
  margin-top: 10px;
  font-size: 18px;
  color: #007bff;
}

.hobbies-list {
  list-style: none;
  padding: 0;
}

.hobbies-list li {
  background: #e9ecef;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
}

.empty {
  margin: 20px;
  text-align: center;
  font-size: 18px;
  color: #888;
}

/* Медіа-запити для адаптивності */
@media (max-width: 768px) {
  .user-card {
    width: calc(48% - 15px); /* Дві картки в ряд */
  }
}

@media (max-width: 480px) {
  .user-card {
    width: 100%; /* Одна картка в ряд для мобільних екранів */
  }
}
</style>
