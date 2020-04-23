export default {
    state: () => ({
        contextPath: null,
    }),

    mutations: {
        setContextPath(state, contextPath) {
            state.contextPath = contextPath;
        },
    },

    actions: {
        // Most similar to our entry-server middleware
        nuxtServerInit({ commit }, { res, redirect }) {
            if (res.locals.contextPath !== '/') {
                console.log('Redirecting to base context path');
                redirect('/');
                return;
            }
            commit('setContextPath', res.locals.contextPath);
        },
    }
}
