<script lang="ts">
  import { Counter, clamp } from '$lib/index.js';
  import { z } from 'zod';
  import Button from './button.svelte';
  import FormGroup from './form-group.svelte';
  import FormInput from './form-input.svelte';
  import FormLabel from './form-label.svelte';

  let min = $state(1000000);
  let max = $state(9999999);
  let step: [number, number] = $state([50, 100]);
  let interval = $state(1500);
  let initialValue = $state(1000000);

  let numberSchema = z
    .string()
    .optional()
    .nullable()
    .pipe(z.coerce.number().min(1))
    .transform((v) => (isNaN(v) ? 1 : v));

  let schema = z
    .object({
      min: numberSchema,
      max: numberSchema,
      step: z.array(numberSchema),
      interval: numberSchema,
      initialValue: numberSchema,
    })
    .transform((values) => {
      values.min = clamp(values.min, values.max);

      values.step =
        values.step.length === 0
          ? [50, 100]
          : values.step.length === 1
            ? [values.step[0], values.step[0]]
            : [values.step[0], values.step[1]].toSorted((i, j) => i - j);

      return values;
    });
</script>

<svelte:head>
  <title>Svelte Animated Counter</title>
</svelte:head>

<div class="px-5 py-12 lg:py-16">
  {#key `${min}:${max}:${step[0]}:${step[1]}:${interval}:${initialValue}`}
    <div class="flex max-w-[24rem] mx-auto justify-center">
      <Counter.Root
        {min}
        {max}
        {step}
        {interval}
        {initialValue}
        class="flex gap-1"
      >
        {#snippet children(o)}
          {#if o.type === 'item'}
            <Counter.Item
              value={o.value}
              class="size-10 text-xl cursor-pointer font-bold border border-gray-300 rounded-sm"
            />
          {:else}
            <Counter.Separator class="h-10 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
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

      const parsed = schema.safeParse({
        min: form.get('min'),
        max: form.get('max'),
        step: [form.get('min-step'), form.get('max-step')],
        interval: form.get('interval'),
        initialValue: form.get('initial-value'),
      });

      if (parsed.success) {
        min = parsed.data.min;
        max = parsed.data.max;
        step = parsed.data.step as [number, number];
        interval = parsed.data.interval;
        initialValue = parsed.data.initialValue;
      }
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
          <FormInput
            id="min-step"
            type="number"
            name="min-step"
            value={step[0]}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel for="max-step">Max Step</FormLabel>
          <FormInput
            id="max-step"
            type="number"
            name="max-step"
            value={step[1]}
          />
        </FormGroup>
      </div>
      <FormGroup>
        <FormLabel for="initial-value">Initial Value</FormLabel>
        <FormInput
          id="initial-value"
          type="number"
          name="initial-value"
          value={initialValue}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel for="interval">Interval</FormLabel>
        <FormInput
          id="interval"
          type="number"
          name="interval"
          value={interval}
        />
      </FormGroup>
    </div>
    <Button type="submit" class="mt-8">Apply</Button>
  </form>
</div>
