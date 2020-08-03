<template>
    <v-card>
        <v-btn color="primary" :disabled="loadingData" @click="loadDataTable">Recargar datos</v-btn>
        <v-btn color="primary" :disabled="Object.keys(selected).length === 0"
               @click="printDocumentCartagena({printItem: selected})" class="ml-6">Imprimir guia(s)
        </v-btn>
        <v-card-title>
            <v-text-field
                    v-model="search"
                    label="Buscar"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :search="search"
                v-model="selected"
                :headers="headers"
                :items="data"
                :single-select="singleSelect"
                item-key="id"
                show-select
                class="elevation-1"
        >
            <template v-slot:item.showMore="{ item }">
                <div class="container">
                    <v-btn icon text color="primary" @click="passingUserSelected({show: true, userSelected: item})">
                        <v-icon color="primary">
                            mdi-account-plus-outline
                        </v-icon>
                    </v-btn>
                </div>
            </template>
        </v-data-table>
        <ViewUser/>
        <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </template>
    </v-card>

</template>
<script>
    import ViewUser from "@/components/ViewUser";
    import vuex from 'vuex'
    import firebase from '../configFirebase'

    let db = firebase.firestore();
    export default {
        name: "OrdersCartagena",
        data() {
            return {
                search: '',
                singleSelect: false,
                noData: 'Aún no hay pedidos :(',
                data: [],
                expanded: [],
                selected: [],
                modal: false,
                singleExpand: false,
                dateEstimated: '',
                checked: false,
                user: [],
                loadingText: 'Obteniendo datos, por favor espere...',
                loadingData: true,
                headers: [
                    {
                        text: 'id:',
                        value: 'id'
                    },
                    {
                        text: 'Cédula: ',
                        value: 'identificationCard'
                    },
                    {
                        text: 'Nombre: ',
                        value: 'name',
                    },
                    {
                        text: 'Apellido: ',
                        value: 'lastName'
                    },
                    {
                        text: 'Teléfono: ',
                        value: 'phone'
                    },
                    {
                        text: 'Ciudad: ',
                        value: 'city'
                    }, {
                        text: 'Departamento: ',
                        value: 'departament'
                    },
                    {
                        text: 'Fecha de Pedido',
                        value: 'datePurchase'
                    },
                    {
                        text: '',
                        value: 'showMore'
                    },
                    {
                        text: '',
                        value: 'print'
                    }],
            }
        },
        components: {
            ViewUser
        },
        mounted() {
            this.loadDataTable();
        },
        created() {
            if (localStorage.getItem('user')) {
                this.user = JSON.parse(JSON.parse(localStorage.getItem('user')));
            }
        },
        methods: {
            ...vuex.mapMutations(['passingUserSelected', 'printDocumentCartagena']),
            formatDate: function (date) {
                let dayName = date.toLocaleString('es-MX', {weekday: 'long'});
                let day = date.getDate();
                let month = date.toLocaleString('es-MX', {month: 'long'});
                let year = date.getFullYear();
                return `${dayName[0].toUpperCase() + dayName.slice(1)}, ${day} de ${month} de ${year}`;
            },
            loadDataTable() {
                this.loadingData = !this.loadingData;
                this.data = [];
                let i = 0
                db.collection("ordersCartagena").get().then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        this.loadingData = false
                    } else {
                        querySnapshot.forEach((doc) => {
                            db.collection('ordersCartagena').get().then(querySnapshot => {
                                let data = doc.data();
                                data.datePurchase = this.formatDate(new Date(data.datePurchase.seconds * 1000));
                                data.id = i++
                                this.data.push(data);
                            });
                            this.loadingData = false;
                        });
                    }
                })
            },
        }
    }


</script>
<style scoped>

</style>