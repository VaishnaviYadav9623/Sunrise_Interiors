const adminNameElement = document.getElementById("sidebarAdminName");
const adminEmailElement = document.getElementById("sidebarAdminEmail");
const welcomeMessageElement = document.getElementById("welcomeMessage");
const storedAdmin = localStorage.getItem("admin");
let admin = null;

if (storedAdmin) {
    try {
        admin = JSON.parse(storedAdmin);
    } catch (error) {
        localStorage.removeItem("admin");
    }
}

const adminName = admin?.name || "Sunrise Admin";

if (adminNameElement) {
    adminNameElement.textContent = adminName;
}

if (adminEmailElement) {
    adminEmailElement.textContent = admin?.email || "Email unavailable";
}

if (welcomeMessageElement) {
    welcomeMessageElement.textContent = adminName;
}
