
<template>
    <div class="container-fluid conjuntos-page py-4 px-3 px-lg-4">
        <!-- Encabezado -->
        
        <header
            class="page-header mb-4 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3"
        >
            <div class="d-flex align-items-center gap-3">
                <div class="header-icon flex-shrink-0">
                    <FontAwesomeIcon icon="shapes" />
                </div>

                <div>
                    <h1 class="page-title mb-1">Operaciones de conjuntos</h1>
                    <p class="page-subtitle mb-0">
                        Crea conjuntos, administra sus elementos y realiza operaciones matemáticas.
                    </p>
                </div>
            </div>

            <div class="ms-md-auto flex-shrink-0">
                <RouterLink
                    :to="{ name: 'sobre-nosotros' }"
                    class="btn btn-success w-100 w-md-auto"
                >
                    <FontAwesomeIcon icon="people-group" class="me-2" />
                    Sobre Nosotros
                </RouterLink>
            </div>
        </header>


        <!-- Resumen -->
        <div class="row g-3 mb-4">
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="summary-card">
                    <div class="summary-icon purple">
                        <FontAwesomeIcon icon="layer-group" />
                    </div>

                    <div>
                        <span class="summary-label">Conjuntos creados</span>
                        <h3 class="summary-value">{{ conjuntos.length }}</h3>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
                <div class="summary-card">
                    <div class="summary-icon blue">
                        <FontAwesomeIcon icon="list-ol" />
                    </div>

                    <div>
                        <span class="summary-label">Elementos registrados</span>
                        <h3 class="summary-value">{{ elementos.length }}</h3>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="summary-card">
                    <div class="summary-icon green">
                        <FontAwesomeIcon icon="calculator" />
                    </div>

                    <div>
                        <span class="summary-label">Operación seleccionada</span>
                        <h3 class="summary-value operation-summary">
                            {{ operacion || 'Sin seleccionar' }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mis conjuntos -->
        <section class="content-card mb-4">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Mis conjuntos</h2>
                    <p class="section-description">
                        Administra los conjuntos y sus elementos.
                    </p>
                </div>

                <Boton @click="crearConjunto()">
                    <FontAwesomeIcon icon="plus" />
                    Agregar conjunto
                </Boton>
            </div>

            <div v-if="conjuntos.length" class="row g-3">
                <div
                    v-for="(item, index) in conjuntos"
                    :key="item"
                    class="col-12 col-md-6 col-xl-4"
                >
                    <article class="set-card">
                        <!-- Encabezado del conjunto -->
                        <div class="set-card-header">
                            <div class="set-heading">
                                <div class="set-letter">
                                    {{ String.fromCharCode(65 + index) }}
                                </div>

                                <div>
                                    <h3 class="set-title">
                                        Conjunto {{ String.fromCharCode(65 + index) }}
                                    </h3>

                                    <span class="set-count">
                                        {{
                                            elementos.filter(
                                                e => e.conjunto === item
                                            ).length
                                        }}
                                        elementos
                                    </span>
                                </div>
                            </div>

                            <div class="set-header-actions">
                                <span class="set-symbol">
                                    {{ String.fromCharCode(65 + index) }}
                                </span>

                                <button
                                    type="button"
                                    class="delete-button"
                                    title="Eliminar conjunto"
                                    aria-label="Eliminar conjunto"
                                    @click="eliminarConjunto(item)"
                                >
                                    <FontAwesomeIcon icon="trash-can" />
                                </button>
                            </div>
                        </div>

                        <!-- Agregar elemento -->
                        <form
                            class="add-element-form"
                            @submit.prevent="agregarElemento(item)"
                        >
                            <label
                                class="form-label"
                                :for="`elemento-${item}`"
                            >
                                Nuevo elemento
                            </label>

                            <div class="input-action">
                                <TextInput
                                    v-model="nuevo_elemento"
                                    :id="`elemento-${item}`"
                                >
                                    Escribe un elemento
                                </TextInput>

                                <Boton color="success" type="submit">
                                    <FontAwesomeIcon icon="plus" />
                                </Boton>
                            </div>
                        </form>

                        <!-- Elementos del conjunto -->
                        <div class="elements-container">
                            <span class="elements-label">
                                Elementos del conjunto
                            </span>

                            <div
                                v-if="elementos.some(e => e.conjunto === item)"
                                class="elements-list"
                            >
                                <span
                                    v-for="(elemento, i) in elementos.filter(
                                        e => e.conjunto === item
                                    )"
                                    :key="i"
                                    class="element-chip"
                                >
                                    <span class="element-value">
                                        {{ elemento.valor }}
                                    </span>

                                    <button
                                        type="button"
                                        class="delete-element-button"
                                        title="Eliminar elemento"
                                        aria-label="Eliminar elemento"
                                        @click="eliminarElemento(elemento)"
                                    >
                                        <FontAwesomeIcon icon="xmark" />
                                    </button>
                                </span>
                            </div>

                            <div v-else class="empty-elements">
                                <FontAwesomeIcon icon="inbox" />
                                <span>Aún no hay elementos</span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <!-- Estado vacío -->
            <div v-else class="empty-state">
                <div class="empty-state-icon">
                    <FontAwesomeIcon icon="layer-group" />
                </div>

                <h3>Comienza creando un conjunto</h3>

                <p>
                    Agrega tu primer conjunto para empezar a trabajar con sus elementos.
                </p>

                <Boton @click="crearConjunto()">
                    <FontAwesomeIcon icon="plus" />
                    Crear mi primer conjunto
                </Boton>
            </div>
        </section>

        <!-- Conjunto universal -->
        <section class="content-card mb-4 universal-card">
            <div class="section-header">
                <div>
                    <h2 class="section-title">
                        <FontAwesomeIcon
                            icon="globe"
                            class="universal-title-icon"
                        />
                        Conjunto universal (U)
                    </h2>

                    <p class="section-description">
                        Todos los elementos de tus conjuntos, sin repeticiones.
                    </p>
                </div>

                <span class="universal-count">
                    {{ conjuntoUniversal.length }}
                    elementos únicos
                </span>
            </div>

            <div
                v-if="conjuntoUniversal.length"
                class="universal-elements"
            >
                <span
                    v-for="(elemento, index) in conjuntoUniversal"
                    :key="index"
                    class="universal-chip"
                >
                    {{ elemento }}
                </span>
            </div>

            <div v-else class="universal-empty">
                <FontAwesomeIcon icon="globe" />

                <span>
                    El conjunto universal está vacío. Agrega elementos a tus
                    conjuntos para que aparezcan aquí.
                </span>
            </div>
        </section>

        <!-- Configurar operación -->
        <section class="content-card mb-4">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Configurar operación</h2>

                    <p class="section-description">
                        Selecciona una operación y define los conjuntos que utilizarás.
                    </p>
                </div>

                <div class="operation-badge">
                    Matemáticas
                </div>
            </div>

            <div class="row g-4">
                <div class="col-12">
                    <label class="form-label" for="operacion">
                        Tipo de operación
                    </label>

                    <select
                        id="operacion"
                        v-model="operacion"
                        class="form-select custom-select"
                    >
                        <option value="Unión">Unión (A ∪ B)</option>

                        <option value="Intersección">
                            Intersección (A ∩ B)
                        </option>

                        <option value="Diferencia">
                            Diferencia (A − B)
                        </option>

                        <option value="Complemento">
                            Complemento (Aᶜ)
                        </option>
                    </select>
                </div>

                <div class="col-12 col-md-6">
                    <label class="form-label" for="primer-conjunto">
                        Primer conjunto
                    </label>

                    <select
                        id="primer-conjunto"
                        v-model="primer_conjunto"
                        class="form-select custom-select"
                        :disabled="!conjuntos.length"
                    >
                        <option value="" disabled>
                            Selecciona un conjunto
                        </option>

                        <option
                            v-for="conjunto in conjuntos"
                            :key="conjunto"
                            :value="conjunto"
                        >
                            Conjunto {{ String.fromCharCode(65 + conjuntos.indexOf(conjunto)) }}
                        </option>
                    </select>
                </div>

                <div class="col-12 col-md-6">
                    <label class="form-label" for="segundo-conjunto">
                        Segundo conjunto
                    </label>

                    <select
                        id="segundo-conjunto"
                        v-model="segundo_conjunto"
                        class="form-select custom-select"
                        :disabled="
                            !conjuntos.length ||
                            operacion === 'Complemento'
                        "
                    >
                        <option value="" disabled>
                            Selecciona un conjunto
                        </option>

                        <option
                            v-for="conjunto in conjuntos"
                            :key="conjunto"
                            :value="conjunto"
                        >
                            Conjunto {{ String.fromCharCode(65 + conjuntos.indexOf(conjunto)) }}
                        </option>
                    </select>

                    <small
                        v-if="operacion === 'Complemento'"
                        class="field-hint"
                    >
                        Se calculará la diferencia entre el conjunto universal
                        U y el primer conjunto seleccionado.
                    </small>
                </div>
            </div>

            <!-- Vista previa -->
            <div class="operation-preview mt-4">
                <div class="preview-icon">
                    <FontAwesomeIcon icon="code-branch" />
                </div>

                <div class="preview-content">
                    <span class="preview-label">
                        Operación a realizar
                    </span>

                    <div class="preview-expression">
                        <template v-if="primer_conjunto">
                            <span class="math-set">
                                {{ String.fromCharCode(65 + conjuntos.indexOf(primer_conjunto)) }}
                            </span>

                            <span class="math-operator">
                                {{
                                    {
                                        'Unión': '∪',
                                        'Intersección': '∩',
                                        'Diferencia': '−',
                                        'Complemento': 'ᶜ'
                                    }[operacion] || '?'
                                }}
                            </span>

                            <template v-if="operacion === 'Complemento'">
                                <span class="math-set">U</span>
                            </template>

                            <span
                                v-else
                                class="math-set"
                            >
                                {{ segundo_conjunto == '' ? '?' : String.fromCharCode(65 + conjuntos.indexOf(segundo_conjunto)) }}
                            </span>
                        </template>

                        <span v-else class="preview-placeholder">
                            Selecciona los conjuntos
                        </span>
                    </div>
                </div>

                <div class="preview-action">
                    <Boton @click="submit()">
                        <FontAwesomeIcon icon="play" />
                        Calcular resultado
                    </Boton>
                </div>
            </div>
        </section>

        <!-- Resultado -->
        <section class="result-card">
            <div class="result-header">
                <div class="result-icon">
                    <FontAwesomeIcon icon="square-root-variable" />
                </div>

                <div>
                    <h2 class="result-title">
                        Resultado de la operación
                    </h2>

                    <p class="result-description">
                        Aquí se mostrará el resultado del cálculo.
                    </p>
                </div>
            </div>

            <div class="result-body">
                <div class="result-set-label">
                    Conjunto resultante
                </div>

                <div class="result-values">
                    <template v-if="resultado_union != null">
                        <span
                            v-for="(valor, index) in (
                                Array.isArray(resultado_union)
                                    ? resultado_union
                                    : [resultado_union]
                            )"
                            :key="index"
                            class="result-chip"
                        >
                            {{ valor?.valor ?? valor }}
                        </span>

                        <span
                            v-if="
                                Array.isArray(resultado_union) &&
                                resultado_union.length === 0
                            "
                            class="result-empty"
                        >
                            El conjunto resultante está vacío: ∅
                        </span>
                    </template>

                    <span v-else class="result-placeholder">
                        Realiza una operación para ver el resultado.
                    </span>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import { useConjuntosComposable } from '@/composables/useConjuntosComposable';

