<script lang="ts">
  // import NodeWrapper from
  import { Node, Slider, generateInput, generateOutput } from "svelvet";

  type Inputs = {
    brightness: number;
  };

  const initialData = {
    brightness: 1,
  };

  const inputs = generateInput(initialData);

  export const processor = (inputs: Inputs) => {
    console.log(inputs.brightness);
    return inputs.brightness;
  };
  // const output = generateOutput(inputs, processor);
</script>

<Node position="{{ x: 600, y: 200 }}">
  <div class="min-w-64 flex flex-col rounded-lg border-2 border-zinc-500 bg-zinc-700 p-2">
    <div class="mb-4 border-b-2 border-zinc-500">
      <p class="mb-1 font-sans text-base text-white">Brightness</p>
      <p></p>
    </div>
    <div class="justify-centre flex flex-col items-center">
      <Slider
        min="{0}"
        max="{1}"
        fixed="{1}"
        step="{0.1}"
        parameterStore="{$inputs.brightness}"
        fontColor="white"
        barColor="grey"
        bgColor="black"
      />
    </div>
  </div>
</Node>
