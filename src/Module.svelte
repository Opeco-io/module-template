<script>
  export let module

  const incrementCount = (inc) => (module.state.count += inc)

  const save = () => {
    module.store.count = module.state.count
  }
  const reset = () => {
    module.state.count = 0
    module.store.count = 0
  }

  module.init(() => ({
    count: 0,
  }))
  module.on("mount", () => {
    module.state.count = module.store?.count || module.state.count
  })
</script>

<div class="Module">
  <p class="Message">
    Module <span class="has-text-primary">{module.name}</span> has been successfully
    initialized! 🚀
  </p>
  <p class="Count">
    {module.state.count}
  </p>
  <div>
    <button class="button is-primary" on:click={() => incrementCount(1)}>
      +1
    </button>
    <button class="button is-success" on:click={save}> Save </button>
    <button class="button is-danger" on:click={reset}> Reset </button>
  </div>
</div>

<style>
  .Module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
  }
  .Count {
    font-size: 2rem;
  }
</style>
