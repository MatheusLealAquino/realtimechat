<template>
  <q-page class="flex justify-center row q-pa-md">
    {{userName}} - {{userId}}
    <div style="width: 100%; max-width: 400px">
      <div v-for="(msg, index) in messages" :key="`message-${index}`">
        <q-chat-message
          :text="[msg.message]"
          :sent="msg.sent"
        />
      </div>
    </div>
    <div class="col-12">
      <q-input bottom-slots v-model="message" label="Message" counter>
        <template v-slot:append>
          <q-icon v-if="message !== ''" name="close" @click="message = ''" class="cursor-pointer" />
        </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="sendMessage()" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'PageIndex',
  data () {
    return {
      message: '',
      messages: [],
      socket: null,
      firstId: null
    }
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.user.name
      }
    },
    userId: {
      get () {
        return this.$store.state.user.id
      }
    }
  },
  methods: {
    validateInput () {
      return this.userName.length > 0 && this.message.length > 0
    },
    sendMessage () {
      this.getConnection()
      if (this.validateInput()) {
        const message = {
          id: '5e18af4be5988b1bdc9dd35b',
          user: this.userId,
          message: this.message
        }

        this.socket.emit('message', message)
        this.message = ''
      }
    },
    receivedMessage (message) {
      this.messages.push({
        sent: message.userId === this.userId,
        message: message.message
      })
    },
    getConnection () {
      this.socket = io('http://localhost:3000', { transports: ['websocket'], upgrade: false })

      this.socket.on('5e18af4be5988b1bdc9dd35b', message => {
        this.receivedMessage(message)
      })
    }
  },
  created () {
    this.getConnection()
  }
}
</script>
