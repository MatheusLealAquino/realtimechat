<template>
  <q-page class="flex justify-center row q-pa-md">
    <div class="col-md-5 col-sm-12 q-pa-sm">
      <div class="q-mb-xl">
        <div class="text-subtitle1 text-weight-bold text-center q-mb-md">To continue, make login.</div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-mb-xl"
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

          <div class="row q-mb-sm">
            <div class="col-12">
              <q-btn :label="$t('button.login')" class="float-right" type="submit" color="primary"/>
            </div>
          </div>

          <div class="q-mb-sm text-center">
            <a href="#/auth/forgot-password">{{$t('forgotPassword')}}</a>
          </div>
        </q-form>
        <hr>
      </div>

      <div>
        <div class="text-subtitle1 text-weight-bold text-center">{{ $t('dontHaveAccount') }}</div>
        <br>
        <q-btn outline rounded color="blue-grey" class="full-width" :label="$t('button.signUp')" to="/auth/signup"/>
      </div>
    </div>
  </q-page>
</template>

<style>
  a {
    text-decoration: none;
    color: dodgerblue;
  }
  a:visited {
    color: dodgerblue;
  }
</style>

<script>
export default {
  name: 'PageIndex',
  meta: {
    title: 'Login',
    titleTemplate: title => `${title} - Realtime Chat`
  },
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
