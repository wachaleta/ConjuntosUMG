<template>
    <div class="container-fluid conjuntos-page py-4 px-3 px-lg-4">

        <!-- Encabezado -->
        <header
            class="page-header mb-4 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3"
        >
            <div class="d-flex align-items-center gap-3">
                <div class="header-icon">
                    <FontAwesomeIcon icon="people-group" />
                </div>

                <div>
                    <h1 class="page-title mb-1">
                        Sobre Nosotros
                    </h1>

                    <p class="page-subtitle mb-0">
                        Conoce a los integrantes que forman parte de nuestro equipo.
                    </p>
                </div>
            </div>

            <RouterLink
                :to="{ name: 'home' }"
                class="btn btn-success btn-regresar"
            >
                <FontAwesomeIcon icon="shapes" />
                <span>Operaciones de conjuntos</span>
                <FontAwesomeIcon
                    icon="arrow-right"
                    class="icono-flecha"
                />
            </RouterLink>
        </header>

        <!-- Introducción -->
        <section class="introduccion mb-4">
            <div class="introduccion-icono">
                <FontAwesomeIcon icon="graduation-cap" />
            </div>

            <div>
                <h2 class="introduccion-titulo">
                    Nuestro equipo
                </h2>

                <p class="introduccion-texto mb-0">
                    Somos un equipo comprometido con el aprendizaje y el desarrollo
                    de soluciones mediante la tecnología y las matemáticas.
                </p>
            </div>

            <div class="contador-integrantes ms-lg-auto">
                <FontAwesomeIcon icon="users" />
                <span>{{ integrantes.length }} integrantes</span>
            </div>
        </section>

        <!-- Integrantes -->
        <section class="integrantes-section">
            <div class="row g-4 justify-content-center">

                <div
                    v-for="integrante in integrantes"
                    :key="integrante.carne"
                    class="col-12 col-md-6 col-xl-5"
                >
                    <article class="integrante-card h-100">

                        <!-- Franja decorativa -->
                        <div class="tarjeta-acento"></div>

                        <div class="integrante-contenido">

                            <!-- Fotografía -->
                            <div class="foto-contenedor">
                                <img
                                    :src="integrante.foto"
                                    :alt="`Fotografía de ${integrante.nombre}`"
                                    class="foto-integrante"
                                    loading="lazy"
                                />

                                <div class="foto-insignia">
                                    <FontAwesomeIcon icon="user-graduate" />
                                </div>
                            </div>

                            <!-- Datos -->
                            <div class="informacion-integrante">
                                <span class="etiqueta-integrante">
                                    <span class="indicador"></span>
                                    INTEGRANTE DEL EQUIPO
                                </span>

                                <h3 class="nombre-integrante">
                                    {{ integrante.nombre }}
                                </h3>

                                <div class="separador-nombre"></div>

                                <div class="datos-integrante">
                                    <div class="dato-icono">
                                        <FontAwesomeIcon icon="id-card" />
                                    </div>

                                    <div class="dato-contenido">
                                        <span class="dato-etiqueta">
                                            Carné estudiantil
                                        </span>

                                        <span class="dato-valor">
                                            {{ integrante.carne }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer class="integrante-footer">
                            <FontAwesomeIcon icon="graduation-cap" />
                            <span>Equipo de trabajo</span>
                        </footer>

                    </article>
                </div>

            </div>
        </section>

        <!-- Pie de página -->
        <footer class="pagina-footer mt-5">
            <div class="footer-linea"></div>

            <p class="mb-0">
                Desarrollado con
                <FontAwesomeIcon
                    icon="heart"
                    class="footer-corazon"
                />
                y trabajo en equipo.
            </p>
        </footer>

    </div>
</template>

<script setup>
import { computed } from 'vue';

import fabricio from '@/assets/images/Fabricio.jpeg';
import andrea from '@/assets/images/Andrea.jpeg';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const integrantes = computed(() => [
    {
        nombre: 'Fabricio Aramis Mejía Castro',
        carne: '1390-26-8291',
        foto: fabricio,
    },
    {
        nombre: 'Andrea Elisa Cardona Martínez',
        carne: '1390-26-4171',
        foto: andrea,
    },
]);
</script>

<style scoped></style>