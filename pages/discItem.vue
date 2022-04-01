<template>
<!-- Parámetros de la ficha -->
  <div
    v-bind:class="[state == 0 || state == 1 ? 'tablero' : 'tile']"
    v-bind:style="{
       //Cuando no está ocupado, entonces
      'background-color': state == 0 || state == 1 ? colors[state] : 'white',
      //Color para verificar si ya ganó el jugador 1/2
      'border': win ? 'solid 5px #000000' : 'solid 1.5px lightgrey'
    }"
    v-on:click="handleClick"
    >
  </div>
</template>

<script>
export default {
  name: 'disc-item',
  props: ['state', 'win', 'index'],
  data () {
    // Color 1 rojo - Color 2 amarillo
    return {
      colors: ['#FF0000', '#FFFF33']
    }
  },
  methods: {
    handleClick() {
      if (this.state == null) {
        this.$emit('disc-clicked', this.index);
      }
    }
  }
}
</script>

<style>
    /* Espacio del tablero */
  .tile {
    border-radius: 3.5vw;
    height: 7vw;
    width: 7vw;
    max-height: 80px;
    max-width: 80px;
    cursor: pointer;
  }
  /* Espacio ocupado del tablero */
  .tablero {
    border-radius: 3.5vw;
    height: 7vw;
    width: 7vw;
    max-height: 80px;
    max-width: 80px;
  }

</style>
