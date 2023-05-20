<!-- The canvas which displays our beautiful Svelvet GUI graph -->
<script lang="ts">
  import { Svelvet, ThemeToggle, Node } from "svelvet";

  import ContextMenu from "./ContextMenu.svelte";

  console.log("help me");

  let ShowContext: Boolean;
  let node: Node;
  let x: number;
  let y: number;

  x = 0;
  y = 0;

  ShowContext = false;

  window.addEventListener("click", handleClick);
  window.addEventListener("contextmenu", handleClick);

  function handleNewClick(event: CustomEvent) {
    if (ShowContext) ShowContext = false;

    node = event.detail.node;
    x = event.detail.e.pageX;
    y = event.detail.e.pageY;

    if (event.detail.e.button == 0) {
      // console.log("This is a left click!")
      //To be implemented
    } else if (event.detail.e.button == 2) {
      // console.log("This is a right click!")
      ShowContext = true;
    }

    // Prevent the event from reaching the original handler
    event.stopPropagation();
    event.preventDefault();
  }

  function handleClick(event: MouseEvent) {
    console.log(ShowContext);
    if (ShowContext) ShowContext = false;

    if (event.button === 0) {
      // Left click
    }
  }
</script>

<Svelvet id="my-canvas" zoom="{0.5}" minimap theme="custom-theme">
  <Node
    bgColor="#ec4899"
    height="{200}"
    position="{{ x: 100, y: 100 }}"
    on:nodeClicked="{handleNewClick}"
  />

  <Node
    bgColor="#ec4899"
    height="{200}"
    position="{{ x: 200, y: 200 }}"
    on:nodeClicked="{handleNewClick}"
  />

  <ThemeToggle main="custom-dark" alt="light" slot="toggle" mainIcon="light_mode" />
</Svelvet>

{#if ShowContext}
  <div>
    <ContextMenu node="{node}" positionX="{x}" positionY="{y}" />
  </div>
{/if}

<style>
  :root[svelvet-theme="custom-dark"] {
    --background-color: #181825;
    --dot-color: hsl(225, 10%, 50%);

    --minimap-background-color: #52525b;

    --minimap-node-color: hsl(225, 30%, 20%);

    --controls-background-color: hsl(225, 20%, 27%);
    --controls-text-color: hsl(0, 0%, 100%);

    --theme-toggle-text-color: hsl(0, 0%, 100%);
    --theme-toggle-color: hsl(225, 20%, 27%);
  }
</style>
