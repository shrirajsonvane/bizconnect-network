// Business registration logic (frontend prototype)

const form = document.getElementById("businessForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

    const business = {
        id: Date.now(),
        businessName: businessName.value,
        ownerName: ownerName.value,
        email: email.value,
        phone: phone.value,
        city: city.value,
        category: category.value,
        years: years.value,
        status: "Pending",
        registeredAt: new Date().toLocaleString()
    };

    businesses.push(business);
    localStorage.setItem("businesses", JSON.stringify(businesses));

    document.getElementById("formCard").style.display = "none";
    document.getElementById("successMessage").classList.add("show");

    form.reset();
});