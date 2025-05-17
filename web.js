document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const product = event.target.closest('.product');
            const productName = product.querySelector('h3').textContent;

        });
    });
});
