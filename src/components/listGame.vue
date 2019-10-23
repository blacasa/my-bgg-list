<template>
    <div>  
        {{ liste.name }} ({{ liste.list.length }})
    </div>
</template>

<script>
import constant from '../constants'

export default {
    name: 'liste',
    props: {
        liste: {}
    },
    data: function() {
        return {
            lists: [],
        };
    },
}
</script>

<style scoped>

</style>