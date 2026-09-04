(() => {
    const userToken = () => localStorage.getItem("userToken");

    function showAuthToast(message) {
        let toast = document.getElementById("authToast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "authToast";
            toast.className = "auth-toast";
            document.body.appendChild(toast);
        }

        toast.innerHTML = `${message} <a href="user-login.html">Login</a>`;
        toast.classList.add("visible");

        window.clearTimeout(showAuthToast.timeout);
        showAuthToast.timeout = window.setTimeout(() => {
            toast.classList.remove("visible");
        }, 5000);
    }

    function setupNavbar() {
        document.querySelectorAll(".navbar").forEach((navbar) => {
            navbar.querySelectorAll("a.login-btn, a[href=\"login.html\"], a[href=\"./login.html\"]")
                .forEach((link) => link.remove());
            navbar.querySelectorAll(".auth-nav-link").forEach((link) => link.remove());

            const link = document.createElement("a");
            link.className = "auth-nav-link";

            if (userToken()) {
                link.href = "#";
                link.textContent = "Logout";
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user");
                    window.location.reload();
                });
            } else {
                link.href = "login.html";
                link.textContent = "Login";
            }

            navbar.appendChild(link);
        });
    }

    function requireUser(formId, actionName) {
        const form = document.getElementById(formId);

        if (!form) {
            return;
        }

        form.addEventListener("submit", (event) => {
            if (!userToken()) {
                event.preventDefault();
                event.stopImmediatePropagation();
                showAuthToast(`Please login to ${actionName}.`);
            }
        }, true);
    }

    setupNavbar();
    requireUser("contactForm", "send a message");
    requireUser("quoteForm", "request a quote");
    requireUser("consultationForm", "book a consultation");
})();
