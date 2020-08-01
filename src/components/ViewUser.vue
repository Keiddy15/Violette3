<template>
    <div id="slot">
        <v-dialog v-model="dialogUserSelected" persistent max-width="800px"
                  transition="dialog-bottom-transition">
            <v-card>
                <v-card-title>
                    <span class="headline">Datos de usuario</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row style="margin: 0 10px">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Nombres:" readonly
                                              v-model="userSelected.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Apellidos:" readonly
                                              v-model="userSelected.lastName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Cédula" readonly type="number"
                                              v-model="userSelected.identificationCard"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Ciudad:" readonly v-model="userSelected.city"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Departamento:" readonly
                                              v-model="userSelected.departament"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Teléfono:"
                                              readonly
                                              type="number"
                                              v-model="userSelected.phone"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Dirección"
                                        v-model="userSelected.address"
                                        readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Barrio:" v-model="userSelected.neighborhood"
                                              readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Número de casa o apartamento:" readonly
                                              v-model="userSelected.houseNumber"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Torre:" readonly
                                              v-model="userSelected.tower"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Lugar de entrega:" readonly
                                              v-model="userSelected.placeDelivery"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-textarea
                                        label="Punto de referencia:" readonly
                                        v-model="userSelected.referencePoint"
                                        rows="3"
                                >
                                </v-textarea>
                            </v-col>


                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="passingUserSelected({userSelected: [], show: false})" color="primary" block>
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import vuex from 'vuex'
    import {mapFields} from 'vuex-map-fields'

    export default {
        name: "ViewUser",
        computed: {
            ...mapFields(['userSelected', 'dialogUserSelected'])
        },
        methods: {
            ...vuex.mapMutations(['passingUserSelected'])
        }
    }
</script>

<style scoped>
</style>