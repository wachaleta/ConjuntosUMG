import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import Api from "@/helpers/Api";

export const useConjuntosStore = defineStore("conjuntos", {
    state:() => {
        return{
            primer_conjunto: "",
            segundo_conjunto: "",
            nombres_conjuntos: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
            conjuntos: ['A'],
            elementos: [],
            resultado_union: [],
        }
    },
    actions: {
        async unirConjuntos() {
            
            const elementos_primer_conjunto = this.elementos.filter(v => v.conjunto == this.primer_conjunto).map(item => item.valor)
            const elementos_segundo_conjunto = this.elementos.filter(v => v.conjunto == this.segundo_conjunto).map(item => item.valor)

            await Api().post("conjuntos/union/", {
                primerConjunto: elementos_primer_conjunto,
                segundoConjunto: elementos_segundo_conjunto,
            })
            .then(res => {
                this.resultado_union = res.data.resultado
                toast.success("Resultado calculado")
            })
        },
        
        async interseccionConjuntos() {
            
            const elementos_primer_conjunto = this.elementos.filter(v => v.conjunto == this.primer_conjunto).map(item => item.valor)
            const elementos_segundo_conjunto = this.elementos.filter(v => v.conjunto == this.segundo_conjunto).map(item => item.valor)

            await Api().post("conjuntos/interseccion/", {
                primerConjunto: elementos_primer_conjunto,
                segundoConjunto: elementos_segundo_conjunto,
            })
            .then(res => {
                this.resultado_union = res.data.resultado
                toast.success("Resultado calculado")
            })
        },

        async diferenciaConjuntos() {
            
            const elementos_primer_conjunto = this.elementos.filter(v => v.conjunto == this.primer_conjunto).map(item => item.valor)
            const elementos_segundo_conjunto = this.elementos.filter(v => v.conjunto == this.segundo_conjunto).map(item => item.valor)

            await Api().post("conjuntos/union/", {
                primerConjunto: elementos_primer_conjunto,
                segundoConjunto: elementos_segundo_conjunto,
            })
            .then(res => {
                this.resultado_union = res.data.resultado
                toast.success("Resultado calculado")
            })
        },

        async complementoConjuntos() {
            
            const elementos_primer_conjunto = this.elementos.filter(v => v.conjunto == this.primer_conjunto).map(item => item.valor)
            const elementos_segundo_conjunto = this.elementos.filter(v => v.conjunto == this.segundo_conjunto).map(item => item.valor)

            await Api().post("conjuntos/union/", {
                primerConjunto: elementos_primer_conjunto,
                segundoConjunto: elementos_segundo_conjunto,
            })
            .then(res => {
                this.resultado_union = res.data.resultado
                toast.success("Resultado calculado")
            })
        },
    }
})