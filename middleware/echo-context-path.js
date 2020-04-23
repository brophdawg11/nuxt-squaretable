// Most similar to our router.beforeEach hooks?
export default function ({ store }) {
    console.log('store contextPath is', store.state.contextPath);
}