import Boton from '@/components/botones/Boton.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const nuevo_elemento = ref('');
const operacion = ref('Unión');

const {
    primer_conjunto,
    segundo_conjunto,
    nombres_conjuntos,
    conjuntos,
    elementos,
    resultado_union,

    unirConjuntos,
    interseccionConjuntos,
    diferenciaConjuntos,
} = useConjuntosComposable();

/*
 * Conjunto universal.
 * Reúne los elementos de todos los conjuntos sin repetir valores.
 * La comparación ignora espacios externos y diferencias entre mayúsculas
 * y minúsculas, conservando la primera versión del elemento registrado.
 */
const conjuntoUniversal = computed(() => {
    const valoresUnicos = new Map();

    for (const elemento of elementos.value) {
        const valorOriginal = String(elemento.valor).trim();
        const clave = valorOriginal.toLocaleLowerCase();

        if (valorOriginal && !valoresUnicos.has(clave)) {
            valoresUnicos.set(clave, valorOriginal);
        }
    }

    return [...valoresUnicos.values()];
});

/*
 * Crear un conjunto con el primer nombre disponible.
 */
const crearConjunto = () => {
    const nombreDisponible = nombres_conjuntos.value.find(
        nombre => !conjuntos.value.includes(nombre)
    );

    if (nombreDisponible === undefined) {
        window.alert('No hay más nombres de conjuntos disponibles.');
        return;
    }

    conjuntos.value.push(nombreDisponible);
};

