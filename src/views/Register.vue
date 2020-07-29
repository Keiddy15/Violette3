<template>
    <v-app class="main">
        <v-card class="cardForm2" elevation="20">
            <v-card-title>Registrate</v-card-title>
            <v-card-text>
                <form class="px-3" action="#" @submit.prevent="register">
                    <v-text-field
                            label="Nombre:"
                            v-model="name"
                            :rules="nameRules"
                            required>
                    </v-text-field>
                    <v-text-field
                            label="Apellido:"
                            v-model="lastName"
                            :rules="lastNameRules"
                            required>
                    </v-text-field>
                    <v-text-field
                            type="number"
                            label="Cedula:"
                            v-model="identificationCard"
                            :rules="identificationCardRules"
                            required>
                    </v-text-field>
                    <v-text-field
                            label="Email:"
                            v-model="email"
                            :rules="emailRules"
                            required>
                    </v-text-field>
                    <v-text-field
                            label="Contraseña:"
                            v-model="password"
                            :rules="passwordRules"
                            required
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            id="Contraseña"
                            @click:append="show = !show"
                    >
                    </v-text-field>
                    <v-card-actions class="justify-center">
                        <v-btn type="submit" color="purple white--text" block large>
                            Registrarme
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
    import firebase from '../configFirebase'

    let db = firebase.firestore();
    export default {
        name: "Register",
        data() {
            return {
                name: '',
                lastName: '',
                identificationCard: '',
                email: '',
                password: '',
                show: false,
                nameRules: [
                    v => !!v || 'Los nombres son requeridos.'
                ],
                lastNameRules: [
                    v => !!v || 'Los apellidos son requeridos.'
                ],
                identificationCardRules: [
                    v => !!v || 'La cédula es requerida.'
                ],
                passwordRules: [
                    v => !!v || 'La contraseña es requerida.'
                ],
                emailRules: [
                    v => !!v || 'El email es requerido.'
                ],


            }
        },
        methods: {
            register() {
                if (this.name && this.email && this.password) {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            db.collection('users').doc(user.user.uid).set({
                                name: this.name,
                                lastName: this.lastName,
                                identificationCard: this.identificationCard,
                                email: this.email,
                                admin: false
                            }).then(() => {
                                this.$router.push({name: 'Form'});
                            }).catch(error => {
                                console.log(error);
                            });
                        })
                        .catch(function (error) {
                            let errorCode = error.code;
                            let errorMessage = error.message;
                            console.log(errorCode);
                            console.log(errorMessage);
                        })
                }
            },
        }
    }
</script>

<style scoped>
    .cardForm2 {
        padding: 20px;
        width: 500px;
        margin: auto;
    }

    .main {
        background-color: rgb(153, 43, 174) !important;
    }
</style>