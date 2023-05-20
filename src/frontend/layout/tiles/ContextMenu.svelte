<script lang="ts">
  import { Node } from "svelvet";

  export let node: Node;
  export let positionX: number;
  export let positionY: number;
  export let destroy: null | (() => void) = null;

  let left = positionX + 20 + "px";
  let top = positionY - 40 + "px";
</script>

<div id="Frame" style="left: {left};top:{top};">
  <button class="Category">Close</button>
  <button class="Category">Copy</button>
  <button class="Category">Cut</button>
  <button class="Category" on:click="{destroy}">Delete</button>
</div>

<style>
  #Frame {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 200px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
    z-index: 9999;
  }

  .Category:hover {
    background-color: rgba(149, 148, 148, 0.435);
  }
</style>
