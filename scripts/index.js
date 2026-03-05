const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
     .then(response => response.json())
     .then(data => displayLessons(data.data));
}

const loadLevelWord = id => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
     .then(res => res.json())
     .then(data => displayLevelWords(data.data));
}

const displayLevelWords = words => {
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.innerHTML = "";

    words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-2xl shadow py-10 px-5 text-center">
                <h2 class="text-2xl font-bold mb-4">${word.word}</h2>
                <p class="text-lg font-medium mb-5">Meaning /Pronounciation</p>

                <div class="text-xl font-semibold font-hindSiliguri">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between mt-12">
                    <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF] border-none"><i class="fa-solid fa-circle-info text-[#374957]"></i></button>
                    <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF] border-none"><i class="fa-solid fa-volume-high text-[#374957]"></i></button>
                </div>
            </div>
        `;

        wordsContainer.appendChild(card);
    })
}

const displayLessons = lessons => {
    // 1. get the container 
    const levelsContainer = document.getElementById('levels-container');
    levelsContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const btndiv = document.createElement('div');
        btndiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i> Lesson - ${lesson.level_no}
            </button>
        `;
        levelsContainer.appendChild(btndiv);
    })
}

loadLessons();