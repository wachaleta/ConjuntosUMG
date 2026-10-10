
<template>
    <div class="container-fluid conjuntos-page py-4 px-3 px-lg-4">
        <!-- Encabezado -->
        <header class="page-header mb-4">
            <div class="d-flex align-items-center gap-3">
                <div class="header-icon">
                    <FontAwesomeIcon icon="shapes"/>
                </div>

                <div>
                    <h1 class="page-title mb-1">Operaciones de conjuntos</h1>
                    <p class="page-subtitle mb-0">
                        Crea conjuntos, agrega elementos y realiza operaciones matemáticas.
                    </p>
                </div>
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
                        <FontAwesomeIcon icon="list-ol"/>
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
                        <FontAwesomeIcon icon="calculator"/>
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

        <!-- Sección de conjuntos -->
        <section class="content-card mb-4">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Mis conjuntos</h2>
                    <p class="section-description">
                        Administra los conjuntos y sus elementos.
                    </p>
                </div>

                <Boton @click="crearConjunto()">
                    <FontAwesomeIcon icon="plus"/>
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
                        <div class="set-card-header">
                            <div class="set-heading">
                                <div class="set-letter">
                                    {{ String.fromCharCode(65 + index) }}
                                </div>

                                <div>
                                    <h3 class="set-title">Conjunto {{ item }}</h3>
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

                            <span class="set-symbol">
                                {{ String.fromCharCode(65 + index) }}
                            </span>
                        </div>

                        <form
                            class="add-element-form"
                            @submit.prevent="agregarElemento(item)"
                        >
                            <label class="form-label">
                                Nuevo elemento
                            </label>

                            <div class="input-action">
                                <TextInput
                                    v-model="nuevo_elemento"
                                >
                                    Escribe un elemento
                                </TextInput>

                                <Boton color="success">
                                    <FontAwesomeIcon icon="plus"/>
                                </Boton>
                            </div>
                        </form>

                        <div class="elements-container">
                            <span class="elements-label">Elementos del conjunto</span>

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
                                    {{ elemento.valor }}
                                </span>
                            </div>

                            <div v-else class="empty-elements">
                                <FontAwesomeIcon icon="inbox"/>
                                <span>Aún no hay elementos</span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <div v-else class="empty-state">
                <div class="empty-state-icon">
                    <FontAwesomeIcon icon="layer-group"/>
                </div>

                <h3>Comienza creando un conjunto</h3>
                <p>
                    Agrega tu primer conjunto para empezar a trabajar con sus elementos.
                </p>

                <Boton @click="crearConjunto()">
                    <FontAwesomeIcon icon="plus"/>
                    Crear mi primer conjunto
                </Boton>
            </div>
        </section>

        <!-- Panel de operaciones -->
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
                            Conjunto {{ conjunto }}
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
                            Conjunto {{ conjunto }}
                        </option>
                    </select>

                    <small
                        v-if="operacion === 'Complemento'"
                        class="field-hint"
                    >
                        El complemento se calcula respecto de un conjunto universal.
                        Verifica que tu composable tenga definida esa referencia.
                    </small>
                </div>
            </div>

            <div class="operation-preview mt-4">
                <div class="preview-icon">
                    <FontAwesomeIcon icon="code-branch"/>
                </div>

                <div class="preview-content">
                    <span class="preview-label">Operación a realizar</span>

                    <div class="preview-expression">
                        <template v-if="primer_conjunto">
                            <span class="math-set">
                                {{ primer_conjunto }}
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

                            <span
                                v-if="operacion !== 'Complemento'"
                                class="math-set"
                            >
                                {{ segundo_conjunto || '?' }}
                            </span>
                        </template>

                        <span v-else class="preview-placeholder">
                            Selecciona los conjuntos
                        </span>
                    </div>
                </div>

                <div class="preview-action">
                    <Boton
                        @click="submit()"
                    >
                        <FontAwesomeIcon icon="fa-play"/>
                        Calcular resultado
                    </Boton>
                </div>
            </div>
        </section>

        <!-- Resultado -->
        <section class="result-card">
            <div class="result-header">
                <div class="result-icon">
                    <FontAwesomeIcon icon="square-root-variable"/>
                </div>

                <div>
                    <h2 class="result-title">Resultado de la operación</h2>
                    <p class="result-description">
                        Aquí se mostrará el resultado del cálculo.
                    </p>
                </div>
            </div>

            <div class="result-body">
                <div class="result-set-label">Conjunto resultante</div>

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
import { ref } from 'vue';

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
    complementoConjuntos,
} = useConjuntosComposable();

