<template>
    <div>
        <h1>{{ $route.params.slug }}</h1>
        <p>Selected Sku: {{ selectedSku.skuId }}</p>
        <div class="container">
            <img :src="image" />
            <ul>
                <li v-for="color in colors">
                    {{ color.displayName }}
                    <ul>
                        <li v-for="fit in color.fits">
                            {{ fit.displayName }}
                            <ul>
                                <li v-for="size in fit.sizes" @click="selectedSku = size.sku">
                                    {{ size.displayName }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    transition: 'fancy',
    async middleware({ params, store }) {
        await store.dispatch('product/loadProduct', params.slug);
    },
    data() {
        const catalogData = this.$store.state.product.catalogData;
        const colors = catalogData.skuInfo.primarySlice.sliceItems;
        return {
            selectedSku: colors[0].includedSkus[0],
        };
    },
    computed: {
        ...mapState('product', ['catalogData']),
        colors() {
            const colors = this.catalogData.skuInfo.primarySlice.sliceItems;
            const fits = this.catalogData.skuInfo.secondarySlice.sliceItems;
            const skus = colors.reduce((acc, color) => acc.concat(color.includedSkus), []);
            const skuInFit = (sku, fit) => fit.includedSizes.some(s => s.id === sku.sizeId);
            const fitInColor = (fit, color) => color.includedSkus.some(s => skuInFit(s, fit));
            const skuForColorSize = (sku, color, size) => (
                sku.colorId === color.code && sku.sizeId === size.id
            );
            return colors.map(color => ({
                ...color,
                fits: fits
                    .filter(fit => fitInColor(fit, color))
                    .map(fit => ({
                        ...fit,
                        sizes: fit.includedSizes.map(size => ({
                            ...size,
                            sku: skus.find(s => skuForColorSize(s, color, size)),
                        }))
                    }))
            }));
        },
        image() {
            const baseImageUrl = 'https://s7d5.scene7.com/is/image/Anthropologie';
            const style = this.catalogData.product.styleNumber;
            const color = this.selectedSku.colorId;
            const code = this.colors.find(c => c.code === color).images[0];
            return `${baseImageUrl}/${style}_${color}_${code}`;
        },
    },
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
