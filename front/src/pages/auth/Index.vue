<template>
  <q-page class="flex row q-pa-md">
    <div class="col-12">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="login.email"
          :label="`${$t('label.email')} *`"
          :rules="[ val => val && val.length > 0 || $t('rules.something')]"
        />

        <q-input
          filled
          type="password"
          v-model="login.password"
          :label="`${$t('label.password')} *`"
          :rules="[ val => val && val.length > 0 || $t('rules.something')]"
        />

        <div>
          <q-btn :label="$t('button.submit')" type="submit" color="primary"/>
          <q-btn :label="$t('button.reset')" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      login: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$store.dispatch('user/login', this.login)
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'Login realizado com sucesso!'
        })
        this.$router.push('/home')
      } catch (err) {
        this.$q.notify({
          color: 'red-10',
          textColor: 'white',
          icon: 'error',
          message: 'Não foi possível realizar login!'
        })
      }
    },
    onReset () {
      this.login.email = null
      this.login.password = null
    }
  }
}
</script>
