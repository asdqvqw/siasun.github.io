<template>
    <div v-if="pagenum === 1">
        <firststep></firststep>
    </div>
    <div v-else-if="pagenum === 2">
        <secstep></secstep>
    </div>
    <div v-else-if="pagenum === 3">
        <thirdstep></thirdstep>
    </div>
    <div v-else-if="pagenum === 4">
        <fourstep></fourstep>
    </div>
    <div v-else-if="pagenum === 5">
        <plsstep></plsstep>
    </div>
    <div v-else-if="pagenum === 6">
        <batterstep></batterstep>
    </div>
    <div v-else-if="pagenum === 7">
        <manualstep></manualstep>
    </div>
    <div v-else-if="pagenum === 8">
        <navstep></navstep>
    </div>
</template>

<script setup>
import { pagenum } from './common/commondata.js';
import firststep from './index.vue'
import secstep from './second/wheelmode.vue'
import thirdstep from './third/electrion.vue'
import plsstep from './third/PLS.vue'
import batterstep from './third/batter.vue'
import manualstep from './third/manual.vue'
import navstep from './third/nav.vue'
import fourstep from './fifth/userparm.vue'
</script>