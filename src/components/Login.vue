<template>
    <div>
        <h1 class="mb-3">
            <i class="fa fa-sign-in"></i>
            Masuk
        </h1>

        <div class="card">
            <div class="card-body">
                <form @submit.prevent="onFormSubmit">
                    <div class="form-group">
                        <label for="username"> Nama Pengguna: </label>
                        <input
                            v-model="username"
                            placeholder="Nama Pengguna"
                            class="form-control"
                            :class="{'is-invalid': get(form_errors, 'username', false)}"
                            type="text">
                        <div
                            class="invalid-feedback"
                            v-if="get(form_errors, 'username', false)">
                            {{ get(form_errors, 'username[0].message', false) }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password"> Kata Sandi: </label>
                        <input
                            v-model="password"
                            placeholder="Nama Pengguna"
                            class="form-control"
                            :class="{'is-invalid': get(form_errors, 'password', false)}"
                            type="password">
                        <div
                            class="invalid-feedback"
                            v-if="get(form_errors, 'password', false)">
                            {{ get(form_errors, 'password[0].message', false) }}
                        </div>
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary">
                            Masuk
                            <i class="fa fa-sign-in"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import formMixin from '../mixins/form_mixin'
import auth from '../authentication'
import { ipcRenderer, remote } from 'electron'
import swal from 'sweetalert'
import events from '../events';

export default {
    mixins: [ formMixin ],

    mounted() {
        const window = remote.getCurrentWindow()

        window.restore()
        window.setSize(640, 480)
        window.setMenuBarVisibility(false)
        window.setResizable(false)
    },

    data() {
        return {
            username: null,
            password: null,
        }
    },

    methods: {
        onFormSubmit() {
            this.validateForm()
                .then(() => { this.logIn() })
                .catch(() => {})
        },

        logIn() {
            console.log("Test")
            auth.authenticate(this.form_data.username, this.form_data.password)
                .then(user => {
                    swal({
                        icon: 'success',
                        text: 'Anda berhasil masuk'
                    })
                    .then(() => {
                        remote.getCurrentWindow()
                            .setMenuBarVisibility(true)
                        remote.getCurrentWindow()
                            .setResizable(true)
                        remote.getCurrentWindow()
                            .maximize()
                        remote.getCurrentWebContents()
                            .send(events.LOG_IN)
                    })
                })
                .catch(error => {
                    swal({
                        icon: 'error',
                        text: 'Nama pengguna atau kata sandi salah.'
                    })
                })
        }
    },

    computed: {
        form_data: function() {
            return {
                username: this.username,
                password: this.password,
            }
        },

        form_validation_rules() {
            return {
                username: 'required',
                password: 'required',
            }
        }
    }
}
</script>