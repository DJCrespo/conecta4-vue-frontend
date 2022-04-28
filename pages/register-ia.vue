<template>
  <div>

    <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="false">
      <b-icon
        pack="fas"
        icon="sync-alt"
        size="is-large"
        custom-class="fa-spin"
      ></b-icon>
    </b-loading>

    <div class="container has-text-centered">
      <br />
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <div class="card">
            <div class="card-content">
              <h1 class="title">Registro de participantes</h1>
              <h2 class="subtitle">
                Podrás ver tu puntuacion en el apartado "Puntuaciones"
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <div class="card">
            <div class="card-content">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                
                <div class="columns">
                  <div class="column">
                    <BInputWithValidation
                      v-model="form1.name"
                      required
                      type="text"
                      label-position="on-border"
                      name="Nombre"
                      placeholder="Ingresa tu nombre"
                      label="Jugador HUMANO"
                    />
                  </div>
                </div>

                <div class="columns">
                  <div class="column has-text-centered">
                    <b-button
                    size="is- "
                      type="is-success"
                      native-type="submit"
                      outlined
                      rounded
                      :loading="loading"
                      @click="handleSubmit(submit)"
                    >
                      ¡Comenzar!
                    </b-button>
                  </div>
                </div>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
    name: 'register-ia',
    data () {
        return {
            form1: {},
            form2: {},
            success: false,
            loading: false,
            isFullPage: true
        }
    },
    created() {
      this.resetForms()
    },
    methods: {
        resetForms () {
            this.form1 = {
                name: ''
            }
            this.form2 = {
                name: ''
            }
        },
        successMessage () {
          this.$swal({
            title: '¿Listo?',
            button: "¡A jugar!"
          })
        },
        async submit () {
          this.form1.color_disc = 'yellow'
          this.form2.name = 'IA'
          this.form2.color_disc = 'red'
          try {
            this.loading = true
            console.log('player 1')
            const res1 = await this.$store.dispatch('modules/users/createUser', {
              data: this.form1
            })
            /*console.log('player 2')
            const res2 = await this.$store.dispatch('modules/users/createUser', {
              data: this.form2
            })*/
            console.log(res1.data)
            //console.log(res2.data)
            const user1 = {
              name: this.form1.name,
              id: res1.data
            }
            const user2 = {
              name: this.form2.name,
              //id: res2.data
            }
            await this.$cookies.set('user1', user1)
            await this.$cookies.set('user2', user2)
            this.loading = false
            this.successMessage()
            this.navigateTo()
          } catch (error) {
            console.log(error)
          } finally {
            this.loading = false
          }
        },
        navigateTo (id1, id2) {
          console.log(id1)
          this.$router.push({ path: '/board-ia' })
        }
    }
}
</script>