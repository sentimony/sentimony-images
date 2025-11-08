<script setup lang="ts">
useHead({
  title: 'Releases · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Release Images on this page. All this Release Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
  ]
})

const releaseImages = [
  'aesthesia-perception_th.jpg',
  'artech-stringer-mode_th.jpg',
  'bensaid-lucid-vision_th.jpg',
  'boketto-immure_th.jpg',
  'boketto-outer_th.jpg',
  'boketto-presence_th.jpg',
  'boketto-pushback_th.jpg',
  'boketto-yugen_th.jpg',
  'cifroteca-roof-raiser-wild-storm_th.jpg',
  'declaration-of-unity-transpersonal_th.jpg',
  'derotonin-motion-trickness_th.jpg',
  'djeriko-cosmologia-fractalica_th.jpg',
  'eleexr-behind-dark-mirrors_th.jpg',
  'exolt-noise-no-sleep_th.jpg',
  'fracktom-chronicles-of-chaos_th.jpg',
  'frog-prog-sacred-journey_th.jpg',
  'frog-prog-triangulum_th.jpg',
  'from-vacuum-banglich_th.jpg',
  'from-vacuum-good-steps_th.jpg',
  'gaz-mask-12-years_th.jpg',
  'gaz-mask-quetzalcoatl_th.jpg',
  'gaz-mask-trippy-valley_th.jpg',
  'gojja-amber-current_th.jpg',
  'hypnotriod-seven-heavenly-edges_th.jpg',
  'irukanji-eleexr-i-have-something-to-show-you_th.jpg',
  'irukanji-rebuild_th.jpg',
  'irukanji-z-lisu_th.jpg',
  'jai-come-from_th.jpg',
  'jai-midi-bass_th.jpg',
  'juelz-dependence_th.jpg',
  'kabi-mboko_th.jpg',
  'kauyumari-transmuting_th.jpg',
  'mirror-me-azure-skies-and-golden-valleys_th.jpg',
  'mushroomslice-astro-review_th.jpg',
  'noob-psybot-fiends-obscure-litany_th.jpg',
  'nuada-internal-quest_th.jpg',
  'nuada-tools-of-perception_th.jpg',
  'omnisound-destiny_th.jpg',
  'overdream-beautiful-thinking_th.jpg',
  'paracozm-vorg-qube_th.jpg',
  'paracozm-vorg-too-weird-to-live-too-rare-to-die_th.jpg',
  'psydewise-gain-of-funktion_th.jpg',
  'psydewise-radio-dystopia_th.jpg',
  'psydewise-synaptic-elastic_th.jpg',
  'psyfactor-retro-scientific_th.jpg',
  'psypheric-pa-leting-etter_th.jpg',
  'senzar-before-the-morning-sun_th.jpg',
  'space-organ-behind-the-universe_th.jpg',
  'space-organ-deep-impressions_th.jpg',
  'space-organ-time-and-space_th.jpg',
  'spacecraft-metamorphosis_th.jpg',
  'specialmind-the-missing-particle_th.jpg',
  'spectrum-vision-lost-space-device_th.jpg',
  'sphingida-origin_th.jpg',
  'syned-brain-dementor-mysterium-tremendum_th.jpg',
  'tentura-aurora_th.jpg',
  'tentura-beyond-illusion_th.jpg',
  'tonal-sense-enveloping-rhythm_th.jpg',
  'tystix-etherial-lense_th.jpg',
  'tystix-romanesca_th.jpg',
  'tystix-spectral_th.jpg',
  'u-wave-autumn-discovery_th.jpg',
  'ufomatka-altering-the-synaptic-controllers_th.jpg',
  'ufomatka-the-ep_th.jpg',
  'unusual-cosmic-process-brain-channel_th.jpg',
  'unusual-cosmic-process-e-mantra-sunrise-over-the-black-sea_th.jpg',
  'unusual-cosmic-process-outlines_th.jpg',
  'unusual-cosmic-process-weightlessness_th.jpg',
  'urklang-psyral-lifeforms_th.jpg',
  'va-absence-of-gravity_th.jpg',
  'va-dancing-mavka_th.jpg',
  'va-emptinesses_th.jpg',
  'va-fantazma_th.jpg',
  'va-futured-vol-1_th.jpg',
  'va-futured-vol-2_th.jpg',
  'va-futured-vol-3_th.jpg',
  'va-futured-vol-4_th.jpg',
  'va-futured-vol-5_th.jpg',
  'va-futured-vol-6_th.jpg',
  'va-futured-vol-7_th.jpg',
  'va-gamayun-tale_th.jpg',
  'va-gatekey-vol-1_th.jpg',
  'va-gatekey-vol-2_th.jpg',
  'va-grower_th.jpg',
  'va-ocean-scenes-higher-titans_th.jpg',
  'va-special-places_th.jpg',
  'va-tempo-syndicate_th.jpg',
  'va-the-ten_th.jpg',
  'va-time-loop-beyond-borders_th.jpg',
  'va-true-story_th.jpg',
  'vorg-cyber-soul-chill_th.jpg',
  'vorg-cyber-soul-day_th.jpg',
  'vorg-cyber-soul-night_th.jpg',
  'vorg-echoes_th.jpg',
  'zymosis-an-endless-sense-of-the-past_th.jpg',
  'zymosis-insight_th.jpg',
  'zymosis-memento_th.jpg',
  'zymosis-nichna_th.jpg',
  'zymosis-timeless_th.jpg'
]
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4">

      <h1 class="text-5xl text-white mb-4 font-Julius tracking-widest uppercase">
        Releases
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <p>Digital Keeper storing Release Images on this page. All this Release Images used on portfolio website of Sentimony Records, a psychedelic music label.</p>
      </div>

      <div class="flex gap-4 justify-center flex-wrap mb-16 max-w-[96rem]">
        <Item
          v-for="image in releaseImages"
          :key="image"
          :image="image"
          folder="releases"
        />
      </div>

    </div>
  </div>
</template>

<style></style>
