<template>
    <div>
        <input type="text" @input="onInput" :value="value" v-bind="$attrs">
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value);
            this.$parent.$emit('validate');
        }
    }

}
</script>

<style>

</style>