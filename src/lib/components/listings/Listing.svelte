<script>
  import { profile } from "../../../stores/auth";
  import api from "../../api";
  import Bids from "../bids/Bids.svelte";
  import Gallery from "../Gallery.svelte";
  import Loader from "../Loader.svelte";
  import ListingForm from "./ListingForm.svelte";
  const url = new URL(window.location.href);
  const [, id] =
    url.pathname.match(
      /listings\/([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$)/
    ) || [];

  async function bid({ detail: amount }) {
    try {
      await api.auction.listing(id).bid(amount);
    } catch {
      alert("Bid failed");
    }
  }

  async function delist({ id }) {
    api.auction.listing(id).delist();
  }
</script>

{#if id}
  <div class="listing">
    {#await api.auction.listing(id).details()}
      <Loader />
    {:then listing}
      <header>
        <h2>
          {listing.title} - Ends {(
            (new Date(listing.endsAt).getTime() - new Date().getTime()) /
            1000 /
            60
          ).toFixed(0)} minutes from now
        </h2>
      </header>

      <Gallery media={listing.media} />
      <Bids bids={listing.bids} on:bid={bid} />

      {#if listing.seller.name === $profile.name}
        <button type="button" on:click={() => delist(listing)}>Delete</button>
      {/if}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
{:else}
  <ListingForm />
{/if}

<style>
</style>
