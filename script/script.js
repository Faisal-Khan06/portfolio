gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector('.card-container');
const distance = () => track.scrollWidth - window.innerWidth;

gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
        trigger: '.horizontal-section',
        pin: true,
        scrub: 1,
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true
    }
});

async function getContributions() {
    const myContribution = await fetch('https://github-contributions-api.jogruber.de/v4/Faisal-Khan06');
    const data = await myContribution.json();


    const totalContributions = data.total['2026'];

    const activeDaysArray = data.contributions.filter(day => day.count > 0);
    const totalActive = activeDaysArray.length;

    const date = document.querySelector('.date h3');
    const activeHeading = document.querySelector('.active h3');
    const streakHeading = document.querySelector('.streak h3');
    const streakSpan = document.querySelector('.streak-info span', '.streak')

    if (date) {
        date.innerHTML = totalContributions;
    }

    if (activeHeading) {
        activeHeading.innerHTML = `${totalActive} `
    }
    let streakNumber = getStreak(data.contributions);

    if (streakHeading && streakSpan) {
        streakHeading.innerHTML = `${streakNumber}`;
        streakSpan.innerHTML = `${streakNumber === 1 ? 'day' : 'days'}`
    }
}

function getStreak(gitData) {
    const data = gitData;

    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].count > 0) {
            currentStreak++;
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
        }
        else {
            currentStreak = 0;
        }

    }
    return maxStreak;
}

getContributions();