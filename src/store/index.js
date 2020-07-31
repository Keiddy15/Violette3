import Vue from 'vue'
import Vuex from 'vuex'

const vuexMapFields = require("vuex-map-fields");
const getField = vuexMapFields.getField;
const updateField = vuexMapFields.updateField;
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import download from "downloadjs";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tab: 'tab-1',
        orders: 0,
        dialogUserSelected: false,
        userSelected: [],
        printItem: [],
        printItemCartagena: []
    },
    getters: {
        getField,
        updateField
    },
    mutations: {
        moveTab(state, n) {
            state.tab = 'tab-' + n;
        },
        passingUserSelected(state, payload) {
            state.dialogUserSelected = payload.show;
            state.userSelected = payload.userSelected;
        },
        setCountOrders(state, n) {
            state.orders = n;
        },
        async printDocumentCartagena(state, payload) {
            state.printItem = payload.printItem;
            const pngUrl = "https://i.ibb.co/7NcssdR/violette-Logo.png";
            const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.create(); //Crear objeto inicializador de PDF
            const courier = await pdfDoc.embedFont(StandardFonts.Courier); // iniciando fuent
            let page = pdfDoc.addPage(); // Añadiendo pagina al documento
            const {width, height} = page.getSize(); //Obteniendo tamaño de pagina
            const fontSize = 10; // Ajustando tamaño fuente
            const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const pngDims = pngImage.scale(0.1);
            page.setWidth(612);
            page.setHeight(791);
            let text = "";
            let limit = 0;
            let suma = height - 40;
            let textPos = height + 10;
            for (let i in state.printItem) {
                if (limit === 8) {
                    page = pdfDoc.addPage();
                    page.setWidth(612);
                    page.setHeight(791);
                    limit = 0;
                    suma = height - 40;
                    textPos = height + 10;
                }

                suma = suma - 90;

                page.drawImage(pngImage, {
                    x: 20,
                    y: suma,
                    width: pngDims.width,
                    height: pngDims.height

                });
                if (state.printItem[i].address !== undefined && state.printItem[i].neighborhood !== undefined) {
                    text = '\nNombre: ' + state.printItem[i].name + ' ' + state.printItem[i].lastName + '\n'
                        + 'Cedula: ' + state.printItem[i].identificationCard + '\n'
                        + 'Ciudad y departamento: ' + state.printItem[i].city + ', ' + state.printItem[i].departament + '\n'
                        + 'Dirección: ' + state.printItem[i].address + '\n'
                        + 'Barrio: ' + state.printItem[i].neighborhood + '\n'
                        + 'Punto de referencia: ' + state.printItem[i].referencePoint + '\n'
                        + 'Telefono: ' + state.printItem[i].phone + '\n'
                        + 'Flete pago ' + '| |' + ' Flete contra entrega ' + '| |' + '\n'
                        + '---------------------------------------------------------' + '\n';
                } else if (state.printItem[i].address !== undefined && state.printItem[i].houseNumber !== undefined && state.printItem[i].tower !== undefined) {
                    text = '\nNombre: ' + state.printItem[i].name + ' ' + state.printItem[i].lastName + '\n'
                        + 'Cedula: ' + state.printItem[i].identificationCard + '\n'
                        + 'Ciudad y departamento: ' + state.printItem[i].city + ', ' + state.printItem[i].departament + '\n'
                        + 'Dirección: ' + state.printItem[i].address + '\n'
                        + 'Punto de referencia: ' + state.printItem[i].referencePoint + '\n'
                        + 'Telefono: ' + state.printItem[i].phone + '\n'
                        + 'Número de Casa o apartamento y torre: ' + state.printItem[i].houseNumber + ' ' + state.printItem[i].tower + '\n'
                        + 'Flete pago ' + '| |' + ' Flete contra entrega ' + '| |' + '\n'
                        + '---------------------------------------------------------' + '\n';
                }

                textPos = textPos - 90;

                page.drawText(text, { //dibujar o escribir
                    x: 90,
                    y: textPos,
                    size: fontSize,
                    font: courier,
                    color: rgb(0, 0, 0),
                    lineHeight: 10
                });
                limit++;

            }
            const pdfBytes = await pdfDoc.save(); //Genera el archivo en bytes

            download(pdfBytes, 'Guias.pdf', "application/pdf")
        },
        async printDocument(state, payload) {
            state.printItem = payload.printItem;
            const pngUrl = "https://i.ibb.co/7NcssdR/violette-Logo.png";
            const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.create(); //Crear objeto inicializador de PDF
            const courier = await pdfDoc.embedFont(StandardFonts.Courier); // iniciando fuent
            let page = pdfDoc.addPage(); // Añadiendo pagina al documento
            const {width, height} = page.getSize(); //Obteniendo tamaño de pagina
            const fontSize = 10; // Ajustando tamaño fuente
            const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const pngDims = pngImage.scale(0.1);
            page.setWidth(612);
            page.setHeight(791);
            let text = "";
            let limit = 0;
            let suma = height - 40;
            let textPos = height + 10;
            for (let i in state.printItem) {
                if (limit === 6) {
                    page = pdfDoc.addPage();
                    page.setWidth(612);
                    page.setHeight(791);
                    limit = 0;
                    suma = height - 40;
                    textPos = height + 10;
                }

                suma = suma - 120;

                page.drawImage(pngImage, {
                    x: 20,
                    y: suma,
                    width: pngDims.width,
                    height: pngDims.height

                });
                // @ts-ignore
                if (state.printItem[i].placeDelivery !== undefined) {
                    text = '\nKEISSY GARCÍA LÓPEZ, CC: 1.140.878.233, CARTAGENA DE INDIAS' + '\n'
                        + 'VILLA GRANDE DE INDIAS 2 MANZANA 23 LOTE 28.' + '\n'
                        + 'Celular: 304 573 7344' + '\n'
                        + '' + '\n'
                        + 'Nombre: ' + state.printItem[i].name + ' ' + state.printItem[i].lastName + '\n'
                        + 'Cedula: ' + state.printItem[i].identificationCard + '\n'
                        + 'Ciudad y departamento: ' + state.printItem[i].city + ', ' + state.printItem[i].departament + '\n'
                        + 'Telefono: ' + state.printItem[i].phone + '\n'
                        + 'Lugar de entrega: ' + state.printItem[i].placeDelivery + '\n'
                        + 'Flete pago ' + '| |' + ' Flete contra entrega ' + '| |' + '\n'
                        + '---------------------------------------------------------' + '\n';
                } else { // @ts-ignore
                    if (state.printItem[i].address !== undefined && state.printItem[i].neighborhood !== undefined) {
                        text = '\nKEISSY GARCÍA LÓPEZ, CC: 1.140.878.233, CARTAGENA DE INDIAS.' + '\n'
                            + 'VILLA GRANDE DE INDIAS 2 MANZANA 23 LOTE 28.' + '\n'
                            + 'Celular: 304 573 7344' + '\n'
                            + '' + '\n'
                            + 'Nombre: ' + state.printItem[i].name + ' ' + state.printItem[i].lastName + '\n'
                            + 'Cedula: ' + state.printItem[i].identificationCard + '\n'
                            + 'Ciudad y departamento: ' + state.printItem[i].city + ', ' + state.printItem[i].departament + '\n'
                            + 'Dirección y barrio: ' + state.printItem[i].address + ', ' + state.printItem[i].neighborhood + '\n'
                            + 'Telefono: ' + state.printItem[i].phone + '\n'
                            + 'Flete pago ' + '| |' + ' Flete contra entrega ' + '| |' + '\n'
                            + '---------------------------------------------------------' + '\n';
                    } else { // @ts-ignore
                        if (state.printItem[i].address !== undefined && state.printItem[i].houseNumber !== undefined && state.printItem[i].tower !== undefined) {
                            text = '\nKEISSY GARCÍA LÓPEZ, CC: 1.140.878.233, CARTAGENA DE INDIAS ' + '\n'
                                + 'VILLA GRANDE DE INDIAS 2 MANZANA 23 LOTE 28.' + '\n'
                                + 'Celular: 304 573 7344' + '\n'
                                + '' + '\n'
                                + 'Nombre: ' + state.printItem[i].name + ' ' + state.printItem[i].lastName + '\n'
                                + 'Cedula: ' + state.printItem[i].identificationCard + '\n'
                                + 'Ciudad y departamento: ' + state.printItem[i].city + ', ' + state.printItem[i].departament + '\n'
                                + 'Dirección: ' + state.printItem[i].address + '\n'
                                + 'Telefono: ' + state.printItem[i].phone + '\n'
                                + 'Número de Casa o apartamento y torre: ' + state.printItem[i].houseNumber + ' '
                                + 'torre: ' + state.printItem[i].tower + '\n'
                                + 'Flete pago ' + '| |' + ' Flete contra entrega ' + '| |' + '\n'
                                + '---------------------------------------------------------' + '\n';
                        }
                    }
                }

                textPos = textPos - 120;

                page.drawText(text, { //dibujar o escribir
                    x: 90,
                    y: textPos,
                    size: fontSize,
                    font: courier,
                    color: rgb(0, 0, 0),
                    lineHeight: 10
                });
                limit++;

            }
            const pdfBytes = await pdfDoc.save(); //Genera el archivo en bytes

            download(pdfBytes, 'Guias.pdf', "application/pdf")
        },
        updateField
    }
})
