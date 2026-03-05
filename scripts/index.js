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
            <p>${word.word}</p>
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