import { useConjuntosStore } from "@/stores/useConjuntosStore";
import { storeToRefs } from "pinia";

export const useConjuntosComposable = () => {

    const store = useConjuntosStore()

    const {
        primer_conjunto,
        segundo_conjunto,
        nombres_conjuntos,
        conjuntos,
        elementos,
        resultado_union,
    } = storeToRefs(store)

    const unirConjuntos = async () => +await store.unirConjuntos()
    const interseccionConjuntos = async () => +await store.interseccionConjuntos()
    const diferenciaConjuntos = async () => +await store.diferenciaConjuntos()
    const complementoConjuntos = async () => +await store.complementoConjuntos()

    return {
        primer_conjunto,
        segundo_conjunto,
        nombres_conjuntos,
        conjuntos,
        elementos,
        resultado_union,

        unirConjuntos,
        interseccionConjuntos,
        diferenciaConjuntos,
        complementoConjuntos,
    }
}