<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>我要发布</h2>
      <div class="publish-options">
        <div class="option" @click="navigateToPublish('lost')">
          <img src="@/assets/lost.png" alt="Lost">
          <p>我丢失了物品 <a href="#">前往发布 >></a></p>
        </div>
        <div class="option" @click="navigateToPublish('found')">
          <img src="@/assets/found.png" alt="Found">
          <p>我捡到了物品 <a href="#">前往发布 >></a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    navigateToPublish(type) {
      this.$router.push({ name: 'PublishItem', query: { type } });
      this.closeModal();
    }
  }
};
</script>


<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.publish-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option img {
  width: 40px;
  height: 40px;
}
</style>