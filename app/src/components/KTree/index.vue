<template>
    <li>
        <div @click="toggle">
            {{tree.title}}
            <span v-if="isFolder">[{{isOpen ? '-' : '+'}}]</span>
        </div>
        <ul v-if="isFolder" v-show="isOpen">
            <TreeNode v-for="node in tree.children" :tree="node" :key="node.title"></TreeNode>  
        </ul>
    </li>
  
</template>

<script>
export default {
    name: 'TreeNode',
    props: {
        tree: Object
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        isFolder() {
            return this.tree.children && this.tree.children.length;
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen
            }
        }
    }

}
</script>

<style>

</style>