<script lang="ts">
  import type {
    SliderOptions,
    ThumbOptions,
    TrackOptions,
  } from "$lib/RangeSlider/types.js";

  import RangeSlider from "$lib/RangeSlider/RangeSlider.svelte";

  let thumb1 = $state(25);
  let thumb2 = $state(50);

  const trackOptions: TrackOptions = {
    height: 12,
    color: "#E2E8F0", // Light Gray
    radius: 10000,
    connecting: {
      color: "#CBD5E0", // Gray
      padding: 4,
      radius: 100000,
    },
  };

  const thumbOptions: ThumbOptions = {
    color: "#4A5568", // Dark Gray
    size: 16,
    radius: 20,
  };

  const sliderOptions: SliderOptions = {
    min: 18,
    max: 90,
    step: 1,
  };
</script>

<div class="flex h-screen w-screen bg-base-200">
  <div class="flex flex-col m-auto w-96 gap-16">
    <RangeSlider
      bind:thumb1
      bind:thumb2
      {sliderOptions}
      trackOptions={{
        ...trackOptions,
        color: "#E2E8F0", // Light Gray
        radius: 5000,
      }}
      thumbOptions={{
        ...thumbOptions,
        color: "#4A5568", // Dark Gray
        radius: 10,
      }}
    />

    <RangeSlider
      bind:thumb1
      bind:thumb2
      {sliderOptions}
      trackOptions={{
        ...trackOptions,
        color: "#A0AEC0", // Medium Gray
        radius: 6,
        connecting: {
          color: "#CBD5E0", // Gray
          padding: 4,
          radius: 6,
        },
      }}
      thumbOptions={{
        ...thumbOptions,
        color: "#4A5568", // Dark Gray
        radius: 4,
      }}
    />

    <RangeSlider
      bind:thumb1
      bind:thumb2
      sliderOptions={{
        ...sliderOptions,
        min: 10,
        max: 100,
      }}
      trackOptions={{
        ...trackOptions,
        color: "#E2E8F0", // Light Gray
        radius: 10000,
        connecting: null,
      }}
      thumbOptions={{
        ...thumbOptions,
        size: 20,
        color: "#3182CE", // Blue
        radius: 25,
      }}
    />

    <RangeSlider
      bind:thumb1
      bind:thumb2
      sliderOptions={{
        ...sliderOptions,
        step: 5,
      }}
      trackOptions={{
        ...trackOptions,
        color: "#63B3ED", // Light Blue
        radius: 12000,
        connecting: null,
      }}
      thumbOptions={{
        ...thumbOptions,
        color: "#3182CE", // Blue
        radius: 30,
        border: {
          size: 4,
          color: "#F6E05E", // Yellow
        },
      }}
    />

    <RangeSlider
      bind:thumb1
      bind:thumb2
      sliderOptions={{
        ...sliderOptions,
        step: 5,
      }}
      trackOptions={{
        ...trackOptions,
        color: "#63B3ED", // Light Blue
        radius: 12000,
        connecting: {
          color: "#3182CE", // Blue
          padding: 0,
          radius: 12000,
        },
      }}
      thumbOptions={{
        ...thumbOptions,
        color: "#3182CE", // Blue
        radius: 30,
        border: {
          size: 4,
          color: "#F6E05E", // Yellow
        },
      }}
    />
  </div>
</div>
