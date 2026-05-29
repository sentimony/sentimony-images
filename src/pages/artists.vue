<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ARTIST_SORT_OPTIONS, sortImages, useArtistSort } from '~/composables/useImageSort'
import Item from '~/components/Item.vue'
import SortSelect from '~/components/SortSelect.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'
import { KeyboardMusic } from 'lucide-vue-next'

useHead({
  title: 'Artists',
  meta: [
    { name: 'description', content: 'Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.' }
  ]
})

const { sortBy } = useArtistSort()

const artistImages = [
  // 2007-02-09 va-fantazma
  'harax-01_th.jpg',
  'sphingida-01_th.jpg',
  'solcast-01_th.jpg',
  'zymosis-01_th.jpg',
  'heinali-01_th.jpg',
  'frans-gosu-01_th.jpg',
  // 'ader-project',
  // 'synchronick', // artwork, mastering

  // 2007-06-19 va-emptinesses
  'unstable-elements-01_th.jpg',
  'roof-raiser-01_th.jpg',
  // 'aisaid',
  'alexander-daf-01_th.jpg',
  // 'atmik',
  // 'apivniuk', // artwork
  // 'prok', // mastering

  // 2007-12-20 sphingida-origin

  // 2008-04-25 va-true-story
  'spectrum-vision-01_th.jpg',
  'chronos-01_th.jpg',
  'dagas-01_th.jpg',
  'astropilot-01_th.jpg',
  // 'hvoya',
  // 'liquid-mind',
  'unusual-cosmic-process-01_th.jpg',
  // 'madgentel',
  // 'taff',
  // 'sol',

  // 2008-10-31 spectrum-vision-lost-space-device

  // 2009-02-23 irukanji-z-lisu
  'irukanji-01_th.jpg',
  'irukanji-02_th.jpg',
  'irukanji-03_th.jpg',
  'neirula-01_th.jpg',

  // 2009-11-21 va-ocean-scenes-higher-titans
  'cifroteca-01_th.jpg',
  'overdream-01_th.jpg',
  'already-maged-01_th.jpg',
  'saikozaurus-01_th.jpg',
  'magmadivers-01_th.jpg',
  'shivattva-01_th.jpg',
  'tookytooky-01_th.jpg',
  'calamus-01_th.jpg',
  'shiva3-01_th.jpg',
  // 'juju', // artwork
  // 'iorlovskyi', // artwork
  'makus-01_th.jpg', // mastering
  // 'jet', // mastering

  // 2010-05-31 senzar-before-the-morning-sun
  'senzar-01_th.jpg',
  // 'ariel-electron',
  'erot-01_th.jpg',
  // 'nasa',

  // 2010-06-15 va-grower
  // 'atati',
  // 'mahaon',
  // 'locus',
  'vonoom-01_th.jpg',
  // 'e-r-s',
  'shizolizer-gin-01_th.jpg',
  // 'xylonite',
  // 'liquid-crystal',
  // 'kalpataru-tree',

  // 2010-09-15 va-time-loop-beyond-borders
  // 'iooi',
  // 'cavedave',
  'mindex-01_th.jpg',
  // 'back-to-the-roots',
  // 'khooman',
  // 'lemonchill',
  // 'shunya',
  // 'zea', // compilator

  // 2010-11-05 unusual-cosmic-process-weightlessness

  // 2011-01-10 va-tempo-syndicate
  // 'boggy-elf',
  'hypnotriod-01_th.jpg',
  'flooting-grooves-01_th.jpg',
  'sygnals-01_th.jpg',
  'daoine-sidhe-01_th.jpg',
  // 'wizack-twizack',
  // 'primordial-ooze',

  // 2011-02-21 va-dancing-mavka
  // 'pandemicus',
  // 'jyotish',
  // 'celestial-consciousness',
  'ufomatka-01_th.jpg',
  'ufomatka-02_th.jpg',
  // 'spirit-medicine',
  'sky-technology-01_th.jpg',
  // 'zelur-project',
  // 'space-vibes-system',

  // 2011-04-12 va-absence-of-gravity
  // 'reactive',
  // 'mary-bruk',
  // 'cj-catalizer',
  'psyfactor-01_th.jpg',
  // 'zen-altar', // mastering

  // 2012-01-10 va-special-places
  // 'k-d-expression',
  'cygna-01_th.jpg',
  // 'ambient-intelligent-application',
  // 'rabitza',
  // 'access-to-arasaka',
  // 'field-rotation',
  // 'nexar',
  // '36',
  'eguana-01_th.jpg',

  // 2012-08-07 hypnotriod-seven-heavenly-edges
  'tentura-01_th.jpg',

  // 2012-11-08 specialmind-the-missing-particle
  'specialmind-01_th.jpg',
  // 'ader', // artwork

  // 2012-12-12 tentura-aurora

  // 2013-11-25 cifroteca-roof-raiser-wild-storm
  // 'swaroop-guhathakurta', // artwork

  // 2014-02-09 va-gamayun-tale
  // 'magic-science',
  // 'pharaom',
  // 'nova-fractal',
  // 'wanderlust',
  // 'rexuss',

  // 2014-02-10 psyfactor-retro-scientific

  // 2015-02-16 ufomatka-the-ep

  // 2015-02-22 tentura-beyond-illusion

  // 2017-04-13 va-the-ten
  'katya-chilly-01_th.jpg',
  'encapsulate-01_th.jpg',
  'crystal-vibe-01_th.jpg',
  // 'hair',
  'trootootoo-01_th.jpg', // artwork

  // 2017-07-25 zymosis-insight
  'artrama-01_th.jpg', // artwork
  'dimitro-01_th.jpg', // mastering

  // 2017-10-09 overdream-beautiful-thinking

  // 2018-01-02 ufomatka-altering-the-synaptic-controllers

  // 2018-01-25 omnisound-destiny
  'omnisound-01_th.jpg',
  // 'masha-lichee',

  // 2018-06-20 zymosis-nichna
  // 'dyurchenko', // artwork

  // 2018-08-05 va-futured-vol-1
  'juelz-01_th.jpg',
  'psydewise-01_th.jpg',
  'eleexr-01_th.jpg',
  'eleexr-02_th.jpg',
  'exolt-01_th.jpg',
  'matik-01_th.jpg', // artwork

  // 2018-08-20 psydewise-synaptic-elastic
  // 'nifex',

  // 2018-10-22 u-wave-autumn-discovery
  // 'u-wave',

  // 2019-01-01 va-futured-vol-2
  'space-organ-01_th.jpg',
  'kabi-01_th.jpg',
  'declaration-of-unity-01_th.jpg',
  // 'dreamstalker',

  // 2019-02-01 aesthesia-perception
  'aesthesia-01_th.jpg',
  // 'professor-m',

  // 2019-03-01 juelz-dependence
  // 'hellquist',
  // 'denni-mareta', // artwork

  // 2019-04-01 unusual-cosmic-process-brain-channel

  // 2019-05-03 space-organ-deep-impressions
  // 'alchemy-circle',
  // 'hypogeo',

  // 2019-05-31 psydewise-radio-dystopia
  // 'sam-wise',

  // 2019-06-28 artech-stringer-mode
  // 'artech',
  // '3pointz',

  // 2019-07-26 va-futured-vol-3
  'vorg-01_th.jpg',
  'vorg-02_th.jpg',
  'gojja-01_th.jpg',
  'kauyumari-01_th.jpg',
  // 'omega-sound',
  'altius-01_th.jpg',
  // 'kromagon',
  // 'sumiruna',
  'diffus-01_th.jpg',
  // 'no-c',
  // 'psychoz',
  // 'hybrid-reality',
  'gaz-mask-01_th.jpg',
  'injir-01_th.jpg', // compiled by

  // 2019-12-13 va-gatekey-vol-1
  // 'ra-djan',
  // 'proff',
  // 'sky-mavka',
  'hardcore-buddhist-01_th.jpg',
  // 'art-imagination',
  'e-mantra-01_th.jpg',
  // 'ahanjack',
  // 'yoi',

  // 2020-01-01 gojja-amber-current
  // 'madeinrealtime', // artwork

  // 2020-01-17 gaz-mask-quetzalcoatl
  // 'mojos-ears',
  'deuteroz-01_th.jpg',
  'paracozm-01_th.jpg',
  'jungle-symbol-01_th.jpg', // artwork

  // 2020-02-07 boketto-yugen
  'boketto-01_th.jpg',
  'boketto-02_th.jpg',

  // 2020-03-27 kabi-mboko
  'tystix-01_th.jpg',

  // 2020-04-10 boketto-outer

  // 2020-04-20 zymosis-timeless
  // 'the-doox',

  // 2020-05-28 va-futured-vol-4
  // 'apex',
  // 'scionaugh',
  // 'doonz',
  // 'darkol-trinity',
  'jai-01_th.jpg',
  'jai-02_th.jpg',
  'sourone-01_th.jpg',
  // 'tee-moe',
  'frog-prog-01_th.jpg',
  // 'neurolabz',
  'egomorph-01_th.jpg',

  // 2020-10-15 exolt-noise-no-sleep

  // 2020-10-29 boketto-presence

  // 2020-11-19 paracozm-vorg-too-weird-to-live-too-rare-to-die

  // 2021-02-04 psypheric-pa-leting-etter
  'psypheric-01_th.jpg',

  // 2021-02-17 boketto-immure

  // 2021-04-01 va-gatekey-vol-2
  // 'scarlet-crow',
  // 'seamoon',
  // 'delphic',
  // 'aukaro',
  // 'liquid-soma',
  // 'braindrop-in-dub',
  'derotonin-01_th.jpg',

  // 2021-05-06 space-organ-behind-the-universe

  // 2021-07-09 derotonin-motion-trickness
  // 'simon-neumann', // mastering

  // 2021-07-30 unusual-cosmic-process-outlines

  // 2021-09-03 gaz-mask-trippy-valley

  // 2021-10-22 irukanji-rebuild

  // 2022-01-01 vorg-echoes

  // 2022-02-04 tystix-etherial-lense

  // 2022-04-01 nuada-internal-quest
  'nuada-01_th.jpg',

  // 2022-04-08 unusual-cosmic-process-e-mantra-sunrise-over-the-black-sea

  // 2022-04-15 noob-psybot-fiends-obscure-litany
  'noob-psybot-01_th.jpg',
  // 'geozen',
  // 'anomalie-in',
  // 'alien-time',

  // 2022-07-22 va-futured-vol-5
  // 'halform',
  // 'beartone',
  'dmnt-01_th.jpg',
  // 'noid',
  // 'irrbloss',
  // 'hedonythm',
  // 'urjasa',

  // 2022-09-16 frog-prog-sacred-journey

  // 2022-12-02 irukanji-eleexr-i-have-something-to-show-you
  'ka-01_th.jpg', // artwork

  // 2022-12-16 from-vacuum-banglich
  'from-vacuum-01_th.jpg',
  // 'elisa-vargas-fernandez',

  // 2023-02-03 declaration-of-unity-transpersonal

  // 2023-04-21 psydewise-gain-of-funktion

  // 2023-07-07 tystix-romanesca

  // 2023-07-25 eleexr-behind-dark-mirrors
  // 'torus-knot',

  // 2023-08-11 jai-midi-bass
  'zhapa-01_th.jpg', // artwork

  // 2023-09-22 paracozm-vorg-qube

  // 2023-11-13 va-futured-vol-6
  'akhos-01_th.jpg',
  'akhos-02_th.jpg',
  'akhos-03_th.jpg',
  'akhos-04_th.jpg',
  'bensaid-01_th.jpg',
  'syned-brain-01_th.jpg',
  // 'chaos-achemist',
  // 'balcosmos',
  'spacecraft-01_th.jpg',
  'djeriko-01_th.jpg',
  // 'sinister-sequence',
  'urklang-01_th.jpg',

  // 2024-02-16 space-organ-time-and-space

  // 2024-03-15 urklang-psyral-lifeforms

  // 2024-04-05 spacecraft-metamorphosis

  // 2024-04-12 mushroomslice-astro-review
  'mushroomslice-01_th.jpg',
  'mushroomslice-02_th.jpg',

  // 2024-05-17 kauyumari-transmuting

  // 2024-05-24 nuada-tools-of-perception

  // 2024-06-07 jai-come-from

  // 2024-06-14 djeriko-cosmologia-fractalica
  // 'tharok',

  // 2024-07-20 fracktom-chronicles-of-chaos
  'fracktom-01_th.jpg',

  // 2024-07-25 zymosis-memento

  // 2024-09-13 boketto-pushback

  // 2024-11-08 bensaid-lucid-vision

  // 2024-11-24 from-vacuum-good-steps
  // 'drevnii',

  // 2025-01-24 frog-prog-triangulum

  // 2025-03-21 mirror-me-azure-skies-and-golden-valleys
  'mirror-me-01_th.jpg',
  'salamandra-01_th.jpg', // artwork

  // 2025-03-28 vorg-cyber-soul-night

  // 2025-04-05 tystix-spectral

  // 2025-04-18 tonal-sense-enveloping-rhythm
  'tonal-sense-01_th.jpg',

  // 2025-04-29 zymosis-an-endless-sense-of-the-past

  // 2025-06-13 va-futured-vol-7
  // 'aleckat',
  // 'soulid',
  'jakanatura-01_th.jpg',
  // 'shmewl',
  // 'flexxodus',
  // 'omsense',
  // 'beka',
  // 'qube',
  // 'alternative-roots',

  // 2025-06-27 vorg-cyber-soul-day

  // 2025-07-25 syned-brain-dementor-mysterium-tremendum
  'dementor-01_th.jpg',
  'spirit-architect-01_th.jpg', // mastering

  // 2025-12-05 gaz-mask-12-years
  // 'yngvarr', // artwork

  // artists without release date in releases
  'astrocat-01_th.jpg',
  'astrocat-02_th.jpg',
  'gribessa-01_th.jpg',
  'tairam-01_th.jpg',
  'tairam-02_th.jpg',

  // 2025-09-01 va-gatekey-vol-3

  // 2026-01-02 vorg-cyber-soul-chill

  // 2026-05-22 alien-immigrant-plant-medicine
  'alien-immigrant-01_th.jpg',
]

const sortedArtistImages = computed(() => sortImages(artistImages, sortBy.value))

const active = ref<{ src: string, title: string } | null>(null)
const lightboxOpen = computed({
  get: () => active.value !== null,
  set: (v) => {
    if (!v) active.value = null
  },
})
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4 w-full max-w-384">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <KeyboardMusic class="size-10 shrink-0" :stroke-width="2" />
        Artists
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Portraits of the producers, live acts and collaborators behind the music, the people who have shaped the Sentimony Records sound since 2007.</p>
      </div>

      <div class="flex justify-end mb-4">
        <SortSelect v-model="sortBy" :options="ARTIST_SORT_OPTIONS" />
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16">
        <Item
          v-for="image in sortedArtistImages"
          :key="image"
          :image="image"
          folder="artists"
          @select="active = $event"
        />
      </div>

    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      :src="active?.src ?? ''"
      :title="active?.title ?? ''"
    />
  </div>
</template>

<style></style>
