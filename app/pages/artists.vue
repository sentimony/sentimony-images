<script setup lang="ts">
useHead({
  title: 'Artists · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Artist Images on this page. All this Artist Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
  ]
})

const artistImages = [
  'aesthesia-01_th.jpg',
  'akhos-01_th.jpg',
  'akhos-02_th.jpg',
  'akhos-03_th.jpg',
  'akhos-04_th.jpg',
  'alexander-daf-01_th.jpg',
  'already-maged-01_th.jpg',
  'altius-01_th.jpg',
  'artrama-01_th.jpg',
  'astrocat-01_th.jpg',
  'astrocat-02_th.jpg',
  'astropilot-01_th.jpg',
  'bensaid-01_th.jpg',
  'boketto-01_th.jpg',
  'boketto-02_th.jpg',
  'calamus-01_th.jpg',
  'chronos-01_th.jpg',
  'cifroteca-01_th.jpg',
  'crystal-vibe-01_th.jpg',
  'cygna-01_th.jpg',
  'dagas-01_th.jpg',
  'daoine-sidhe-01_th.jpg',
  'declaration-of-unity-01_th.jpg',
  'dementor-01_th.jpg',
  'derotonin-01_th.jpg',
  'deuteroz-01_th.jpg',
  'diffus-01_th.jpg',
  'dimitro-01_th.jpg',
  'djeriko-01_th.jpg',
  'dmnt-01_th.jpg',
  'e-mantra-01_th.jpg',
  'egomorph-01_th.jpg',
  'eguana-01_th.jpg',
  'eleexr-01_th.jpg',
  'eleexr-02_th.jpg',
  'encapsulate-01_th.jpg',
  'erot-01_th.jpg',
  'exolt-01_th.jpg',
  'flooting-grooves-01_th.jpg',
  'fracktom-01_th.jpg',
  'frans-gosu-01_th.jpg',
  'frog-prog-01_th.jpg',
  'from-vacuum-01_th.jpg',
  'gaz-mask-01_th.jpg',
  'gojja-01_th.jpg',
  'gribessa-01_th.jpg',
  'harax-01_th.jpg',
  'hardcore-buddhist-01_th.jpg',
  'heinali-01_th.jpg',
  'hypnotriod-01_th.jpg',
  'injir-01_th.jpg',
  'irukanji-01_th.jpg',
  'irukanji-02_th.jpg',
  'irukanji-03_th.jpg',
  'jai-01_th.jpg',
  'jai-02_th.jpg',
  'jakanatura-01_th.jpg',
  'juelz-01_th.jpg',
  'jungle-symbol-01_th.jpg',
  'ka-01_th.jpg',
  'kabi-01_th.jpg',
  'katya-chilly-01_th.jpg',
  'kauyumari-01_th.jpg',
  'magmadivers-01_th.jpg',
  'makus-01_th.jpg',
  'matik-01_th.jpg',
  'mindex-01_th.jpg',
  'mirror-me-01_th.jpg',
  'mushroomslice-01_th.jpg',
  'mushroomslice-02_th.jpg',
  'neirula-01_th.jpg',
  'noob-psybot-01_th.jpg',
  'nuada-01_th.jpg',
  'omnisound-01_th.jpg',
  'overdream-01_th.jpg',
  'paracozm-01_th.jpg',
  'psydewise-01_th.jpg',
  'psyfactor-01_th.jpg',
  'psypheric-01_th.jpg',
  'roof-raiser-01_th.jpg',
  'saikozaurus-01_th.jpg',
  'salamandra-01_th.jpg',
  'senzar-01_th.jpg',
  'shiva3-01_th.jpg',
  'shivattva-01_th.jpg',
  'shizolizer-gin-01_th.jpg',
  'sky-technology-01_th.jpg',
  'solcast-01_th.jpg',
  'sourone-01_th.jpg',
  'space-organ-01_th.jpg',
  'spacecraft-01_th.jpg',
  'specialmind-01_th.jpg',
  'spectrum-vision-01_th.jpg',
  'sphingida-01_th.jpg',
  'spirit-architect-01_th.jpg',
  'sygnals-01_th.jpg',
  'syned-brain-01_th.jpg',
  'tairam-01_th.jpg',
  'tairam-02_th.jpg',
  'tentura-01_th.jpg',
  'tonal-sense-01_th.jpg',
  'tookytooky-01_th.jpg',
  'trootootoo-01_th.jpg',
  'tystix-01_th.jpg',
  'ufomatka-01_th.jpg',
  'ufomatka-02_th.jpg',
  'unstable-elements-01_th.jpg',
  'unusual-cosmic-process-01_th.jpg',
  'urklang-01_th.jpg',
  'vonoom-01_th.jpg',
  'vorg-01_th.jpg',
  'vorg-02_th.jpg',
  'zhapa-01_th.jpg',
  'zymosis-01_th.jpg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Artists
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Artist Images on this page. All this Artist Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
        <Item
          v-for="image in artistImages"
          :key="image"
          :image="image"
          folder="artists"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
