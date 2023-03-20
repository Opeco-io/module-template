<script>
  import moment from "moment"

  export let module

  let interval

  $: duration = moment.duration(module.state.timer, "seconds")

  const incrementTimer = (inc) => (module.state.timer += inc)
  const clearTimes = () => {
    module.store.times = []
  }
  const save = () => {
    if (module.store.times.length > 5) {
      module.store.times = [...module.store.times.slice(1), module.state.timer]
    } else {
      module.store.times = [...(module.store.times || []), module.state.timer]
    }
  }

  module.init(() => ({
    timer: 0,
  }))
  module.on("mount", () => {
    interval = setInterval(() => incrementTimer(1), 1000)
  })
  module.on("destroy", () => {
    clearTimeout(interval)
  })
</script>

<div class="Timer">
  <p class="Time has-text-info">
    {duration.hours()}:{duration.minutes()}:{duration.seconds()}
  </p>
  <div>
    <button class="button is-success" on:click={save}> Save </button>
    <button class="button is-danger" on:click={clearTimes}> Clear </button>
  </div>

  <div class="TimeList">
    {#each module.store.times || [] as time}
      {#each [moment.duration(time, "seconds")] as t}
        <p class="Time">
          {t.hours()}:{t.minutes()}:{t.seconds()}
        </p>
      {/each}
    {/each}
  </div>
</div>

<style>
  .Timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    border: 1px solid #dedede;
  }
  .Time {
    font-size: 2rem;
  }
</style>
