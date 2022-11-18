<script>
  import Auth from "./lib/components/Auth.svelte";
  import Listings from "./lib/components/listings/Listings.svelte";
  import Listing from "./lib/components/listings/Listing.svelte";
</script>

<main>
  <header>
    <a href="/"><h1>Auction House</h1></a>
    <Auth />
  </header>
  <Listings />
  <Listing />
</main>

<style>
</style>
