
document.addEventListener("DOMContentLoaded", function() {
    // Step 1: Select all rating quantities
    const qtyEls = document.querySelectorAll(".agrs__rating-line-qty");

    // Step 2: Extract values in order: 5★, 4★, 3★, 2★, 1★
    const counts = Array.from(qtyEls).map(el => parseInt(el.textContent.trim(), 10));

    // Ensure we actually got 5 numbers
    if (counts.length === 5) {
        const weights = [5, 4, 3, 2, 1];
        let totalReviews = counts.reduce((sum, c) => sum + c, 0);
        let totalScore = counts.reduce((sum, count, i) => sum + count * weights[i], 0);

        let avg = totalReviews > 0 ? (totalScore / totalReviews) : 0;

        console.log("Average Rating:", avg.toFixed(2));

        // Step 3: Render stars for the average
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

        // Step 4: Show average number beside stars
        const avgText = document.createElement("span");
        avgText.textContent = ` ${avg.toFixed(2)} / 5`;
        avgStarsContainer.appendChild(avgText);

        // Step 5: Append to page
        console.log(avgStarsContainer);
        
        document.querySelector(".agrs__summary__info").appendChild(avgStarsContainer);
    }
});

