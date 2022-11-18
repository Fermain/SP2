<script>
  import Bid from "./Bid.svelte";
  import { token } from "../../../stores/auth";
  import BidForm from "./BidForm.svelte";
  import { credits } from "../../../stores/auth";
  export let bids = [];
  let increment = 1;
  $: sortedBids = bids.reverse()
  $: highestBid = sortedBids.slice(0)[0]?.amount || 0;
</script>

<ul>
  {#if $token}
    <li>
      <BidForm on:bid min={highestBid + increment} amount={highestBid + increment} max={$credits} />
    </li>
  {/if}
  {#each sortedBids as bid}
    <li>
      <Bid {...bid} />
    </li>
  {:else}
    <li>No bids yet</li>
  {/each}
</ul>
