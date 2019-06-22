<template>
    <div>
        <h1 class="mb-3">
            <i class="fa fa-plus"></i>
            Tambah Pengguna Baru
        </h1>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a> {{ config.app_name }} </a>
                </li>
                <li class="breadcrumb-item">
                    <a @click="$emit('change-page', 'user-index')" href="#">
                        Pengguna
                    </a>
                </li>
                <li class="breadcrumb-item">
                    <a> Tambah Pengguna Baru </a>
                </li>
            </ol>
        </nav>

        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label for="username"> Nama Pengguna: </label>
                    <input v-model="username" class="form-control" type="text">
                </div>

                <div class="form-group">
                    <label for="name"> Nama Asli: </label>
                    <input v-model="name" class="form-control" type="text">
                </div>

                <div class="form-group">
                    <label for="password"> Kata Sandi: </label>
                    <input v-model="password" class="form-control" type="text">
                </div>

                <div class="d-flex justify-content-end">
                    <button @click="storeUser" class="btn btn-primary">
                        Tambah Pengguna Baru
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Config from '../config'
import DataType from '../data_type'
import Hash from '../hash'
import DB from '../database'

export default {
    data() {
        return {
            username: null,
            name: null,
            password: null,
        }
    },

    methods: {
        storeUser() {
            DB.put({
                _id: this.username,
                type: DataType.user,
                name: this.name,
                password: Hash.make(this.password),
            })
            .then(result => {
                console.log(result)
            })
        }
    },

    computed: {
        config() {
            return Config
        },

        error_messages() {
            return {
                ...(this.username ? { username: "Kolom ini wajib diisi." } : {}),
                ...(this.password ? { password: "Kolom ini wajib diisi." } : {}),
                ...(this.name ? { name: "Kolom ini wajib diisi." } : {}),
            }
        },
    }
}
</script>
