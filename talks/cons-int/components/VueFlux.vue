<script setup>
   import { ref, shallowReactive } from 'vue';
   import {
      VueFlux,
      FluxCaption,
      FluxControls,
      FluxIndex,
      FluxPagination,
      FluxPreloader,
      Img,
      Book,
      Zip,
   } from 'vue-flux';
   import 'vue-flux/style.css';

   const $vueFlux = ref();

   const vfOptions = shallowReactive({
      autoplay: true,
   });

   const vfRscs = shallowReactive([
      new Img('../cosmin.png'),
      new Img('../pro.png'),
      new Img('../oks.png'),
   ]);

   const vfTransitions = shallowReactive([Book, Zip]);
</script>

<template>
   <VueFlux
      :options="vfOptions"
      :rscs="vfRscs"
      :transitions="vfTransitions"
      ref="$vueFlux">

      <template #preloader="preloaderProps">
         <FluxPreloader v-bind="preloaderProps" />
      </template>

      <template #caption="captionProps">
         <FluxCaption v-bind="captionProps" />
      </template>

      <template #controls="controlsProps">
         <FluxControls v-bind="controlsProps" />
      </template>

      <template #pagination="paginationProps">
         <FluxPagination v-bind="paginationProps" />
      </template>

      <template #index="indexProps">
         <FluxIndex v-bind="indexProps" />
      </template>
   </VueFlux>

   <button @click="$vueFlux.show('next')">NEXT</button>
</template>