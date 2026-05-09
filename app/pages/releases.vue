<script setup lang="ts">
useHead({
  title: 'Releases · Digital Keeper',
  meta: [
    { name: 'description', content: 'Digital Keeper storing Release Images on this page. All this Release Images used on portfolio website of Sentimony Records, a psychedelic music label.' }
  ]
})

const releaseImages = [
  'va-fantazma_th.jpg', // 2007-02-09
  'va-emptinesses_th.jpg', // 2007-06-19
  'sphingida-origin_th.jpg', // 2007-12-20
  'va-true-story_th.jpg', // 2008-04-25
  'spectrum-vision-lost-space-device_th.jpg', // 2008-10-31
  'irukanji-z-lisu_th.jpg', // 2009-02-23
  'va-ocean-scenes-higher-titans_th.jpg', // 2009-11-21
  'senzar-before-the-morning-sun_th.jpg', // 2010-05-31
  'va-grower_th.jpg', // 2010-06-15
  'va-time-loop-beyond-borders_th.jpg', // 2010-09-15
  'unusual-cosmic-process-weightlessness_th.jpg', // 2010-11-05
  'va-tempo-syndicate_th.jpg', // 2011-01-10
  'va-dancing-mavka_th.jpg', // 2011-02-21
  'va-absence-of-gravity_th.jpg', // 2011-04-12
  'va-special-places_th.jpg', // 2012-01-10
  'hypnotriod-seven-heavenly-edges_th.jpg', // 2012-08-07
  'specialmind-the-missing-particle_th.jpg', // 2012-11-08
  'tentura-aurora_th.jpg', // 2012-12-12
  'cifroteca-roof-raiser-wild-storm_th.jpg', // 2013-11-25
  'va-gamayun-tale_th.jpg', // 2014-02-09
  'psyfactor-retro-scientific_th.jpg', // 2014-02-10
  'ufomatka-the-ep_th.jpg', // 2015-02-16
  'tentura-beyond-illusion_th.jpg', // 2015-02-22
  'va-the-ten_th.jpg', // 2017-04-13
  'zymosis-insight_th.jpg', // 2017-07-25
  'overdream-beautiful-thinking_th.jpg', // 2017-10-09
  'ufomatka-altering-the-synaptic-controllers_th.jpg', // 2018-01-02
  'omnisound-destiny_th.jpg', // 2018-01-25
  'zymosis-nichna_th.jpg', // 2018-06-20
  'va-futured-vol-1_th.jpg', // 2018-08-05
  'psydewise-synaptic-elastic_th.jpg', // 2018-08-20
  'u-wave-autumn-discovery_th.jpg', // 2018-10-22
  'va-futured-vol-2_th.jpg', // 2019-01-01
  'aesthesia-perception_th.jpg', // 2019-02-01
  'juelz-dependence_th.jpg', // 2019-03-01
  'unusual-cosmic-process-brain-channel_th.jpg', // 2019-04-01
  'space-organ-deep-impressions_th.jpg', // 2019-05-03
  'psydewise-radio-dystopia_th.jpg', // 2019-05-31
  'artech-stringer-mode_th.jpg', // 2019-06-28
  'va-futured-vol-3_th.jpg', // 2019-07-26
  'va-gatekey-vol-1_th.jpg', // 2019-12-13
  'gojja-amber-current_th.jpg', // 2020-01-01
  'gaz-mask-quetzalcoatl_th.jpg', // 2020-01-17
  'boketto-yugen_th.jpg', // 2020-02-07
  'kabi-mboko_th.jpg', // 2020-03-27
  'boketto-outer_th.jpg', // 2020-04-10
  'zymosis-timeless_th.jpg', // 2020-04-20
  'va-futured-vol-4_th.jpg', // 2020-05-28
  'exolt-noise-no-sleep_th.jpg', // 2020-10-15
  'boketto-presence_th.jpg', // 2020-10-29
  'paracozm-vorg-too-weird-to-live-too-rare-to-die_th.jpg', // 2020-11-19
  'psypheric-pa-leting-etter_th.jpg', // 2021-02-04
  'boketto-immure_th.jpg', // 2021-02-17
  'va-gatekey-vol-2_th.jpg', // 2021-04-01
  'space-organ-behind-the-universe_th.jpg', // 2021-05-06
  'derotonin-motion-trickness_th.jpg', // 2021-07-09
  'unusual-cosmic-process-outlines_th.jpg', // 2021-07-30
  'gaz-mask-trippy-valley_th.jpg', // 2021-09-03
  'irukanji-rebuild_th.jpg', // 2021-10-22
  'vorg-echoes_th.jpg', // 2022-01-01
  'tystix-etherial-lense_th.jpg', // 2022-02-04
  'nuada-internal-quest_th.jpg', // 2022-04-01
  'unusual-cosmic-process-e-mantra-sunrise-over-the-black-sea_th.jpg', // 2022-04-08
  'noob-psybot-fiends-obscure-litany_th.jpg', // 2022-04-15
  'va-futured-vol-5_th.jpg', // 2022-07-22
  'frog-prog-sacred-journey_th.jpg', // 2022-09-16
  'irukanji-eleexr-i-have-something-to-show-you_th.jpg', // 2022-12-02
  'from-vacuum-banglich_th.jpg', // 2022-12-16
  'declaration-of-unity-transpersonal_th.jpg', // 2023-02-03
  'psydewise-gain-of-funktion_th.jpg', // 2023-04-21
  'tystix-romanesca_th.jpg', // 2023-07-07
  'eleexr-behind-dark-mirrors_th.jpg', // 2023-07-25
  'jai-midi-bass_th.jpg', // 2023-08-11
  'paracozm-vorg-qube_th.jpg', // 2023-09-22
  'va-futured-vol-6_th.jpg', // 2023-11-13
  'space-organ-time-and-space_th.jpg', // 2024-02-16
  'urklang-psyral-lifeforms_th.jpg', // 2024-03-15
  'spacecraft-metamorphosis_th.jpg', // 2024-04-05
  'mushroomslice-astro-review_th.jpg', // 2024-04-12
  'kauyumari-transmuting_th.jpg', // 2024-05-17
  'nuada-tools-of-perception_th.jpg', // 2024-05-24
  'jai-come-from_th.jpg', // 2024-06-07
  'djeriko-cosmologia-fractalica_th.jpg', // 2024-06-14
  'fracktom-chronicles-of-chaos_th.jpg', // 2024-07-20
  'zymosis-memento_th.jpg', // 2024-07-25
  'boketto-pushback_th.jpg', // 2024-09-13
  'bensaid-lucid-vision_th.jpg', // 2024-11-08
  'from-vacuum-good-steps_th.jpg', // 2024-11-24
  'frog-prog-triangulum_th.jpg', // 2025-01-24
  'mirror-me-azure-skies-and-golden-valleys_th.jpg', // 2025-03-21
  'vorg-cyber-soul-night_th.jpg', // 2025-03-28
  'tystix-spectral_th.jpg', // 2025-04-05
  'tonal-sense-enveloping-rhythm_th.jpg', // 2025-04-18
  'zymosis-an-endless-sense-of-the-past_th.jpg', // 2025-04-29
  'va-futured-vol-7_th.jpg', // 2025-06-13
  'vorg-cyber-soul-day_th.jpg', // 2025-06-27
  'syned-brain-dementor-mysterium-tremendum_th.jpg', // 2025-07-25
  'gaz-mask-12-years_th.jpg', // 2025-12-05
  'vorg-cyber-soul-chill_th.jpg' // 2026-01-02 NOT RELEASED YET
].reverse()
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
