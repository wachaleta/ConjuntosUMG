```vue
<template>
    <div class="mb-3">
        <label v-if="$slots.default" class="form-label">
            <slot />
        </label>

        <div class="input-group">
            <input
                v-model="model"
                :type="type"
                :placeholder="placeholder"
                class="form-control"
                :disabled="disabled"
            />
        </div>
    </div>
</template>

<script setup>
const model = defineModel({
    type: String,
    default: '',
});

defineProps({
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: 'Escribe aquí...',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.form-label {
    color: #454b60;
    font-size: 0.86rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.form-control {
    min-height: 44px;
    border-color: #e0e3ed;
    border-radius: 10px;
    font-size: 0.9rem;
    box-shadow: none;
}

.form-control:focus {
    border-color: #958cff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
}
</style>
```