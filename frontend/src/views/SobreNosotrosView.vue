<template>
    <div class="container-fluid conjuntos-page py-4 px-3 px-lg-4">

        <!-- Encabezado -->
        <header
            class="page-header mb-4 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3"
        >
            <div class="d-flex align-items-center gap-3">
                <div class="header-icon flex-shrink-0">
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

            <div class="ms-md-auto flex-shrink-0">
                <RouterLink
                    :to="{ name: 'home' }"
                    class="btn btn-success btn-regresar w-100 w-md-auto"
                >
                    <FontAwesomeIcon icon="shapes" class="me-2" />
                    <span>Operaciones de conjuntos</span>
                    <FontAwesomeIcon
                        icon="arrow-right"
                        class="icono-flecha ms-2"
                    />
                </RouterLink>
            </div>
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
import Ferdy from '@/assets/images/Ferdy.jpeg';
import Jacky from '@/assets/images/Jacky.jpeg';
import Kristhell from '@/assets/images/Kristhell.jpeg';
import Keylin from '@/assets/images/Keylin.jpeg';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const integrantes = computed(() => [
    {
        nombre: 'Fabricio Aramis Mejía Castro',
        carne: '1390-26-8291',
        foto: fabricio,
    },
    {
        nombre: 'Ferdy Guillermo Rodríguez Vásquez',
        carne: '1390-26-167',
        foto: Ferdy,
    },
    {
        nombre: 'Andrea Elisa Cardona Martínez',
        carne: '1390-26-4171',
        foto: andrea,
    },
    {
        nombre: 'Jackelin Anaí Campos Osorio',
        carne: '1390-26-4174',
        foto: Jacky,
    },
    {
        nombre: 'Kristhell Dayana León Ramírez',
        carne: '1390-26-817',
        foto: Kristhell,
    },
    {
        nombre: 'Keylin Mariela Juárez Flores',
        carne: '1390-26-4897',
        foto: Keylin,
    },
]);
</script>

<style scoped></style>