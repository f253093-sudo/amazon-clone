        let cart = [];
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel img');

        function searchProducts() {
            const query = document.getElementById('search-input').value.toLowerCase().trim();
            const products = document.querySelectorAll('.product-card');
            let found = false;

            products.forEach(product => {
                const keywords = product.getAttribute('data-name') || "";
                if (keywords.includes(query) || query === "") {
                    product.classList.add('show');
                    found = true;
                } else {
                    product.classList.remove('show');
                }
            });
            document.getElementById('no-results').style.display = (found || query === "") ? "none" : "block";
        }

        function addToCart(name, price, image) {
            cart.push({ name, price, image });
            updateCart();
            alert(name + " added to cart!");
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateCart() {
            const itemsDiv = document.getElementById('cart-items');
            const count = document.getElementById('cart-count');
            const total = document.getElementById('cart-total');
            count.textContent = cart.length;

            if (cart.length === 0) {
                itemsDiv.innerHTML = "<p style='text-align:center;color:#999;padding:40px;'>Your cart is empty</p>";
                total.textContent = "0.00";
                return;
            }

            itemsDiv.innerHTML = "";
            let sum = 0;
            cart.forEach((item, i) => {
                sum += item.price;
                itemsDiv.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <strong>${item.name}</strong><br>
                            $${item.price.toFixed(2)}
                            <div class="remove-item" onclick="removeFromCart(${i})">Remove</div>
                        </div>
                    </div>`;
            });
            total.textContent = sum.toFixed(2);
        }

        function toggleCart() {
            document.getElementById('side-cart').classList.toggle('open');
        }

        function changeSlide(dir) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + dir + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(() => changeSlide(1), 6000);
        slides[0].classList.add('active');
        searchProducts();
