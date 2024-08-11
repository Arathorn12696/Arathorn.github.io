gsap.registerPlugin(ScrollTrigger);

// Create masks
function createMasks() {
    const imgs = document.querySelectorAll(".img");
    imgs.forEach((img) => {
        for (let i = 0; i < initialClipPaths.length; i++) {
            const mask = document.createElement("div");
            mask.classList.add("mask", `m-${i}`);
            img.appendChild(mask);
        }
    });
}

// Initial and final clip paths
const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
    "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
    "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
    "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
    "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
    "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
    "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
    "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
];

const finalClipPaths = [
    "polygon(0% 0%, 33% 0%, 33% 33%, 0% 33%)",
    "polygon(33% 0%, 66% 0%, 66% 33%, 33% 33%)",
    "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33%)",
    "polygon(0% 33%, 33% 33%, 33% 66%, 0% 66%)",
    "polygon(33% 33%, 66% 33%, 66% 66%, 33% 66%)",
    "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66%)",
    "polygon(0% 66%, 33% 66%, 33% 100%, 0% 100%)",
    "polygon(33% 66%, 66% 66%, 66% 100%, 33% 100%)",
    "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
];

// Initialize masks
createMasks();

const rows = gsap.utils.toArray(".row");

rows.forEach((row) => {
    const imgs = row.querySelectorAll(".img");

    imgs.forEach((img) => {
        const masks = img.querySelectorAll(".mask");

        masks.forEach((mask, index) => {
            gsap.set(mask, {
                clipPath: initialClipPaths[index],
            });
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 75%",
                end: "top 75%",
                scrub: false,
                onEnter: () => {
                    // Start the animation when entering the trigger point
                    gsap.to(
                        masks,
                        {
                            clipPath: (i, el) => finalClipPaths[i],
                            duration: 1,
                            ease: "power2.out",
                            stagger: 0.1,
                        }
                    );
                },
                onLeaveBack: () => {
                    // Ensure the animation does not reverse
                    gsap.killTweensOf(masks);
                }
            },
        });
    });
});