/*
 * Eliminar un conjunto y todos sus elementos.
 */
const eliminarConjunto = (conjunto) => {
    const confirmar = window.confirm(
        `¿Deseas eliminar el conjunto ${conjunto} y todos sus elementos?`
    );

    if (!confirmar) return;

    conjuntos.value = conjuntos.value.filter(
        nombre => nombre !== conjunto
    );

    elementos.value = elementos.value.filter(
        elemento => elemento.conjunto !== conjunto
    );

    if (primer_conjunto.value === conjunto) {
        primer_conjunto.value = '';
    }

    if (segundo_conjunto.value === conjunto) {
        segundo_conjunto.value = '';
    }

    resultado_union.value = null;
};

/*
 * Agregar un elemento a un conjunto.
 */
const agregarElemento = (conjunto) => {
    const valor = nuevo_elemento.value.trim();

    if (!valor) return;

    elementos.value.push({
        conjunto,
        valor,
    });

    nuevo_elemento.value = '';
    resultado_union.value = null;
};

/*
 * Eliminar un elemento específico sin afectar los demás.
 */
const eliminarElemento = (elemento) => {
    elementos.value = elementos.value.filter(
        actual => actual !== elemento
    );

    resultado_union.value = null;
};

/*
 * Limpiar resultados antiguos cuando cambien los conjuntos
 * o los elementos.
 */
