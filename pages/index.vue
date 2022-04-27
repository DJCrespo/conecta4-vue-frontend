<template>
<div>
  <br>
  <h1 class="title has-text-centered">Modos de juego</h1>

  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column has-text-centered">
            <nuxt-link to="register">
              <div class="card">
              <div class="card-content">
                  <h1 class="title">1 vs 1</h1>
                  <span class="tag is-success">Disponible</span>
                </div>
            </div>
            </nuxt-link>
          </div>
          <div class="column has-text-centered">
             <nuxt-link to="register">
              <div class="card">
              <div class="card-content">
                  <h1 class="title">1 vs IA</h1>
                  <span class="tag is-warning">BETA</span>
                </div>
            </div>
            </nuxt-link>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  }
}
</script>
