<template>
    <div>
        <h1 class="mb-3">
            <i class="fa fa-plus"></i>
            Tambah Pengguna Baru
        </h1>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>{{ config.app_name }}</a>
                </li>
                <li class="breadcrumb-item">
                    <a @click="$emit('change-page', 'user-index')" href="#">Pengguna</a>
                </li>
                <li class="breadcrumb-item">
                    <a>Tambah Pengguna Baru</a>
                </li>
            </ol>
        </nav>

        <div class="card">
            <div class="card-body">
                <form @submit="storeUser">
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
                        <label for="name">Nama Asli:</label>
                        <input v-model="name" placeholder="Nama Asli" class="form-control" 
                            :class="{'is-invalid': get(form_errors, 'name', false)}"
                            type="text">
                        <div
                            class="invalid-feedback"
                            v-if="get(form_errors, 'name', false)">
                            {{ get(form_errors, 'name[0].message', false) }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Kata Sandi:</label>
                        <input
                            v-model="password"
                            placeholder="Kata Sandi"
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
                            Tambah Pengguna Baru
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import formMixin from "../mixins/form_mixin";
import Config from "../config";
import DataType from "../data_type";
import Hash from "../hash";
import DB from "../database";
import indicative from "indicative";

export default {
    mixins: [formMixin],

    data() {
        return {
            username: null,
            name: null,
            password: null
        };
    },

    methods: {
        storeUser() {
            this.validate_form({
                success: () => {
                    DB.put({
                        _id: this.username,
                        type: DataType.user,
                        name: this.name,
                        password: Hash.make(this.password)
                    })
                    .then(result => {
                        swal({
                            icon: 'success',
                            text: 'Tindakan Berhasil',
                        })
                        .then(() => {
                            this.$emit('change-page', 'user-index')
                        })
                    })
                    .catch(error => {
                        swal({
                            icon: 'error',
                            text: 'Tindakan Gagal',
                        })
                    })
                }
            })
        }
    },

    computed: {
        form_data() {
            return {
                username: this.username,
                name: this.name,
                password: this.password
            };
        },

        form_validation_rules() {
            return {
                username: "required|alpha_numeric|min:8|max:20",
                name: "required",
                password: "required|min:8"
            };
        },

        config() {
            return Config;
        }
    }
};
</script>
