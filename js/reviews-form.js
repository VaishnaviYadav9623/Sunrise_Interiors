const reviewForm = document.getElementById("customerReviewForm");
const reviewStatus = document.getElementById("reviewFormStatus");
const photoInput = document.getElementById("reviewPhotos");
const photoPreview = document.getElementById("photoPreview");

photoInput.addEventListener("change", () => {
    photoPreview.replaceChildren();
    const files = Array.from(photoInput.files || []);
    if (files.length > 4) {
        photoInput.value = "";
        reviewStatus.textContent = "Please select no more than 4 photos.";
        reviewStatus.className = "review-status error";
        return;
    }
    for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
            photoInput.value = "";
            photoPreview.replaceChildren();
            reviewStatus.textContent = "Each photo must be 5 MB or smaller.";
            reviewStatus.className = "review-status error";
            return;
        }
        const img = document.createElement("img");
        img.alt = "Selected review photo preview";
        img.src = URL.createObjectURL(file);
        photoPreview.appendChild(img);
    }
    reviewStatus.textContent = "";
    reviewStatus.className = "review-status";
});

reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    reviewStatus.textContent = "";
    reviewStatus.className = "review-status";
    const submitButton = reviewForm.querySelector('button[type="submit"]');
    const data = new FormData(reviewForm);

    if (!data.get("rating")) {
        reviewStatus.textContent = "Please select a star rating.";
        reviewStatus.className = "review-status error";
        return;
    }
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    try {
        const response = await fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            body: data
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || "Review could not be submitted.");
        reviewForm.reset();
        photoPreview.replaceChildren();
        reviewStatus.textContent = result.message || "Thank you! Your review is awaiting approval.";
        reviewStatus.className = "review-status success";
    } catch (error) {
        reviewStatus.textContent = `${error.message} Check that the Sunrise backend is running.`;
        reviewStatus.className = "review-status error";
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Submit review <span>↗</span>';
    }
});
