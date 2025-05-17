document.addEventListener('DOMContentLoaded', () => {
    // Get order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {
        orderNumber: Math.floor(10000 + Math.random() * 90000),
        itemCount: 3,
        totalAmount: '₹254.75',
        deliveryAddress: '123 Main St, City, Country'
    };

    // Update the DOM with order details
    document.getElementById('order-number').textContent = orderDetails.orderNumber;
    document.getElementById('item-count').textContent = orderDetails.itemCount;
    document.getElementById('total-amount').textContent = orderDetails.totalAmount;
    document.getElementById('delivery-address').textContent = orderDetails.deliveryAddress;

    // Add animation classes
    const elements = document.querySelectorAll('.detail-item, .summary-item');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
    });

    // Add CSS for fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Clear order details from localStorage after displaying
    localStorage.removeItem('orderDetails');
}); 