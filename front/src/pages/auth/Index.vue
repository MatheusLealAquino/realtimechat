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
          v-model="email"
          :label="`${$t('label.email')} *`"
          :rules="[ val => val && val.length > 0 || $t('rules.something')]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
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
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.email = null
      this.password = null
    }
  }
}
</script>
