<template>
    <div id="app">
        <v-app class="main">
            <v-card class="main">
                <v-card-title class="welcomeTitle" style="letter-spacing: 2px">
                    <img
                            src="https://firebasestorage.googleapis.com/v0/b/violette-cartagena.appspot.com/o/Logo.png?alt=media&token=1fb75a14-79f6-4ff3-87b0-a6f9d96149fc"
                            height="70px"
                            class="pr-5"
                    >
                    <h4>Violette - Sports Wear</h4>
                </v-card-title>
            </v-card>
            <v-form v-model="valid">
                <v-card elevation="15" color="#FFF" raised class="cardForm">
                    <v-alert
                            border="bottom"
                            color="#E761FF"
                            dismissible
                            class="white--text"
                    >
                        Recuerde rellenar todos los campos del formulario.
                    </v-alert>
                    <v-alert type="error" v-if="validationError">Por favor, verifique los campos.
                    </v-alert>
                    <v-alert type="error" v-if="sendingError" dismissible>La información del pedido no pudo ser
                        enviada, intetelo de nuevo.
                    </v-alert>
                    <v-col cols="12" sm="12" md="12">
                        <v-row class="rowForm">
                            <v-text-field
                                    label='Nombres:'
                                    v-model="name"
                                    :rules="namesRules"
                                    required
                                    outlined
                                    clearable
                                    class="fields"
                            >
                            </v-text-field>
                            <v-text-field
                                    label='Apellidos:'
                                    v-model="lastName"
                                    :rules="lastNameRules"
                                    required
                                    outlined
                                    clearable
                                    class="fields"
                            >
                            </v-text-field>

                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-row class="rowForm">
                            <v-text-field
                                    label="Celular:"
                                    v-model='phone'
                                    class="fields pr-10"
                                    required
                                    outlined
                                    clearable
                                    :rules="phoneRules"
                            ></v-text-field>
                            <div class="radio">
                                <label>Tipo de residencia:</label>
                                <div class="pr-20">
                                    <label class="pr-2">
                                        <input type="radio" v-model="radio.option" value="R"> Conjunto residencial
                                    </label>
                                    <label class="pr-2">
                                        <input type="radio" v-model="radio.option" value="H"> Casa
                                    </label>
                                </div>
                            </div>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-row class="rowForm">

                            <v-text-field
                                    v-if="radio.option === 'R' || radio.option === 'H'"
                                    label="Dirección:"
                                    v-model="address"
                                    required
                                    outlined
                                    :rules="addressRules"
                                    clearable
                                    class="fields"
                            ></v-text-field>
                            <v-text-field
                                    v-if="radio.option === 'H' || radio.option === 'R'"
                                    label="Barrio:"
                                    v-model='neighborhood'
                                    required
                                    outlined
                                    :rules="neighborhoodRules"
                                    clearable
                                    class="fields"
                            ></v-text-field>
                        </v-row>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                        <v-row class="rowForm">
                            <v-text-field
                                    v-if="radio.option === 'R'"
                                    label="Número de casa o aparatamento:"
                                    v-model='houseNumber'
                                    required
                                    outlined
                                    :rules="houseNumberRules"
                                    clearable
                                    class="fields"
                            ></v-text-field>
                            <v-text-field
                                    v-if="radio.option === 'R'"
                                    label="Torre:"
                                    v-model='tower'
                                    required
                                    outlined
                                    clearable
                                    class="fields"
                            ></v-text-field>
                        </v-row>

                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-row class="rowForm">
                                <v-textarea
                                        v-if="radio.option === 'R' || radio.option === 'H' "
                                        v-model='referencePoint'
                                        :rules="referencePointRules"
                                        required
                                        outlined
                                        clearable
                                        name="input-7-4"
                                        label="Punto de referencia"
                                        rows="3"
                                        maxlength="140"
                                ></v-textarea>
                        </v-row>
                    </v-col>
                    <div class="text-center">
                        <v-btn class="purple  white--text" :loading="loadingSend" block large @click="submit">Enviar
                        </v-btn>
                    </div>
                </v-card>
            </v-form>
        </v-app>
    </div>
