document.addEventListener("DOMContentLoaded", function () {
    // Get order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {
        itemCount: 3,
        totalAmount: '₹254.75',
        deliveryAddress: '123 Main St, City, Country'
    };

    // Update the order summary
    document.getElementById('subtotal').textContent = '₹195.00';
    document.getElementById('gst').textContent = '₹9.75';
    document.getElementById('delivery').textContent = '₹50.00';
    document.getElementById('total').textContent = orderDetails.totalAmount;

    // Get payment method options
    const methodOptions = document.querySelectorAll(".method-option");
    const cardForm = document.getElementById("card-form");
    const upiForm = document.getElementById("upi-form");
    const netbankingForm = document.getElementById("netbanking-form");
    const payNowBtn = document.getElementById("pay-now");

    // Card input fields
    const cardNumber = document.getElementById("card-number");
    const expiry = document.getElementById("expiry");
    const cvv = document.getElementById("cvv");
    const cardName = document.getElementById("card-name");

    // UPI input field
    const upiId = document.getElementById("upi-id");

    // Bank select
    const bankSelect = document.getElementById("bank");

    // Handle payment method selection
    methodOptions.forEach(option => {
        option.addEventListener("click", function () {
            // Remove active class from all options
            methodOptions.forEach(opt => opt.classList.remove("active"));
            
            // Add active class to selected option
            this.classList.add("active");

            // Show corresponding form
            const method = this.dataset.method;
            cardForm.style.display = method === "card" ? "block" : "none";
            upiForm.style.display = method === "upi" ? "block" : "none";
            netbankingForm.style.display = method === "netbanking" ? "block" : "none";
        });
    });

    // Format card number
    cardNumber.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{4})/g, "$1 ").trim();
        e.target.value = value;
    });

    // Format expiry date
    expiry.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    });

    // Format CVV (numbers only)
    cvv.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    // Handle UPI app selection
    document.querySelectorAll(".upi-app").forEach(app => {
        app.addEventListener("click", function () {
            document.querySelectorAll(".upi-app").forEach(a => a.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Handle pay now button click
    payNowBtn.addEventListener("click", function () {
        // Validate form based on selected payment method
        const activeMethod = document.querySelector(".method-option.active");
        if (!activeMethod) {
            alert("Please select a payment method");
            return;
        }

        const method = activeMethod.dataset.method;
        let isValid = true;

        if (method === "card") {
            if (!cardNumber.value || cardNumber.value.replace(/\s/g, "").length !== 16) {
                isValid = false;
                alert("Please enter a valid card number");
            } else if (!expiry.value || !/^\d{2}\/\d{2}$/.test(expiry.value)) {
                isValid = false;
                alert("Please enter a valid expiry date");
            } else if (!cvv.value || cvv.value.length !== 3) {
                isValid = false;
                alert("Please enter a valid CVV");
            } else if (!cardName.value) {
                isValid = false;
                alert("Please enter cardholder name");
            }
        } else if (method === "upi") {
            if (!upiId.value || !/^[\w.-]+@[\w.-]+$/.test(upiId.value)) {
                isValid = false;
                alert("Please enter a valid UPI ID");
            }
        } else if (method === "netbanking") {
            if (!bankSelect.value) {
                isValid = false;
                alert("Please select a bank");
            }
        }

        if (isValid) {
            // Show loading state
            payNowBtn.disabled = true;
            payNowBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Simulate payment processing
            setTimeout(() => {
                // Save order details to localStorage
                const orderDetails = {
                    orderNumber: Math.floor(10000 + Math.random() * 90000),
                    itemCount: 3,
                    totalAmount: document.getElementById("total").textContent,
                    deliveryAddress: "123 Main St, City, Country"
                };
                localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

                // Redirect to order confirmation page
                window.location.href = "order-confirmed.html";
            }, 2000);
        }
    });

    // Load order summary from previous page
    function loadOrderSummary() {
        const subtotal = localStorage.getItem("subtotal") || "₹195.00";
        const gst = localStorage.getItem("gst") || "₹9.75";
        const delivery = localStorage.getItem("delivery") || "₹50.00";
        const total = localStorage.getItem("total") || "₹254.75";

        document.getElementById("subtotal").textContent = subtotal;
        document.getElementById("gst").textContent = gst;
        document.getElementById("delivery").textContent = delivery;
        document.getElementById("total").textContent = total;
    }

    loadOrderSummary();
}); 