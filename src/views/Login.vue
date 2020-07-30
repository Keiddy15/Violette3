<template>
    <v-app class="main">
        <v-card class="cardForm2" elevation="10">
            <v-card-title>¡Ingresa ya a #Violette!</v-card-title>
            <v-card-text>
                <v-alert type="error" v-model="alertVerified" dismissible>No ha activado su cuenta, por favor, revise su
                    correo electronico.
                </v-alert>
                <v-alert type="error" v-model="alertNoData" dismissible>Por favor, rellene los campos
                    correspondientes.
                </v-alert>
                <v-alert type="error" v-model="alertUserPasswordIncorrect" dismissible>Contraseña incorrecta, por favor,
                    revise de nuevo.
                </v-alert>
                <v-alert type="warning" v-model="alertNotUser" dismissible>El usuario ingresado, no se encuentra en
                    nuestros registros.
                </v-alert>
                <v-form class="px-3" @submit.prevent="login">
                    <v-text-field
                            label="Email:"
                            v-model="email"
                            required
                            :rules="emailRules">
                    </v-text-field>
                    <v-text-field
                            label="Contraseña:"
                            v-model="password"
                            :rules="passwordRules"
                            required
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                    >
                    </v-text-field>
                    <v-card-actions class="justify-center">
                        <v-btn type="submit" color="purple white--text" block :loading="loadingButton" large>
                            Ingresar
                        </v-btn>

                    </v-card-actions>
                    <!--<v-card-actions class="justify-center">
                        <v-btn @click="register" color="purple white--text" block :loading="loadingButton" large>
                            ¿No te has registrado?
                        </v-btn>
                    </v-card-actions>-->

                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
    import firebase from '../configFirebase'

    let db = firebase.firestore();
    export default {
        name: "Login",
        data() {
            return {
                alertVerified: false,
                alertNoData: false,
                alertUserPasswordIncorrect: false,
                alertNotUser: false,
                email: '',
                password: '',
                show: false,
                loadingButton: false,
                passwordRules: [
                    v => !!v || 'La contraseña es requerida.'
                ],
                emailRules: [
                    v => !!v || 'El email es requerido.'
                ],


            }
        },
        methods: {
            login() {
                if (this.email && this.password) {
                    this.alertNoData = false;
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            this.save(user);
                            this.loadingButton = true;
                        })
                        .catch((error) => {
                            switch (error.code) {
                                case 'auth/wrong-password': {
                                    this.alertUserPasswordIncorrect = true;
                                    break;
                                }
                                case 'auth/user-not-found': {
                                    this.alertNotUser = true;
                                    break;
                                }
                            }
                        })
                } else {
                    this.alertNoData = true;
                }
            },
            save(user) {
                db.collection('users').doc(user.user.uid).get().then((doc) => {
                    switch (doc.data().admin) {
                        case true: {
                            setTimeout(() => {
                                this.$router.push({name: 'Admin'});
                            }, 2000);
                            break;
                        }
                        case false: {
                            setTimeout(() => {
                                this.$router.push({name: 'Form'});
                            }, 2000);
                            break;
                        }
                    }
                });
            },
            register (){
                this.$router.push({name: 'Register'});
            }
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