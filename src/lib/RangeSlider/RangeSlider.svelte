<script lang="ts">
  import { onMount } from "svelte";
  import type {
    SliderOptions,
    ThumbOptions,
    TrackOptions,
  } from "./types.js";

  let {
    disabled = $bindable(false),
    thumb1 = $bindable(0),
    thumb2 = $bindable(0),
    sliderOptions,
    trackOptions,
    thumbOptions,
  }: {
    disabled?: boolean;
    thumb1: number;
    thumb2: number;
    sliderOptions: SliderOptions;
    trackOptions: TrackOptions;
    thumbOptions: ThumbOptions;
  } = $props();

  const {
    size: thumbSize,
    color: thumbColor,
    radius: thumbRadius,
    border: thumbBorder,
    class: thumbClass,
  } = thumbOptions;

  const { connecting, class: trackClass } = trackOptions;

  const {
    color: connectingColor,
    padding: connectingPadding,
    radius: connectingRadius,
  } = connecting || { color: "", padding: 0, radius: 0 };

  let { min, max, step } = sliderOptions;

  if (min >= max) throw new Error("min must be less than max");
  if (thumb1 < min || thumb1 > max) thumb1 = min;
  if (thumb2 < min || thumb2 > max) thumb2 = max;
  if (thumb1 > thumb2) [thumb1, thumb2] = [thumb2, thumb1];

  const range = max - min;
  let sliderWidth: number = $state(0);
  let sliderContainer: HTMLDivElement | null = $state(null);
  let nt1: number = $state(0);
  let nt2: number = $state(0);

  const denormalize = (value: number): number =>
    Math.round(((value / sliderWidth) * range + min) / step) * step;

  const normalize = (value: number): number =>
    ((value - min) / range) * sliderWidth;

  const updateThumbs = () => {
    if (sliderWidth === 0) return;
    nt1 = normalize(thumb1);
    nt2 = normalize(thumb2);
  };

  onMount(() => {
    if (!sliderContainer) return;
    sliderContainer.style.width = `${sliderWidth + thumbSize * 2}px`;
    sliderContainer.style.padding = `0 ${thumbSize / 2}px`;
    updateThumbs();
  });

  $effect(() => {
    thumb1 = denormalize(nt1);
    thumb2 = denormalize(nt2);
  });

  const handleThumb1Move = (
    clientX: number,
    startX: number,
    initialNode1x: number
  ) => {
    const deltaX = clientX - startX;
    let newNt1 = initialNode1x + deltaX;

    if (newNt1 < 0) {
      nt1 = 0;
      return;
    }

    if (newNt1 > nt2 - step) {
      nt1 = nt2 - step;
      return;
    }

    const denormalized = denormalize(newNt1);
    const snapped = Math.round(denormalized / step) * step;
    nt1 = normalize(snapped);
  };

  const handleThumb2Move = (
    clientX: number,
    startX: number,
    initialNode2x: number
  ) => {
    const deltaX = clientX - startX;
    let newNt2 = initialNode2x + deltaX;

    if (newNt2 < nt1 - step) {
      nt2 = nt1 - step;
      return;
    }

    if (newNt2 > sliderWidth) {
      nt2 = sliderWidth;
      return;
    }

    const denormalized = denormalize(newNt2);
    const snapped = Math.round(denormalized / step) * step;
    nt2 = normalize(snapped);
  };
</script>

<div
  id="sv-double-slider-container"
  bind:this={sliderContainer}
  class={[trackClass, disabled && "sv-double-slider-disabled"]}
  style="height: {trackOptions.height}px; background-color: {trackOptions.color}; border-radius: {trackOptions.radius}px;
  "
>
  <div id="sv-double-slider-track" bind:clientWidth={sliderWidth}>
    <div
      class="sv-double-slider-connecting"
      style="left: {nt1 - thumbSize - connectingPadding}px; 
            width: {nt2 - nt1 + (thumbSize + connectingPadding) * 2}px;
            background-color: {connectingColor};
            border-radius: {connectingRadius}px;
            height: {thumbSize + connectingPadding * 2}px;"
    ></div>

    <div
      id="sv-double-slider-thumb1"
      class={["sv-double-slider-thumb", connecting?.class || "", thumbClass]}
      aria-label="node0"
      tabindex="0"
      role="slider"
      aria-valuenow={thumb1}
      style="left: {nt1}px; width: {thumbSize}px; height: {thumbSize}px; transform: translate(-100%, -50%);
        background-color: {thumbColor}; border-radius: {thumbRadius}px; {thumbBorder
        ? `border: ${thumbBorder.size}px solid ${thumbBorder.color};`
        : ''} {disabled ? 'cursor: default;' : 'cursor: pointer'}"
      onmousedown={({ clientX }: MouseEvent) => {
        if (disabled) return;

        const startX = clientX;
        const initialNode1x = nt1;

        const onMouseMove = ({ clientX }: MouseEvent) => {
          handleThumb1Move(clientX, startX, initialNode1x);
        };

        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}
      ontouchstart={({ touches }: TouchEvent) => {
        if (disabled) return;

        const startX = touches[0].clientX;
        const initialNode1x = nt1;

        const onMouseMove = ({ touches }: TouchEvent) => {
          handleThumb1Move(touches[0].clientX, startX, initialNode1x);
        };

        const onMouseUp = () => {
          window.removeEventListener("touchmove", onMouseMove);
          window.removeEventListener("touchup", onMouseUp);
        };

        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("touchup", onMouseUp);
      }}
    ></div>
    <div
      id="sv-double-slider-thumb2"
      class={["sv-double-slider-thumb", connecting?.class || "", thumbClass]}
      aria-label="node0"
      tabindex="0"
      role="slider"
      aria-valuenow={thumb2}
      style="left: {nt2}px; width: {thumbSize}px; height: {thumbSize}px; transform: translate(0, -50%);
     background-color: {thumbColor}; border-radius: {thumbRadius}px; {thumbBorder
        ? `border: ${thumbBorder.size}px solid ${thumbBorder.color};`
        : ''} {disabled ? 'cursor:  default;' : 'cursor: pointer'}"
      onmousedown={({ clientX }: MouseEvent) => {
        if (disabled) return;

        const startX = clientX;
        const initialNode2x = nt2;

        const onMouseMove = ({ clientX }: MouseEvent) =>
          handleThumb2Move(clientX, startX, initialNode2x);

        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}
      ontouchstart={({ touches }: TouchEvent) => {
        if (disabled) return;

        const startX = touches[0].clientX;
        const initialNode2x = nt2;

        const onMouseMove = ({ touches }: TouchEvent) =>
          handleThumb2Move(touches[0].clientX, startX, initialNode2x);

        const onMouseUp = () => {
          window.removeEventListener("touchmove", onMouseMove);
          window.removeEventListener("touchup", onMouseUp);
        };

        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("touchup", onMouseUp);
      }}
    ></div>
  </div>
</div>

<style>
  #sv-double-slider-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #sv-double-slider-track {
    flex: 1;
    height: 8px;
    position: relative;
    overflow: visible;
  }

  .sv-double-slider-connecting {
    position: absolute;
    z-index: 10;
    transform: translateY(-50%);
    top: 50%;
  }

  .sv-double-slider-thumb {
    position: absolute;
    top: 50%;
    z-index: 20;
  }

  .sv-double-slider-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
