
document.addEventListener("DOMContentLoaded", loadCustomerReviews);

async function loadCustomerReviews() {
    const grid = document.getElementById("customerReviewsGrid");

    if (!grid) {
        console.error("Reviews error: customerReviewsGrid was not found.");
        return;
    }

    // Prevent reveal animations from hiding the reviews section.
    const section = grid.closest(".customer-reviews-section");
    if (section) {
        section.removeAttribute("data-reveal");
        section.classList.add("reviews-visible");
    }

    grid.innerHTML = "<p>Loading customer reviews...</p>";

    try {
        const response = await fetch(
            "http://localhost:5000/api/reviews/approved"
        );

        if (!response.ok) {
            throw new Error("API returned status " + response.status);
        }

        const reviews = await response.json();
        console.log("Approved reviews received:", reviews);

        if (!Array.isArray(reviews) || reviews.length === 0) {
            grid.innerHTML = "<p>No approved reviews yet.</p>";
            return;
        }

        grid.innerHTML = reviews.map(function (review) {
            const name = escapeReviewText(review.name || "Customer");
            const project = escapeReviewText(review.projectType || "Interior Project");
            const message = escapeReviewText(review.message || "");
            const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));

            const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

            const photos = Array.isArray(review.photos)
                ? review.photos
                : [];

            const photoHTML = photos.map(function (photo) {
                const photoURL = photo.startsWith("http")
                    ? photo
                    : "http://localhost:5000" +
                      (photo.startsWith("/") ? photo : "/" + photo);

                return `
                    <img
                        class="customer-review-photo"
                        src="${escapeReviewText(photoURL)}"
                        alt="Photo shared by ${name}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                `;
            }).join("");

            return `
                <article class="customer-review-card">
                    <div class="customer-review-stars" aria-label="${rating} out of 5 stars">
                        ${stars}
                    </div>

                    <p class="customer-review-message">${message}</p>

                    ${photoHTML ? `
                        <div class="customer-review-photos">
                            ${photoHTML}
                        </div>
                    ` : ""}

                    <h3 class="customer-review-name">${name}</h3>
                    <p class="customer-review-project">${project}</p>
                </article>
            `;
        }).join("");

    } catch (error) {
        console.error("Could not load customer reviews:", error);
        grid.innerHTML =
            "<p>Reviews could not be loaded. Please try again later.</p>";
    }
}

function escapeReviewText(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];
    });
}
