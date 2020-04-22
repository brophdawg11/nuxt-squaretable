<template>
    <div>
        <h1>{{ $route.params.slug }}</h1>
        <ul>
            <li v-for="tile in displayTiles">
                <nuxt-link :to="tile.url">
                    <img
                        :src="hovered[tile.slug] ? tile.hoverImage : tile.image"
                        @mouseenter="hoverImage(tile, true)"
                        @mouseleave="hoverImage(tile, false)" />

                    <p>{{ tile.name }}</p>

                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hovered: {},
        };
    },
    async asyncData(ctx) {
        const { app, params } = ctx;
        const { slug } = params;
        const url = `/catalog/v2/{siteId}/pools/US_DIRECT/navigation-items/${slug}/products`;
        const data = await app.$a15Svc.a15Client.get(url);
        return {
            tiles: data.records.map(r => r.allMeta.tile),
        };
    },
    computed: {
        displayTiles() {
            const baseImageUrl = 'https://s7d5.scene7.com/is/image/Anthropologie';
            return this.tiles.map(t => ({
                name: t.product.displayName,
                slug: t.product.productSlug,
                url: `/shop/${t.product.productSlug}`,
                image: `${baseImageUrl}/${t.faceOutImage}`,
                hoverImage: `${baseImageUrl}/${t.hoverImage || t.faceOutImage}`,
            }));
        },
    },
    methods: {
        hoverImage(tile, hovered) {
            console.log('Setting hovered for', tile.slug, hovered);
            this.$set(this.hovered, tile.slug, hovered);
        },
    }
}
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
    ul {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
