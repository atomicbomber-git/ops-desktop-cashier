<template>
    <div>
        <h1 class="mb-3">
            <i class="fa fa-users"></i>
            Pengguna
        </h1>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a> {{ config.app_name }} </a>
                </li>
                <li class="breadcrumb-item">
                    <a> Pengguna </a>
                </li>
            </ol>
        </nav>

        <div class="d-flex justify-content-end my-3">
            <button
                @click="$emit('change-page', 'user-create')"
                class="btn btn-primary btn-sm"
            >Tambah Pengguna Baru</button>
        </div>

        <table class="table table-sm table-bordered">
            <thead class="thead thead-dark">
                <tr>
                    <th class="text-center">#</th>
                    <th>Nama Pengguna</th>
                    <th>Nama Asli</th>
                    <th class="text-center">Kendali</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(user, index) in users" :key="user._id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ user._id }}</td>
                    <td>{{ user.name }}</td>
                    <td class="text-center">
                        <button @click="onDeleteUserButtonClick" class="btn btn-sm btn-danger">
                            Hapus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import Config from '../config'
import db from '../database'
import swal from 'sweetalert'

export default {
    mounted() {
        /* Load all users */
        db.find({
            selector: {
                type: "user"
            }
        }).then(result => {
            this.users = result.docs;
        });
    },

    data() {
        return {
            users: []
        };
    },

    methods: {
        swal,

        onDeleteUserButtonClick() {
            swal({
                icon: 'warning',
                dangerMode: true,
                text: 'Apakah Anda yakin Anda ingin menghapus data ini?'
            })
            .then(ok => {
                if (ok) {
                    
                }
            })
        }
    },

    computed: {
        config() {
            return Config
        }
    }
};
</script>

<style>
</style>
