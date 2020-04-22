import A15JsService from 'a15-js-service';

export default (ctx, inject) => {
    const a15Svc = new A15JsService({
        host: '',
        siteId: 'an-us',
        currency: 'USD',
        language: 'en-US',
    });

    inject('a15Svc', a15Svc);
}
