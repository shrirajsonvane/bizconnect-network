// Admin dashboard logic for reviewing registered businesses
const ADMIN_PASSWORD = "bizconnect@2026";

// Auto-login if already authenticated
if (sessionStorage.getItem("admin") === "true") {
    showDashboard();
}

function login() {
    const pass = document.getElementById("adminPass").value;

    if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin", "true");
        showDashboard();
    } else {
        alert("Incorrect password");
    }
}

function logout() {
    sessionStorage.removeItem("admin");
    location.reload();
}

function showDashboard() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadBusinesses();
}

function loadBusinesses() {
    const businesses = JSON.parse(localStorage.getItem("businesses")) || [];
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    businesses.forEach(biz => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${biz.businessName}</td>
            <td>${biz.ownerName}</td>
            <td>${biz.city}</td>
            <td>${biz.registeredAt || "-"}</td>
            <td>${biz.status}</td>
            <td>
                ${
                    biz.status === "Pending"
                    ? `
                        <button class="approve" onclick="updateStatus(${biz.id}, 'Approved')">Approve</button>
                        <button class="reject" onclick="updateStatus(${biz.id}, 'Rejected')">Reject</button>
                      `
                    : "Finalized"
                }
            </td>
        `;
        table.appendChild(row);
    });
}

function updateStatus(businessId, newStatus) {
    let businesses = JSON.parse(localStorage.getItem("businesses")) || [];

    businesses = businesses.map(biz => {
        if (biz.id === businessId) {
            return { ...biz, status: newStatus };
        }
        return biz;
    });

    localStorage.setItem("businesses", JSON.stringify(businesses));
    loadBusinesses();
}