const CART_STORAGE_KEY = "theVaultCart";
const CART_PAGE_PATH = "../../../Parte V/Venta de Vinilos/carrito.html";

function getCart() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    try {
        const safeCart = Array.isArray(cart) ? cart : [];
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(safeCart));
    } catch (error) {
        // Si el navegador bloquea storage, evitamos romper la página.
    }
}

function formatCurrency(value) {
    return `$${(Number(value) || 0).toFixed(2)}`;
}

function getCartTotal(cart = getCart()) {
    return cart.reduce(function(sum, item) {
        return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
}

function normalizePrice(priceText) {
    const numericValue = String(priceText || "").replace(/[^0-9.]+/g, "");
    return Number.parseFloat(numericValue) || 0;
}

function slugify(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function updateQuantity(nextQuantity) {
    const numero = document.getElementById("numero");

    if (!numero) {
        return 1;
    }

    const quantity = Math.max(1, Number.parseInt(nextQuantity, 10) || 1);
    numero.textContent = String(quantity);
    return quantity;
}

function aumentar() {
    const numero = document.getElementById("numero");
    const cantidad = Number.parseInt(numero && numero.textContent, 10) || 1;

    updateQuantity(cantidad + 1);
}

function disminuir() {
    const numero = document.getElementById("numero");
    const cantidad = Number.parseInt(numero && numero.textContent, 10) || 1;

    updateQuantity(cantidad - 1);
}

function cambiarColor(boton) {
    if (!boton) {
        return;
    }

    boton.style.backgroundColor = "#555";

    setTimeout(function() {
        boton.style.backgroundColor = "black";
    }, 200);
}

function buildProductData() {
    const titleNode = document.querySelector("#derecha h2") || document.querySelector("#izquierda h2");
    const priceNode = document.querySelector(".precio");
    const imageNode = document.querySelector(".imagen");
    const fileName = decodeURIComponent((window.location.pathname.split("/").pop() || "").replace(/\.html$/i, ""));

    return {
        id: slugify(fileName || (titleNode && titleNode.textContent) || "producto"),
        name: titleNode ? titleNode.textContent.trim() : fileName,
        price: normalizePrice(priceNode ? priceNode.textContent : ""),
        image: imageNode ? new URL(imageNode.getAttribute("src"), window.location.href).href : "",
        quantity: updateQuantity(document.getElementById("numero") ? document.getElementById("numero").textContent : 1),
        productPath: window.location.href.split("#")[0]
    };
}

function addItemToCart(product) {
    if (!product || !product.id) {
        return getCart();
    }

    const cart = getCart();
    const existingItem = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity = (Number(existingItem.quantity) || 0) + (Number(product.quantity) || 1);
        existingItem.name = product.name;
        existingItem.price = product.price;
        existingItem.image = product.image;
        existingItem.productPath = product.productPath;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: Number(product.quantity) || 1,
            productPath: product.productPath
        });
    }

    saveCart(cart);
    return cart;
}

function goToCart() {
    window.location.href = CART_PAGE_PATH;
}

function showCartNotice(cartIcon) {
    if (!cartIcon) {
        return;
    }

    cartIcon.classList.remove("carrito-alerta-visible");
    void cartIcon.offsetWidth;
    cartIcon.classList.add("carrito-alerta-visible");
}

function attachProductPageActions() {
    const actionButtons = Array.from(document.querySelectorAll(".botones .boton"));
    const cartIcon = document.querySelector("#barra > span:last-child, .cart-link");

    if (cartIcon) {
        cartIcon.classList.add("icono-carrito");
        cartIcon.style.cursor = "pointer";
        cartIcon.setAttribute("role", "link");
        cartIcon.setAttribute("tabindex", "0");
        cartIcon.setAttribute("aria-label", "Abrir carrito");
        cartIcon.addEventListener("click", goToCart);
        cartIcon.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToCart();
            }
        });

        // Mantener el ícono de alerta visible mientras el carrito tenga al menos un producto
        if (getCart().length > 0) {
            cartIcon.classList.add("carrito-alerta-visible");
        } else {
            cartIcon.classList.remove("carrito-alerta-visible");
        }
    }

    if (!actionButtons.length) {
        return;
    }

    const addButton = actionButtons.find(function(button) {
        return button.textContent.toUpperCase().includes("AGREGAR");
    });
    const buyButton = actionButtons.find(function(button) {
        return button.textContent.toUpperCase().includes("COMPRAR");
    });

    if (addButton) {
        addButton.addEventListener("click", function(event) {
            event.preventDefault();
            addItemToCart(buildProductData());
            showCartNotice(cartIcon);
        });
    }

    if (buyButton) {
        buyButton.addEventListener("click", function(event) {
            event.preventDefault();
            addItemToCart(buildProductData());
            showCartNotice(cartIcon);
            goToCart();
        });
    }
}

attachProductPageActions();

window.TheVaultCart = {
    key: CART_STORAGE_KEY,
    getCart: getCart,
    saveCart: saveCart,
    addItemToCart: addItemToCart,
    formatCurrency: formatCurrency,
    getCartTotal: getCartTotal
};
