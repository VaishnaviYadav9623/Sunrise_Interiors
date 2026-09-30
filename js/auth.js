(() => {
    function getSession() {
        if (localStorage.getItem("adminToken")) {
            return {
                account: localStorage.getItem("admin")
            };
        }

        if (localStorage.getItem("userToken")) {
            return {
                account: localStorage.getItem("user")
            };
        }

        return null;
    }

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

            const session = getSession();

            if (!session) {
                const link = document.createElement("a");
                link.className = "auth-nav-link";
                link.href = "login.html";
                link.textContent = "Login";
                navbar.appendChild(link);
                return;
            }

            let account = {};
            try {
                account = JSON.parse(session.account || "{}") || {};
            } catch {
                account = {};
            }

            const profile = document.createElement("div");
            profile.className = "auth-profile";

            const trigger = document.createElement("button");
            trigger.className = "auth-nav-link auth-profile-trigger";
            trigger.type = "button";
            trigger.textContent = "Profile";
            trigger.setAttribute("aria-haspopup", "true");
            trigger.setAttribute("aria-expanded", "false");

            const dropdown = document.createElement("div");
            dropdown.className = "auth-profile-dropdown";
            dropdown.hidden = true;

            const name = document.createElement("strong");
            name.className = "auth-profile-name";
            name.textContent = account.name || "Account";

            const email = document.createElement("span");
            email.className = "auth-profile-email";
            email.textContent = account.email || "Email unavailable";

            const logout = document.createElement("button");
            logout.className = "auth-profile-logout";
            logout.type = "button";
            logout.textContent = "Logout";
            logout.addEventListener("click", () => {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                window.location.reload();
            });

            trigger.addEventListener("click", () => {
                const isExpanded = trigger.getAttribute("aria-expanded") === "true";
                trigger.setAttribute("aria-expanded", String(!isExpanded));
                dropdown.hidden = isExpanded;
            });

            document.addEventListener("click", (event) => {
                if (!profile.contains(event.target)) {
                    trigger.setAttribute("aria-expanded", "false");
                    dropdown.hidden = true;
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    trigger.setAttribute("aria-expanded", "false");
                    dropdown.hidden = true;
                }
            });

            dropdown.append(name, email, logout);
            profile.append(trigger, dropdown);
            navbar.appendChild(profile);
        });
    }

    function requireUser(formId, actionName) {
        const form = document.getElementById(formId);

        if (!form) {
            return;
        }

        form.addEventListener("submit", (event) => {
            if (!localStorage.getItem("userToken")) {
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
