<template>
  <div 
    v-bind:class="[state == 0 || state == 1 ? 'tileclicked' : 'tile']"
    v-bind:style="{
      'background-color': state == 0 || state == 1 ? colors[state] : 'white',
      'border': win ? 'solid 1.5px #e43437' : 'solid 1.5px lightgrey'
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
    return {
      colors: ['#CC3333', '#FFFF33']
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
  .tile {
    border-radius: 3.5vw;
    height: 10vw;
    width: 10vw;
    max-height: 50px;
    max-width: 50px;
    cursor: pointer;
  }
  .tileclicked {
    border-radius: 3.5vw;
    height: 8vw;
    width: 8vw;
    max-height: 50px;
    max-width: 50px;
  }

</style>