watch(
    [conjuntos, elementos],
    () => {
        resultado_union.value = null;
    },
    { deep: true }
);

/*
 * Ejecutar la operación seleccionada.
 */
const submit = () => {
    if (!primer_conjunto.value) {
        window.alert('Selecciona el primer conjunto.');
        return;
    }

    if (!conjuntos.value.includes(primer_conjunto.value)) {
        window.alert('El primer conjunto seleccionado ya no existe.');
        return;
    }

    if (
        operacion.value !== 'Complemento' &&
        (
            !segundo_conjunto.value ||
            !conjuntos.value.includes(segundo_conjunto.value)
        )
    ) {
        window.alert('Selecciona un segundo conjunto válido.');
        return;
    }

    switch (operacion.value) {
        case 'Unión':
            unirConjuntos();
            break;

        case 'Intersección':
            interseccionConjuntos();
            break;

        case 'Diferencia':
            diferenciaConjuntos();
            break;

        case 'Complemento': {
            /*
             * Aᶜ = U - A
             * El complemento se calcula directamente usando el conjunto
             * universal reactivo y los elementos del primer conjunto.
             */
            const elementosPrimerConjunto = new Set(
                elementos.value
                    .filter(
                        elemento =>
                            elemento.conjunto === primer_conjunto.value
                    )
                    .map(
                        elemento =>
                            String(elemento.valor)
                                .trim()
                                .toLocaleLowerCase()
                    )
            );

            resultado_union.value = conjuntoUniversal.value.filter(
                valor =>
                    !elementosPrimerConjunto.has(
                        String(valor).trim().toLocaleLowerCase()
                    )
            );

            break;
        }
    }
};
</script>