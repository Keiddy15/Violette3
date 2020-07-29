<template>
    <v-app class="main">
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
                        <div class="text-center"><span class="headline font-weight-bold">¡Pedido terminado!</span></div>
                        <div class="text-center">En las próximas 24 horas estarás recibiendo tu numero de guía.</div>
                        <div class="text-center">ESPERAMOS NOS COMPARTAS UNA FOTO PARA QUE HAGAS PARTE DE NUESTRO <span
                                class="font-weight-bold">#TEAMVIOLETTE.</span></div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn color="purple white--text" block large @click="submit">
                            Inicio
                        </v-btn>
                    </v-card-actions>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-app>
</template>

<script>
    export default {
        name: "FinishedForm",
        methods: {
            submit() {
                this.$router.push({name: 'Form'});
            }
        }
    }
</script>

<style scoped>
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