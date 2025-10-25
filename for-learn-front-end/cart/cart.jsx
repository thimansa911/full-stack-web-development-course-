// cart.js
export function GetCart() {
    let CartInString = localStorage.getItem("cart");

    if (!CartInString) {
        CartInString = "[]";
        localStorage.setItem("cart", CartInString);
    }

    return JSON.parse(CartInString);
}

export function AddToCart(pkg, qty, image) {
    const cart = GetCart();

    const packageImage = image ?? (Array.isArray(pkg.PackagePic) ? pkg.PackagePic[0] : pkg.PackageImage) ?? "/placeholder.png";
    const id = pkg.PackageID ?? crypto.randomUUID();

    const existingIndex = cart.findIndex((item) => item.PackageID === id);

    if (existingIndex === -1) {
        cart.push({
            PackageID: id,
            PackageName: pkg.PackageName,
            PackageImage: packageImage,
            PackagePrice: pkg.PackagePrice,
            quantity: qty,
        });
    } else {
        const newQty = cart[existingIndex].quantity + qty;
        if (newQty <= 0) {
            const newCart = cart.filter((_, i) => i !== existingIndex);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        } else {
            cart[existingIndex].quantity = newQty;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function RemoveFromCart(PackageID) {
    const cart = GetCart();
    const newCart = cart.filter((item) => item.PackageID !== PackageID);
    localStorage.setItem("cart", JSON.stringify(newCart));
}

export function ClearCart() {
    localStorage.setItem("cart", "[]");
}
