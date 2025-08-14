let googleChanges = false;

function applyGoogleReviewChanges() {
    const qtyEls = document.querySelectorAll(".agrs__rating-line-qty");
    if (qtyEls.length !== 5) return; // Wait until all are loaded

    const counts = Array.from(qtyEls).map(el => parseInt(el.textContent.trim(), 10) || 0);
    const weights = [5, 4, 3, 2, 1];
    const totalReviews = counts.reduce((sum, c) => sum + c, 0);
    const totalScore = counts.reduce((sum, count, i) => sum + count * weights[i], 0);
    const avg = totalReviews > 0 ? (totalScore / totalReviews) : 0;

    // Build stars
    let fullStars = Math.floor(avg);
    let halfStar = avg % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<span style="color:#fbbc05;font-size:42px;">&#9733;</span>`;
    }
    if (halfStar) {
        starsHtml += `<span style="color:#fbbc05;font-size:42px;">&#189;</span>`;
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<span style="color:#ccc;font-size:42px;">&#9733;</span>`;
    }

    document.querySelector(".agrs__summary").innerHTML = `
        <div class="average-star-rating-container">
            <div class="stars">${starsHtml}</div>
            <div class="average-star-rating">${avg.toFixed(1)} out of 5.0 Stars</div>
        </div>
    `;

    // Move stars & review text together for each card
    document.querySelectorAll(".agrs__card").forEach(card => {
        const starsWrapper = card.querySelector(".agrs__card__stars-wrapper");
        const reviewText = card.querySelector(".agrs__card__text");
        if (starsWrapper && reviewText && !card.querySelector(".agrs__card-review-group")) {
            const groupDiv = document.createElement("div");
            groupDiv.className = "agrs__card-review-group";
            starsWrapper.parentNode.insertBefore(groupDiv, starsWrapper);
            groupDiv.appendChild(starsWrapper);
            groupDiv.appendChild(reviewText);
        }
    });

    googleChanges = true;
}

// Observe changes in reviews section
const reviewsContainer = document.querySelector(".agrs");
if (reviewsContainer) {
    const observer = new MutationObserver(() => {
        if (!googleChanges) applyGoogleReviewChanges();
    });
    observer.observe(reviewsContainer, { childList: true, subtree: true });
}

// Initial attempt
applyGoogleReviewChanges();