const crearConjunto = () => {
    for (const nombre of nombres_conjuntos.value) {
        if (!conjuntos.value.includes(nombre)) {
            conjuntos.value.push(nombre);
            return;
        }
    }
};

const agregarElemento = (conjunto) => {
    const valor = nuevo_elemento.value.trim();

    if (!valor) return;

    elementos.value.push({
        conjunto,
        valor,
    });

    nuevo_elemento.value = '';
};

const submit = () => {
    if (!operacion.value || !primer_conjunto.value) return;

    if (
        operacion.value !== 'Complemento' &&
        !segundo_conjunto.value
    ) {
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

        case 'Complemento':
            complementoConjuntos();
            break;
    }
};
</script>

<style scoped>
.conjuntos-page {
    --primary: #6c63ff;
    --primary-light: #f0efff;
    --text-main: #202438;
    --text-muted: #81879b;
    --border-color: #e9ebf2;
    --surface: #ffffff;

    min-height: 100%;
    background: #f6f7fb;
    color: var(--text-main);
    border-radius: 16px;
}

.page-header {
    padding: 8px 2px 12px;
}

.header-icon {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    color: white;
    font-size: 23px;
    background: linear-gradient(135deg, #786cff, #5748dc);
    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.2);
}

.page-title {
    font-size: clamp(1.35rem, 2.5vw, 1.8rem);
    font-weight: 750;
    letter-spacing: -0.7px;
}

.page-subtitle,
.section-description {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

.summary-card {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.summary-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(32, 36, 56, 0.05);
}

.summary-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 14px;
    font-size: 19px;
}

.summary-icon.purple {
    background: #efedff;
    color: #7163ed;
}

.summary-icon.blue {
    background: #e8f3ff;
    color: #3984dd;
}

.summary-icon.green {
    background: #e3f8ef;
    color: #23996c;
}

.summary-label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-muted);
    font-size: 0.8rem;
}

.summary-value {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 750;
}

.operation-summary {
    font-size: 1.15rem;
}

.content-card {
    padding: 25px;
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 18px;
    box-shadow: 0 3px 12px rgba(32, 36, 56, 0.025);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
}

.section-title {
    margin: 0 0 5px;
    font-size: 1.15rem;
    font-weight: 750;
}

.section-description {
    margin: 0;
}

.set-card {
    height: 100%;
    padding: 20px;
    overflow: hidden;
    background: #fff;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.set-card:hover {
    border-color: #d5d0ff;
    box-shadow: 0 8px 22px rgba(108, 99, 255, 0.07);
}

.set-card-header,
.set-heading {
    display: flex;
    align-items: center;
}

.set-card-header {
    justify-content: space-between;
    padding-bottom: 18px;
    border-bottom: 1px solid #f0f1f6;
}

.set-heading {
    gap: 12px;
}

.set-letter {
    width: 43px;
    height: 43px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: var(--primary-light);
    color: var(--primary);
    font-weight: 800;
    font-size: 1.15rem;
}

.set-title {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 750;
}

.set-count {
    color: var(--text-muted);
    font-size: 0.78rem;
}

.set-symbol {
    color: #e6e4ff;
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
}

.add-element-form {
    padding: 18px 0;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    color: #454b60;
    font-size: 0.86rem;
    font-weight: 650;
}

.input-action {
    display: flex;
    align-items: center;
    gap: 8px;
}

.input-action > :first-child {
    flex: 1;
    min-width: 0;
}

.elements-container {
    padding-top: 16px;
    border-top: 1px solid #f0f1f6;
}

.elements-label {
    display: block;
    margin-bottom: 12px;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 600;
}

.elements-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.element-chip,
.result-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 12px;
    border: 1px solid #e4e1ff;
    border-radius: 9px;
    background: #f4f2ff;
    color: #6155d8;
    font-size: 0.85rem;
    font-weight: 600;
    overflow-wrap: anywhere;
    max-width: 100%;
}

