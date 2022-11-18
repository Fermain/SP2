<script>
  export let media = [];
  export let alt = "temp-";
</script>

<div class="gallery">
  {#each media as src, index }
    <div class="gallery-item">
      <img {src} alt={alt + index} />
    </div>
  {:else}
    No media
  {/each}
</div>
