setTimeout(() => {
    const qtyEls = document.querySelectorAll(".agrs__rating-line-qty");
    const counts = Array.from(qtyEls).map(el => parseInt(el.textContent.trim(), 10));

    if (counts.length === 5) {
        const weights = [5, 4, 3, 2, 1];
        let totalReviews = counts.reduce((sum, c) => sum + c, 0);
        let totalScore = counts.reduce((sum, count, i) => sum + count * weights[i], 0);

        let avg = totalReviews > 0 ? (totalScore / totalReviews) : 0;

        const avgStarsContainer = document.createElement("div");
        avgStarsContainer.className = "average-star-rating";
        
        let fullStars = Math.floor(avg);
        let halfStar = avg % 1 >= 0.5 ? 1 : 0;
        let emptyStars = 5 - fullStars - halfStar;

        for (let i = 0; i < fullStars; i++) {
            avgStarsContainer.innerHTML += `<span style="color:#fbbc05">★</span>`;
        }
        if (halfStar) {
            avgStarsContainer.innerHTML += `<span style="color:#fbbc05">☆</span>`; // placeholder half
        }
        for (let i = 0; i < emptyStars; i++) {
            avgStarsContainer.innerHTML += `<span style="color:#ccc">★</span>`;
        }

        const avgText = document.createElement("span");
        avgText.textContent = ` ${avg.toFixed(2)} / 5`;
        avgStarsContainer.appendChild(avgText);

        // Append instead of replacing
        document.querySelector(".agrs__summary").appendChild(avgStarsContainer);
    }
}, 2000);
