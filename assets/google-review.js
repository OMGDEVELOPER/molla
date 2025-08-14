setTimeout(() => {
    const qtyEls = document.querySelectorAll(".agrs__rating-line-qty");
    const counts = Array.from(qtyEls).map(el => parseInt(el.textContent.trim(), 10));

    if (counts.length === 5) {
        const weights = [5, 4, 3, 2, 1];
        let totalReviews = counts.reduce((sum, c) => sum + c, 0);
        let totalScore = counts.reduce((sum, count, i) => sum + count * weights[i], 0);

        let avg = totalReviews > 0 ? (totalScore / totalReviews) : 0;

        // Build star HTML (supports half star)
        let fullStars = Math.floor(avg);
        let halfStar = avg % 1 >= 0.5 ? 1 : 0;
        let emptyStars = 5 - fullStars - halfStar;

        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<span style="color:#fbbc05;font-size:42px;">&#9733;</span>`; // ★
        }
        if (halfStar) {
            starsHtml += `<span style="color:#fbbc05;font-size:42px;">&#189;</span>`; // placeholder half
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += `<span style="color:#ccc;font-size:42px;">&#9733;</span>`; // empty star
        }

        // Final HTML for the block
        const reviewHtml = `
            <div style="">
                <div>${starsHtml}</div>
                <div class="average-star-rating">
                    ${avg.toFixed(1)} out of 5.0 Stars
                </div>
            </div>
        `;

        document.querySelector(".agrs__summary").innerHTML = reviewHtml;
    }
}, 100);

document.querySelectorAll(".agrs__card").forEach(card => {
    const starsWrapper = card.querySelector(".agrs__card__stars-wrapper");
    const reviewText = card.querySelector(".agrs__card__text");

    if (starsWrapper && reviewText) {
        // Create a new wrapper div
        const groupDiv = document.createElement("div");
        groupDiv.className = "agrs__card-review-group";

        // Insert before starsWrapper in DOM
        starsWrapper.parentNode.insertBefore(groupDiv, starsWrapper);

        // Move the starsWrapper and reviewText into the new group div
        groupDiv.appendChild(starsWrapper);
        groupDiv.appendChild(reviewText);
    }
});

