<script>
  export let id = "";
  export let amount = 0;
  export let bidderName = "";
  export let created = "";
  $: createdDate = new Date(created);
</script>

<div class="bid" id="{id}">
  <div class="bid-amount">
    {amount}
  </div>
  <div class="bid-bidder">
    {bidderName}
  </div>
  <div class="bid-created">
    <div class="bid-created-date">{createdDate.toLocaleDateString()}</div>
    <div class="bid-created-time">{createdDate.toLocaleTimeString()}</div>
  </div>
</div>