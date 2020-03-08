<template>
  <q-page class="flex justify-center row q-pa-md">
    <div class="col-md-6 col-sm-12 q-pa-sm">
        <div class="text-subtitle1 text-weight-bold text-center q-mb-md">Sign up</div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-mb-xl"
        >
          <q-input
            filled
            v-model="signup.name"
            :label="`${$t('label.name')} *`"
            :rules="[ val => val && val.length > 0 || $t('rules.something')]"
          />
          <q-input
            filled
            v-model="signup.email"
            :label="`${$t('label.email')} *`"
            :rules="[ val => val && val.length > 0 || $t('rules.something')]"
          />

          <q-input
            filled
            type="password"
            v-model="signup.password"
            :label="`${$t('label.password')} *`"
            :rules="[ val => val && val.length > 0 || $t('rules.something')]"
          />

          <div class="row q-mb-sm">
            <div class="col-12">
              <q-btn :label="$t('button.submit')" class="float-right" type="submit" color="primary"/>
            </div>
          </div>

          <div class="q-mb-sm text-center">
            <span class="text-weight-bold">{{$t('haveAccount')}} </span><a href="#/auth/">{{$t('button.login')}}</a>
          </div>
        </q-form>
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
import { UserService } from '../../resource'

export default {
  name: 'Signup',
  meta: {
    title: 'Sign up',
    titleTemplate: title => `${title} - Realtime Chat`
  },
  data () {
    return {
      signup: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await UserService.create('', this.signup)
        await this.$store.dispatch('user/login', this.signup)
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
      this.signup.name = null
      this.signup.email = null
      this.signup.password = null
    }
  }
}
</script>
