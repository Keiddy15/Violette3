<template>
    <v-app class="main">
        <v-card class="main">
            <v-card-title class="welcomeTitle d-flex justify-space-around" style="letter-spacing: 2px">
                <img
                        src="https://firebasestorage.googleapis.com/v0/b/violette-cartagena.appspot.com/o/Logo.png?alt=media&token=1fb75a14-79f6-4ff3-87b0-a6f9d96149fc"
                        height="70px"
                        class="pr-5"
                >
                <h4>Violette - Sports Wear</h4>
                <v-btn class="mx-2" fab dark small color="primary" @click="login">
                    <v-icon dark>mdi-account</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-card class="cardForm2" shaped elevation="20">
            <v-list-item three-line>
                <v-list-item-content>
                    <v-img
                            src="https://firebasestorage.googleapis.com/v0/b/violette-efc12.appspot.com/o/Logo2.png?alt=media&token=1da11aba-2d59-44c7-a504-e8af1a80f97a"
                            class="logo2"
                            contain
                    >
                    </v-img>
                    <v-card-text>
                        <div class="text-center"><span class="headline font-weight-bold">¡Bienvenida a Violette!</span>
                        </div>
                        <div class="text-center">Escoge la ciudad en la que te encuentras.</div>
                    </v-card-text>
                    <v-btn color="purple white--text" block @click="cartagena">
                        Cartagena
                    </v-btn>
                    <v-btn color="purple white--text" block @click="submit">
                        Otra Ciudad
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-app>
</template>

<script>
    export default {
        name: "Welcome",
        methods: {
            submit() {
                this.$router.push({name: 'Form'});
            },
            cartagena() {
                this.$router.push({name: 'FormCartagena'});
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

    .logo2 {
        width: 300px;
        height: 300px;
    }

    .cardForm2 {
        padding: 20px;
        width: 500px;
        margin: auto;
    }

    .main {
        background-color: rgb(153, 43, 174) !important;
    }
</style>