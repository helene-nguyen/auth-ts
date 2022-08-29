function renderHomePage(req, res) {
    const foo = { name: 'Bar' };
    const baz = 'string';
    console.log('baz: ', baz);
    res.status(200).json(foo);
}
export { renderHomePage };
//# sourceMappingURL=homePage.js.map