<script>
  import api from "../../api";

  async function list({ target: form }) {
    const data = Object.fromEntries(new FormData(form).entries());
    const { title, description, media, tags, endsAt } = data;
    const { id } = await api.auction.listing().publish(
      String(title),
      String(description),
      String(media),
      String(endsAt),
      String(tags),
    );
  }
</script>

<form class="listing" on:submit|preventDefault={list}>
  <label for="title">Title</label>
  <input type="text" name="title" id="title" required />

  <label for="description">Description</label>
  <textarea type="description" name="description" id="description" required></textarea>

  <label for="tags">Tags</label>
  <input type="text" name="tags" id="tags" required />

  <label for="media">Media</label>
  <input type="text" name="media" id="media" required />

  <label for="endsAt">End Date</label>
  <input type="date" name="endsAt" id="endsAt" required />

  <button>List Item</button>
</form>