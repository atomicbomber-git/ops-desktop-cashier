<template>
    <div>
        <h1 class="mb-3">
            <i class="fa fa-users"></i>
            Pengguna
        </h1>

        <div class="d-flex justify-content-end my-3">
            <button class="btn btn-primary btn-sm">
                Tambah Pengguna Baru
            </button>
        </div>

        <table class="table table-sm table-bordered">
            <thead class="thead thead-dark">
                <tr>
                    <th> # </th>
                    <th> Nama Pengguna </th>
                    <th> Nama Asli </th>
                    <th class="text-center"> Kendali </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>  </td>
                    <td>  </td>
                    <td>  </td>
                    <td>  </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import db from '../database'

export default {
    mounted() {
        console.log(db.info())
    }
}
</script>

<style>

</style>
