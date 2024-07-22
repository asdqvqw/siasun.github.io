<template>
    <el-scrollbar
      ref="ElScrollbarRef"
      @scroll="handleScroll"
      wrap-class="defin-scrollbar"
      :height="dataContainer.height"
    >
      <slot></slot>
      <div
        v-if="dataContainer.showUpBt"
        @click="handleUp"
        :class="{
          'scrollbar-up-bt': true,
          'show': dataContainer.show,
        }"
      >
        UP
      </div>
    </el-scrollbar>
  </template>
  
  <script setup>
  import { ref, reactive, toRef, nextTick, onActivated } from 'vue';
  import { simpleRoll } from "@/common/RollTolls";
  
  const props = defineProps({
    height: {
      type: String,
      default: '100%',
    },
    showUpBt: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['onScroll']);
  
  const ElScrollbarRef = ref(null);
  const dataContainer = reactive({
    height: toRef(props, 'height'),
    showUpBt: toRef(props, 'showUpBt'),
    show: false,
  });
  
  const otherDataContainer = {
    top: 0,
    left: 0,
  };
  
  onActivated(() => {
    nextTick(() => {
      if (!ElScrollbarRef.value) return;
      ElScrollbarRef.value.setScrollTop(otherDataContainer.top);
      ElScrollbarRef.value.setScrollLeft(otherDataContainer.left);
    });
  });
  
  function handleScroll(e) {
    e = e || {};
    if (e.scrollTop > 40 && (e.scrollTop > otherDataContainer.top)) {
      dataContainer.show = true;
    } else {
      dataContainer.show = false;
    }
    otherDataContainer.top = e.scrollTop || 0;
    otherDataContainer.left = e.scrollLeft || 0;
    emit('onScroll', e);
  }
  
  function handleUp() {
    if (!ElScrollbarRef.value) return;
    simpleRoll({
      target: ElScrollbarRef.value.wrapRef,
    });
  }
  </script>
  
  <style lang="scss" scoped>
  .defin-scrollbar {
    position: relative;
  
    .scrollbar-up-bt {
      position: absolute;
      bottom: 3vw;
      right: 3vw;
      width: 40px;
      height: 40px;
      background-color: rgb(255, 255, 255);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s;
      cursor: pointer;
      color: rgb(25, 137, 250);
      font-size: 20px;
      font-family: serif;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  
      &.show {
        opacity: 1;
        pointer-events: initial;
      }
    }
  }
  </style>