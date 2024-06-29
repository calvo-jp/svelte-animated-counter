<script lang="ts">
  import { clamp } from '$lib/clamp.js';
  import { Counter } from '$lib/index.js';
  import Button from './button.svelte';
  import FormGroup from './form-group.svelte';
  import FormInput from './form-input.svelte';
  import FormLabel from './form-label.svelte';

  let min = $state(1000000);
  let max = $state(9999999);
  let step: [number, number] = $state([50, 100]);
  let interval = $state(1500);
  let initialValue = $state(1000000);

  function safeParseFloat(value: unknown, fallback = 0) {
    if (typeof value === 'number') return isNaN(value) ? fallback : value;
    if (typeof value !== 'string') return fallback;

    const n = parseFloat(value);
    if (isNaN(n)) return fallback;
    return n;
  }
</script>

<svelte:head>
  <title>Svelte Animated Counter</title>
</svelte:head>

<div class="px-5 py-12 lg:py-16">
  {#key `${min}:${max}:${step[0]}:${step[1]}:${interval}:${initialValue}`}
    <div class="flex max-w-[24rem] mx-auto justify-center">
      <Counter.Root {min} {max} {step} {interval} {initialValue} class="flex gap-1">
        {#snippet children(o)}
          {#if o.type === 'item'}
            <Counter.Item
              value={o.value}
              class="px-2.5 py-2 text-2xl cursor-pointer font-black text-gray-600 border border-gray-300 rounded-sm"
            />
          {:else}
            <Counter.Separator class="h-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M14.62 12.023a4 4 0 1 1 1.354-3.484c.356 1.81.352 3.967-.464 5.9c-.862 2.04-2.601 3.76-5.57 4.537a.75.75 0 1 1-.38-1.451c2.531-.663 3.892-2.07 4.568-3.67a7.2 7.2 0 0 0 .492-1.832"
                />
              </svg>
            </Counter.Separator>
          {/if}
        {/snippet}
      </Counter.Root>
    </div>
  {/key}

  <form
    class="mt-14 max-w-[20rem] mx-auto"
    onsubmit={(e) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const data = {
        min: safeParseFloat(form.get('min'), 1000000),
        max: safeParseFloat(form.get('max'), 9999999),
        step: [safeParseFloat(form.get('min-step'), 50), safeParseFloat(form.get('max-step'), 100)],
        interval: safeParseFloat(form.get('interval'), 1500),
        initialValue: safeParseFloat(form.get('initial-value'), 1000000),
      };

      data.max = data.max < 1 ? 1 : data.max;
      data.min = clamp(data.min, 1, data.max);
      data.step[0] = data.step[0] < 1 ? 1 : data.step[0];
      data.step[1] = data.step[1] < 1 ? 1 : data.step[1];
      data.step = data.step.toSorted((i, j) => i - j);
      data.interval = data.interval < 1 ? 1 : data.interval;
      data.initialValue = clamp(data.initialValue, data.min, data.max);

      min = data.min;
      max = data.max;
      step = data.step as [number, number];
      interval = data.interval;
      initialValue = data.initialValue;
    }}
  >
    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-5">
        <FormGroup>
          <FormLabel for="min">Min</FormLabel>
          <FormInput id="min" type="number" name="min" value={min} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="max">Max</FormLabel>
          <FormInput id="max" type="number" name="max" value={max} />
        </FormGroup>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <FormGroup>
          <FormLabel for="min-step">Min Step</FormLabel>
          <FormInput id="min-step" type="number" name="min-step" value={step[0]} />
        </FormGroup>
        <FormGroup>
          <FormLabel for="max-step">Max Step</FormLabel>
          <FormInput id="max-step" type="number" name="max-step" value={step[1]} />
        </FormGroup>
      </div>
      <FormGroup>
        <FormLabel for="initial-value">Initial Value</FormLabel>
        <FormInput id="initial-value" type="number" name="initial-value" value={initialValue} />
      </FormGroup>
      <FormGroup>
        <FormLabel for="interval">Interval</FormLabel>
        <FormInput id="interval" type="number" name="interval" value={interval} />
      </FormGroup>
    </div>
    <Button type="submit" class="mt-8">Apply</Button>
  </form>
</div>
