```vue
<template>
    <button
        :type="type"
        class="btn"
        :class="`btn-${color}`"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: 'primary',
    },
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>
```