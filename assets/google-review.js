setTimeout(() => {
    const qtyEls = document.querySelectorAll(".agrs__rating-line-qty");
    const counts = Array.from(qtyEls).map(el => parseInt(el.textContent.trim(), 10));

    if (counts.length === 5) {
        const weights = [5, 4, 3, 2, 1];
        let totalReviews = counts.reduce((sum, c) => sum + c, 0);
        let totalScore = counts.reduce((sum, count, i) => sum + count * weights[i], 0);

        let avg = totalReviews > 0 ? (totalScore / totalReviews) : 0;

        // Build HTML string for stars
        let starsHtml = '<div class="average-star-rating">';
        
        let fullStars = Math.floor(avg);
        let halfStar = avg % 1 >= 0.5 ? 1 : 0;
        let emptyStars = 5 - fullStars - halfStar;

        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<span style="color:#fbbc05">★</span>`;
        }
        if (halfStar) {
            starsHtml += `<span style="color:#fbbc05">☆</span>`; // placeholder half
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += `<span style="color:#ccc">★</span>`;
        }

        starsHtml += ` <span>${avg.toFixed(2)} / 5</span>`;
        starsHtml += '</div>';

        // Replace the content of .agrs__summary
        document.querySelector(".agrs__summary").innerHTML = starsHtml;
    }
}, 1000);
