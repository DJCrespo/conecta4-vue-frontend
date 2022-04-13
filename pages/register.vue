<template>
  <div>
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
        <div class="column is-8 is-offset-2">
          <div class="card">
            <div class="card-content">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                
                <BInputWithValidation
                    v-model="form.name"
                    type="text"
                    label-position="on-border"
                    name="Nombre"
                    placeholder="Ingresa tu nombre"
                    label="Nombre"
                />

                <b-button
                  type="is-success"
                  native-type="submit"
                  outlined
                  rounded
                  :loading="loading"
                  @click="handleSubmit(submit)"
                />
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
    name: 'register',
    data () {
        return {
            form: {},
            success: false
        }
    },
    methods: {
        resetForm () {
            this.form = {
                name: ''
            }
        },
        handleSubmit () {

        }
    }
}
</script>