<template>
  <div id="app">
    <!-- Jugador -->
    <div class="header">Es el turno de: {{ playerNames[player] }}</div>

    <!-- Tablero -->
    <table>
      <tr v-for="(row, ridx) in boardConst">
        <td v-for="(col, cidx) in row">
          <disc-item
            v-bind:state="col"
            v-bind:win="winningDiscs[ridx][cidx]"
            v-bind:index="{ ridx: ridx, cidx: cidx }"
            v-on:disc-clicked="handleDisc"
          >
          </disc-item>
        </td>
      </tr>
    </table>

    <!-- Puntuación -->
    <div class="score pt-3">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <p class="title">{{this.player1.name}}</p>
              <br>
              <p class="subtitle">{{this.player1.score}}</p>
            </div>
            <div class="column">
              <p class="title">{{this.player2.name}}</p>
              <br>
              <p class="subtitle">{{this.player2.score}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      dimension: { x: 7, y: 6 },
      player: 0,
      boardConst: null,
      turn: 0,
      winningDiscs: null,
      playerNames: [],
      playersId: {},
      modalOpen: false,
      winner: null,
      player1: {},
      player2: {}
    };
  },
  mounted() {
    this.initializeBoard()
  },
  async created () {
    this.player1 = this.$cookies.get('user1')
    this.player1.score = 0
    this.player2 = this.$cookies.get('user2')
    this.player2.score = 0
    this.playerNames.push(this.player1.name)
    this.playerNames.push(this.player2.name)
  },
  methods: {
    setNames () {
      const names = [
        this.player1.name,
        this.player2.name
      ]
      return names
    },
    winMessage (winner) {
      this.$swal({
        title: '¡Has ganado!',
        text: 'El jugador ' + winner +  ' ha ganado la partida',
        button: false,
        timer: 3000
      })
    },
    switchPlayerMessage () {
      this.$swal({
        title: 'Cambio de jugador...',
        text: 'Intercambiando fichas...',
        button: false,
        icon: 'warning',
        timer: 3000
      })
    },
    async handleDisc(e) {
      // reconoce la columna donde el jugador desea colocar la pieza, una vez colocada cambia de jugador
      this.boardConst[e.ridx][e.cidx] = this.player;
      console.log(this.boardConst);
      const correctedArray = this.applyGravity(
        this.boardConst,
        this.dimension.x,
        this.dimension.y
      );
      this.boardConst = correctedArray;

      // Cambiar de jugador
      this.player = (this.player + 1) % 2;
      const result = this.checkWinCondition(
        this.boardConst,
        this.dimension.x,
        this.dimension.y
      );

      // Si un jugador gana
      if (result.win) {
        console.log(result)
        this.winner = this.playerNames[result.player];
        if(result.player == 0) {
          this.player1.score += 1
        } else {
          this.player2.score += 1
        }
        console.log(this.player1)
        this.winMessage(this.winner)
        await new Promise(r => setTimeout(r, 1500));
        await this.switchPlayerMessage()
        this.player = (result.player + 1) % 2;
        this.initializeBoard()
      }
    },
    initializeBoard() {
      let res = [],
        i,
        j;
      for (i = 0; i < this.dimension.y; i++) {
        res.push([]);
        for (j = 0; j < this.dimension.x; j++) {
          res[i].push(null);
        }
      }
      this.boardConst = res;
      // initialize winning discs
      res = [];
      for (i = 0; i < this.dimension.y; i++) {
        res.push([]);
        for (j = 0; j < this.dimension.x; j++) {
          res[i].push(false);
        }
      }
      this.winningDiscs = res;
    },
    checkWinCondition(arr, dimx, dimy) {
      let check1, check2, check3, i, j;

      check1 = this.horizontalWin(arr, dimx, dimy);
      if (check1.win) {
        return check1;
      } else {
        check2 = this.verticalWin(arr, dimx, dimy);
        if (check2.win) {
          return check2;
        } else {
          for (i = 0; i < dimy; i++) {
            for (j = 0; j < dimx; j++) {
              check3 = this.diagonalWin(i, j, dimx, dimy, arr);
              if (check3.win) {
                return check3;
              }
            }
          }
        }
      }

      return { win: false };
    },
    horizontalWin(arr, dimx, dimy) {
      let i, j, cnt, ply;
      for (i = 0; i < dimy; i++) {
        for (j = 0; j < dimx; j++) {
          if (j === 0) {
            ply = arr[i][j];
            cnt = 1;
          } else {
            if (ply === arr[i][j] && ply != null) {
              cnt = cnt + 1;
              if (cnt === 4) {
                return {
                  win: true,
                  player: ply,
                  discs: [
                    { row: i, col: j - 3 },
                    { row: i, col: j - 2 },
                    { row: i, col: j - 1 },
                    { row: i, col: j },
                  ],
                };
              }
            } else {
              ply = arr[i][j];
              cnt = 1;
            }
          }
        }
      }
      return { win: false };
    },
    verticalWin(arr, dimx, dimy) {
      let i, j, cnt, ply;
      for (i = 0; i < dimx; i++) {
        for (j = 0; j < dimy; j++) {
          if (j === 0) {
            ply = arr[j][i];
            cnt = 1;
          } else {
            if (ply === arr[j][i] && ply != null) {
              cnt = cnt + 1;
              if (cnt === 4) {
                return {
                  win: true,
                  player: ply,
                  discs: [
                    { row: j - 3, col: i },
                    { row: j - 2, col: i },
                    { row: j - 1, col: i },
                    { row: j, col: i },
                  ],
                };
              }
            } else {
              ply = arr[j][i];
              cnt = 1;
            }
          }
        }
      }
      return { win: false };
    },
    diagonalWin(row, col, dimx, dimy, arr) {
      let maxCol = dimx - 1;
      let maxRow = dimy - 1;
      let ply;
      if (row + 3 <= maxRow && col + 3 <= maxCol) {
        ply = arr[row][col];

        if (
          arr[row + 1][col + 1] === ply &&
          arr[row + 2][col + 2] === ply &&
          arr[row + 3][col + 3] === ply &&
          ply !== null
        ) {
          return {
            win: true,
            player: ply,
            discs: [
              { row: row, col: col },
              { row: row + 1, col: col + 1 },
              { row: row + 2, col: col + 2 },
              { row: row + 3, col: col + 3 },
            ],
          };
        }
      }

      if (row + 3 <= maxRow && col - 3 >= 0) {
        ply = arr[row][col];

        if (
          arr[row + 1][col - 1] === ply &&
          arr[row + 2][col - 2] === ply &&
          arr[row + 3][col - 3] === ply &&
          ply !== null
        ) {
          return {
            win: true,
            player: ply,
            discs: [
              { row: row, col: col },
              { row: row + 1, col: col - 1 },
              { row: row + 2, col: col - 2 },
              { row: row + 3, col: col - 3 },
            ],
          };
        }
      }
      return false;
    },
    applyGravity(arr, dimx, dimy) {
      var row, col;
      var res = arr.slice();
      for (col = 0; col < dimx; col++) {
        for (row = 0; row < dimy; row++) {
          if (row < dimy - 1) {
            if (res[row][col] != null && res[row + 1][col] == null) {
              res[row + 1][col] = res[row][col];
              res[row][col] = null;
            }
          }
        }
      }
      return res;
    },
  },
};
</script>

<style>
table,
th,
td {
  border: 2px solid #0066CC;
  border-collapse: collapse;
  background-color: #0066CC;
}
table {
  margin: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: darkslategrey;
  margin-top: 60px;
}

.header {
  font-size: 4vw;
  margin-bottom: 10px;
}

.backdrop {
  position: absolute;
  height: 50vh;
  width: 50vw;
  background-color: lightgrey;
  opacity: 0.5;
  top: 0;
  left: 0;
}

.modal {
  position: absolute;
  top: 0;
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
