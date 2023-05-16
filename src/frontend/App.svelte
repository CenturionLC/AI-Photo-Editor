<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import { LightSwitch } from "@skeletonlabs/skeleton"
  // import './app.postcss';

  // import Layout from "./layout/Layout.svelte";
  // import Navbar from "./layout/Navbar.svelte";
  // import CommandPalette from "./components/CommandPalette.svelte";
</script>

<!-- <main class="h-full bg-zinc-200 dark:bg-zinc-800"> -->
<main class="h-full" data-theme="skeleton">
  <div class="container h-full mx-auto flex justify-center items-center">
    <div class="space-y-5">
      <h1 class="h1">Let's get cracking bones!</h1>
      <p>Start by exploring:</p>
      <ul>
        <li><code class="code">/src/routes/+layout.svelte</code> - barebones layout, the CSS import order is critical!</li>
        <li><code class="code">/src/app.postcss</code> - minimal css to make the page full screen, may not be relevant for your project</li>
        <li><code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents</li>
      </ul>
      <div class="w-32 h-8 bg-sky-500 dark:bg-red-500"></div>
      <div class="placeholder" />

      <!-- Responsive Container (recommended) -->
      <div class="table-container">
        <!-- Native Table Element -->
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>Armand</td>
                <td>A</td>
                <td>23</td>
              </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">Calculated Total Weight</th>
              <td>23</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="h-32">
        <LightSwitch />
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
