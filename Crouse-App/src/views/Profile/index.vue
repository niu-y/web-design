<template>
  <div class="profile">
    <div class="profile-banner" v-if="!user.username">
      <span class="back"></span>
      <cube-button :light="true" :inline="true" class="btn" @click="toLogin"
        >登录</cube-button
      >
    </div>
    <div class="profile-banner" v-else>
      <span class="back"></span>
      <span class="btn user-info">{{ user.username }}</span>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    toLogin() {
      //记录下现在路由的路径
      this.$router.push({ path: "/login", query: { from: "profile" } });
    },
  },
};
</script>

<style lang="stylus" scoped>
.profile {
  &-banner {
    height: 200px;
    background: url('../../assets/images/user_bg.png');
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .back {
      background: url('../../assets/images/photo.png');
      height: 80px;
      width: 80px;
      background-size: cover;
      display: block;
    }

    .btn {
      margin-top: 20px;
    }
  }

  &-list {
    font-size: 14px;
    line-height: 30px;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;

      i {
        margin-right: 5px;
      }

      padding: 10px 25px;
    }
  }
}

.user-info {
  color: #fff;
}
</style>