<script>
  import { createEventDispatcher } from "svelte";
  export let max = 0;
  export let min = 0;
  export let amount = 0;

  const dispatch = createEventDispatcher();
  
  async function bid({ target: form }) {
    const amount = form.amount.value;
    dispatch("bid", amount);
  }
</script>

<form class="bid" on:submit|preventDefault={bid}>
  <label for="bid">Bid Amount</label>
  <input type="range" id="bid" name="amount" {max} {min} bind:value={amount}>
  <div class="bid-amount">
    {amount}
  </div>
  <button type="submit">Place Bid</button>
</form>