.empty-elements {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 13px;
    border-radius: 10px;
    background: #f8f9fc;
    color: #969bad;
    font-size: 0.83rem;
}

.empty-state {
    padding: 40px 15px;
    text-align: center;
}

.empty-state-icon {
    width: 66px;
    height: 66px;
    display: grid;
    place-items: center;
    margin: 0 auto 18px;
    border-radius: 20px;
    background: var(--primary-light);
    color: var(--primary);
    font-size: 27px;
}

.empty-state h3 {
    font-size: 1.05rem;
    font-weight: 750;
}

.empty-state p {
    max-width: 420px;
    margin: 0 auto 20px;
    color: var(--text-muted);
    font-size: 0.9rem;
}

.operation-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 13px;
    border-radius: 10px;
    background: #f0efff;
    color: #6558d9;
    font-size: 0.8rem;
    font-weight: 650;
    white-space: nowrap;
}

.custom-select {
    min-height: 47px;
    padding: 11px 14px;
    border: 1px solid #e0e3ed;
    border-radius: 10px;
    background-color: #fff;
    color: var(--text-main);
    font-size: 0.9rem;
    box-shadow: none;
}

.custom-select:focus {
    border-color: #958cff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
}

.custom-select:disabled {
    background-color: #f5f6fa;
    color: #999eb0;
}

.field-hint {
    display: block;
    margin-top: 9px;
    color: var(--text-muted);
    font-size: 0.78rem;
    line-height: 1.5;
}

.operation-preview {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border: 1px solid #e4e1ff;
    border-radius: 14px;
    background: linear-gradient(110deg, #f7f6ff, #fbfaff);
}

.preview-icon {
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    background: #e9e6ff;
    color: #6c63ff;
    font-size: 19px;
}

.preview-content {
    flex: 1;
    min-width: 0;
}

.preview-label,
.result-set-label {
    display: block;
    margin-bottom: 7px;
    color: var(--text-muted);
    font-size: 0.78rem;
}

.preview-expression {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.math-set {
    font-size: 1.1rem;
    font-weight: 750;
}

.math-operator {
    color: #7064e8;
    font-size: 1.4rem;
    font-weight: 750;
}

.preview-placeholder {
    color: #989db0;
    font-size: 0.9rem;
}

.preview-action {
    flex-shrink: 0;
}

.result-card {
    overflow: hidden;
    border: 1px solid #dfe9e4;
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(32, 36, 56, 0.025);
}

.result-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 22px 25px;
    border-bottom: 1px solid #edf1ee;
    background: #f9fcfa;
}

.result-icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 13px;
    background: #e1f6e9;
    color: #238b59;
    font-size: 21px;
}

.result-title {
    margin: 0 0 5px;
    font-size: 1.1rem;
    font-weight: 750;
}

.result-description {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.85rem;
}

.result-body {
    padding: 24px 25px;
}

.result-values {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    min-height: 35px;
}

.result-chip {
    padding: 9px 15px;
    border-color: #ccebd9;
    background: #eaf8ef;
    color: #24784b;
}

.result-placeholder,
.result-empty {
    color: #9298aa;
    font-size: 0.9rem;
}

@media (max-width: 767px) {
    .conjuntos-page {
        padding-right: 12px !important;
        padding-left: 12px !important;
    }

    .content-card {
        padding: 18px;
        border-radius: 15px;
    }

    .section-header {
        align-items: flex-start;
    }

    .section-header > :last-child {
        flex-shrink: 0;
    }

    .operation-badge {
        display: none;
    }

    .operation-preview {
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 16px;
    }

    .preview-content {
        padding-top: 4px;
    }

    .preview-action {
        width: 100%;
    }

    .preview-action :deep(button) {
        width: 100%;
    }

    .result-header,
    .result-body {
        padding: 18px;
    }
}

@media (max-width: 420px) {
    .page-header .header-icon {
        width: 45px;
        height: 45px;
        border-radius: 13px;
    }

    .page-subtitle {
        font-size: 0.82rem;
    }

    .section-header {
        flex-wrap: wrap;
    }

    .input-action {
        align-items: stretch;
    }
}
</style>
```