</template>

<script>
    import firebase from '../configFirebase'

    let db = firebase.firestore();
    export default {
        name: "Form",
        data() {
            return {
                valid: false,
                name: '',
                lastName: '',
                phone: '',
                houseNumber: '',
                tower: '',
                neighborhood: '',
                address: '',
                referencePoint: '',
                validationError: false,
                sendingError: false,
                loadingSend: false,
                user: [],
                id: 0,
                radio: {
                    option: ''
                },
                namesRules: [
                    v => !!v || 'Los nombres son requeridos.'
                ],
                lastNameRules: [
                    v => !!v || 'Los apellidos son requeridos.'
                ],
                neighborhoodRules: [
                    v => !!v || 'El barrio es requerido.'
                ],
                addressRules: [
                    v => !!v || 'La dirección es requerida.'
                ],
                phoneRules: [
                    v => !!v || 'El celular es requerido.'
                ],
                houseNumberRules: [
                    v => !!v || 'El número de casa es requerido.'
                ],
                referencePointRules: [
                    v => !!v || 'El punto de referencia es requerido.'
                ],

            }
        },
        methods: {
            submit() {
                this.id = db.collection('ordersCartagena').doc();
                this.sendingError = false;
                this.validationError = false;
                let orders = db.collection('ordersCartagena');
                let H = (
                    this.name !== '' && this.lastName !== '' &&
                    this.phone !== '' && this.address !== '' &&
                    this.neighborhood !== '' && this.referencePoint !== ''
                )
                let R = (
                    this.name !== '' && this.lastName !== '' &&
                    this.phone !== '' && this.address !== '' &&
                    this.houseNumber !== '' && this.referencePoint !== '' &&
                    this.neighborhood !== ''
                )
                if (H) {
                    this.loadingSend = true

                    orders.add({
                        id: this.id,
                        datePurchase: new Date(),
                        name: this.name,
                        lastName: this.lastName,
                        phone: this.phone,
                        address: this.address,
                        neighborhood: this.neighborhood,
                        referencePoint: this.referencePoint
                    }).then(() => {
                        setTimeout(() => {
                            this.$router.push({name: 'FinishedForm'});
                        }, 2000);
                    }).catch(() => {
                        this.sendingError = true;
                        this.validationError = false;
                    });
                    this.validationError = false;
                } else if (R) {
                    this.loadingSend = true
                    orders.add({
                        id: this.id,
                        datePurchase: new Date(),
                        name: this.name,
                        lastName: this.lastName,
                        phone: this.phone,
                        address: this.address,
                        houseNumber: this.houseNumber,
                        tower: this.tower,
                        referencePoint: this.referencePoint
                    }).then(() => {
                        setTimeout(() => {
                            this.$router.push({name: 'FinishedForm'});
                        }, 2000);
                    }).catch(() => {
                        this.sendingError = true;
                        this.validationError = false;
                    });
                    this.validationError = false;
                } else {
                    this.validationError = true;
                }
            },
            login() {
                this.$router.push({name: 'Login'});
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .welcomeTitle {
        font-family: 'Pacifico', cursive;
        font-size: 28px !important;
        color: white !important;
    }

    .main {
        background-color: rgb(153, 43, 174) !important;
    }

    .cardForm {
        padding: 30px;
        margin: 20px;
    }

    @media screen and (max-width: 425px) {
        .cardForm {
            margin: 10px 5px 5px 5px !important;
        }
    }

    @media screen and (min-width: 1440px) {
        .cardForm {
            margin-right: 5vw !important;
            margin-left: 5vw !important;
        }
    }

    .radio {
        padding-right: 365px;
    }


</style>