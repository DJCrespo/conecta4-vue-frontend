<template>
  <div id="app">
    <h1 class="header">Conecta 4 - Equipo #7</h1>
    <div class="header">
     Turno del jugador color {{ nombreJugadores[jugador] }}
    </div>
    <!-- Tablero -->
    <table>
      <tr v-for="(row, ridx) in bordConst">
        <td v-for="(col, cidx)  in row">
          <disc-item
            v-bind:state="col"
            v-bind:win="winningDiscs[ridx][cidx]"
            v-bind:index="{ridx: ridx, cidx: cidx}"
            v-on:disc-clicked="handleDisc"
            >
            </disc-item>
        </td>
      </tr>
    </table>

    <!-- Modal para indicar quien fue el ganador de la partida -->
    <div v-if="modalOpen">
      <div class="backdrop"></div>
      <div class="modal">
        <div class="modalcontent">
         ¡Jugador {{ winner }} ganó la partida!
          <button v-on:click="closeModal">Comenzar otra partida</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Vue from 'vue'
import discItem from './discItem.vue'

export default {
  name: 'app',
  components: { discItem },
  data () {
    return {
      dimension: {x: 7, y: 6},
      jugador: 0,
      bordConst: null,
      winningDiscs: null,
      nombreJugadores: ['rojo', 'amarillo'],
      modalOpen: false,
      winner: null
    }
  },
  mounted () {
    this.initializeBord();
  },
  methods: {
    closeModal() {
      // Al cerrar el modal se reinicia la partida
      this.initializeBord();
      this.modalOpen = false;
    },
    initializeBord () {
    var res = [], i, j;
    // initialize bord constellation
    for (i = 0; i < this.dimension.y; i++) {
      res.push([]);
      for (j = 0; j < this.dimension.x; j++) {
        res[i].push(null);
      }
    }
    this.bordConst = res;
    // initialize winning discs
    res = [];
    for (i = 0; i < this.dimension.y; i++) {
      res.push([]);
      for (j = 0; j < this.dimension.x; j++) {
        res[i].push(false);
      }
    }
    this.winningDiscs = res;
    }
  }
}
</script>

<style>
table, th, td {
    border: 2px solid #b3b3b3;
    border-collapse: collapse;
    background-color: lightgrey;
}
table {
  margin: auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: darkslategrey;
  margin-top: 60px;
}

.header {
  font-size: 2vw;
  margin-bottom: 5px;
}

.backdrop {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: lightgrey;
  opacity: 0.5;
  top: 0;
  left: 0;
}

.modal {
  position: absolute;
  top: 30px;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modalcontent {

  margin-left: auto;
  margin-right: auto;
  /*margin-top: 40vh;*/
  background-color: white;
  width: 50vw;
  opacity: 1;
  height: 35px;
  padding-top: 10px;
  border-radius: 2px;
  border: solid 1.5px grey;
}

button {
  background-color: grey;
  border: solid 1px;
  border-radius: 2px;
  outline: none;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

</style>
