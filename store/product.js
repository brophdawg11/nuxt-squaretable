export default {
    state: () => ({
        catalogData: null,
    }),

    mutations: {
        setProduct(state, data) {
            state.catalogData = data;
        },
    },

    actions: {
        async loadProduct({ commit }, slug) {
            const url = `/catalog/v0/{siteId}/pools/US_DIRECT/products?slug=${slug}`;
            const [data] = await this.$a15Svc.a15Client.get(url);
            commit('setProduct', data);
        },
    },
}
