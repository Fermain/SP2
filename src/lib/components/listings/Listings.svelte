<script>
  import api from "../../api"
  import Loader from "../Loader.svelte";
</script>

{#await api.auction.listings()}
  <Loader />
{:then listings}
  <h2>Listings</h2>
  <ul>
    {#each listings as listing}
      <li>
        <a href="/listings/{listing.id}">{listing.title}</a>
      </li>
    {/each}
  </ul>
{/await}

<style>
</style>
