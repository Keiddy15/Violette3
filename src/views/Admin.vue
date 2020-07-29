<template>
    <v-app class="main">
        <v-card class="main">
            <v-card-title class="welcomeTitle d-flex justify-space-around" style="letter-spacing: 2px">
                <img
                        src="https://firebasestorage.googleapis.com/v0/b/violette-efc12.appspot.com/o/Logo.png?alt=media&token=fb861ad5-0d17-4aa9-a11a-e4bf9ef01316"
                        height="70px"
                        class="pr-5"
                >
                <h4>Violette - Sports Wear</h4>
                <v-btn class="mx-2" fab dark small color="primary" @click="logOut">
                    <v-icon dark>mdi-logout</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-card class="cardForm" elevation="20">
            <v-tabs
                    fixed-tabs
                    background-color="primary"
                    dark
                    show-arrows
            >
                <v-tab>
                    Historial de pedidos
                </v-tab>
                <v-tab-item>
                    <v-card elevation="15" color="#FFF" raised class="cardForm">
                        <v-card-text class="textUser">
                            <h1 style="letter-spacing: 2px; line-height: 40px">Revisa el historial de los pedidos</h1>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <Orders/>
                            <v-spacer></v-spacer>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-app>
</template>

<script>
    import Orders from "@/components/Orders";
    import firebase from '../configFirebase'

    export default {
        name: "Admin",
        data() {
            return {
                iniciado: '',
                logueado: false,
            }
        },
        components: {
            Orders
        },
        mounted() {
            if (localStorage.getItem('user')) {
                this.iniciado = "Tu cuenta";
                this.logueado = false;
                this.user = JSON.parse(JSON.parse(localStorage.getItem('user')));
            } else {
                this.iniciado = "Ingresar";
                this.logueado = true;
            }
        },
        methods: {
            logOut() {
                localStorage.removeItem('user');
                localStorage.removeItem('userExtraData');
                firebase.auth().signOut()
                    .then(() => {
                        this.$router.push({name: 'Formulario'});
                        this.$router.go();
                    });
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

    .textUser {
        text-align: center;
        color: black !important;
    }
</style>