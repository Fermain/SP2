<script>
  import api from "../../lib/api";
  import { token } from "../../stores/auth";
  import Loader from "./Loader.svelte";

  let errors = [];
  let onboarding = false;
  let loading = false;

  function logout() {
    api.auth.logout();
  }

  async function flow({ target: form }) {
    loading = true;
    const data = Object.fromEntries(new FormData(form).entries());
    const { name, email, avatar, password } = data;
    try {
      if (onboarding) {
        await api.auth.register(
          String(name),
          String(email),
          String(password),
          String(avatar)
        );
      }
      await api.auth.login(String(email), String(password));
    } catch (error) {
      errors = JSON.parse(error.message);
    } finally {
      loading = false;
    }
  }
</script>

<main>
  {#if $token}
    <button on:click={logout}>Log out</button>
  {:else if loading}<Loader />
  {:else}
    <form class="auth" on:submit|preventDefault={flow}>
      {#if onboarding}
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required value="TEST" />
      {/if}

      <label for="email">Email</label>
      <input type="email" name="email" id="email" required />

      {#if onboarding}
        <label for="avatar">Avatar</label>
        <input type="url" name="avatar" id="avatar" />
      {/if}

      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />

      {#if !onboarding}
        <button type="button" on:click={() => (onboarding = true)}
          >Register</button
        >
      {:else}
        <button type="button" on:click={() => (onboarding = false)}
          >Login</button
        >
      {/if}

      <button type="submit">{onboarding ? "Register" : "Login"}</button>

      {#if errors.length}
        <ul class="warnings">
          {#each errors as error}
            <li>{error.message}</li>
          {/each}
        </ul>
      {/if}
    </form>
  {/if}
</main>

<style>
</style>
