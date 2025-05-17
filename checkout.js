document.addEventListener("DOMContentLoaded", function () {
    const removeButtons = document.querySelectorAll(".remove-btn");
    const subtotalPriceElement = document.getElementById("subtotal-price");
    const gstAmountElement = document.getElementById("gst-amount");
    const finalPriceElement = document.getElementById("final-price");
    const itemCountElement = document.getElementById("item-count");
    const GST_RATE = 0.05; // 5% GST
    const DELIVERY_CHARGES = 50.00;

    function updateQuantity(button, change) {
        const quantityElement = button.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElement.textContent);
        quantity = Math.max(1, quantity + change); // Ensure quantity doesn't go below 1
        quantityElement.textContent = quantity;

        // Update item total
        const row = button.closest("tr");
        const price = parseFloat(row.querySelector(".price").textContent.replace("₹", ""));
        const itemTotal = row.querySelector(".item-total");
        itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;

        updateTotals();
    }

    function updateTotals() {
        let subtotal = 0;
        let itemCount = 0;

        document.querySelectorAll("tbody tr").forEach(row => {
            const quantity = parseInt(row.querySelector(".quantity").textContent);
            const price = parseFloat(row.querySelector(".price").textContent.replace("₹", ""));
            subtotal += price * quantity;
            itemCount += quantity;
        });

        const gst = subtotal * GST_RATE;
        const finalAmount = subtotal + gst + DELIVERY_CHARGES;

        subtotalPriceElement.textContent = `₹${subtotal.toFixed(2)}`;
        gstAmountElement.textContent = `₹${gst.toFixed(2)}`;
        finalPriceElement.textContent = `₹${finalAmount.toFixed(2)}`;
        itemCountElement.textContent = `${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`;

        // Store values in localStorage for payment page
        localStorage.setItem('cartSubtotal', subtotal.toFixed(2));
        localStorage.setItem('cartGST', gst.toFixed(2));
        localStorage.setItem('cartDelivery', DELIVERY_CHARGES.toFixed(2));
        localStorage.setItem('cartTotal', finalAmount.toFixed(2));
    }

    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                updateTotals();
            }, 300); // Match this with CSS animation duration
        });
    });

    // Initialize quantity buttons
    document.querySelectorAll(".qty-btn").forEach(button => {
        button.addEventListener("click", function() {
            const change = this.textContent === "+" ? 1 : -1;
            updateQuantity(this, change);
        });
    });

    updateTotals();
});