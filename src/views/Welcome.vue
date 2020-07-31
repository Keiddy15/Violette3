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
                        <div class="text-center"><span class="headline font-weight-bold">¡Bienvenida a Violette!</span>
                        </div>
                        <div class="text-center">Escoge la ciudad en la que te encuentras.</div>
                    </v-card-text>
                    <v-btn color="purple white--text" block @click="cartagena">
                        Cartagena
                    </v-btn>
                    <v-btn color="purple white--text" block @click="submit">
                        Otra
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