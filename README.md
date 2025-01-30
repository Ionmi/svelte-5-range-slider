# DoubleThumbSlider - Svelte Component

A customizable double-thumb range slider built for Svelte. This component allows users to select a range between a minimum and maximum value with two draggable thumbs.

## Installation

Install the package via npm:

```sh
npm install svelte-5-range-slider
```

## Usage

Import the `DoubleThumbSlider` component into your Svelte file and bind it to two state variables:

```svelte
<script lang="ts">
  import DoubleThumbSlider from "svelte-5-range-slider/DoubleThumbSlider.svelte";

  let thumb1 = 25;
  let thumb2 = 50;

  const trackOptions = {
    height: 12,
    color: "#323841",
    radius: 10000,
    connecting: {
      color: "#ECF9FF",
      padding: 4,
      radius: 100000,
    },
  };

  const thumbOptions = {
    color: "#1D232A",
    size: 16,
    radius: 20,
  };

  const sliderOptions = {
    min: 18,
    max: 90,
    step: 1,
  };
</script>

<div class="slider-container">
  <span>{thumb1} - {thumb2}</span>
  <DoubleThumbSlider
    bind:thumb1
    bind:thumb2
    {sliderOptions}
    {trackOptions}
    {thumbOptions}
  />
</div>
```

## Props

### `sliderOptions: SliderOptions`

- `min` (number) - Minimum value of the slider
- `max` (number) - Maximum value of the slider
- `step` (number) - Increment steps

### `trackOptions: TrackOptions`

- `height` (number) - Height of the track
- `color` (string) - Color of the track
- `radius` (number) - Border radius of the track
- `connecting.color` (string) - Color of the selected range section
- `connecting.padding` (number) - Padding around the selected range
- `connecting.radius` (number) - Border radius of the selected range

### `thumbOptions: ThumbOptions`

- `color` (string) - Color of the thumb
- `size` (number) - Size of the thumb
- `radius` (number) - Border radius of the thumb
- `border.size` (number) - Border width of the thumb (optional)
- `border.color` (string) - Border color of the thumb (optional)

## Events

This component automatically updates `thumb1` and `thumb2` values when the user interacts with the slider.

## Styling

The slider is styled via inline styles and can be customized using the provided options. If additional styling is needed, you can wrap it in a styled container and apply CSS classes accordingly.

## License

This project is licensed under the MIT License.

---

Happy coding! 🎉

