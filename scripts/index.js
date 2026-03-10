const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) => `<div class="badge badge-xl bg-[#D7E4EF] text-sm">${el}</div>`,
  );
  return htmlElements.join(" ");
};

const pronounceWord = (word) =>{
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("words-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("words-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLessons(data.data));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWords(data.data);
    });
};
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayDetails(data.data);
};

const displayDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
        <div class="border border-[#EDF7FF] rounded-lg p-4">
            <h2 class="text-3xl font-semibold">${word.word} (<span><i class="fa-solid fa-microphone-lines"></i></span> <span class="font-hindSiliguri">:${word.pronunciation}</span>)</h2>
            <br>
            <h3 class="text-xl font-semibold mb-2">Meaning</h3>
            <p class="font-hindSiliguri font-medium">${word.meaning}</p>
            <br>
            <h3 class="text-xl font-semibold mb-2">Example</h3>
            <p class="text-black/50">${word.sentence}</p>
            <br>
            <h3 class="font-hindSiliguri font-semibold">সমার্থক শব্দ গুলো</h3>
            <div class="flex gap-2 flex-wrap mt-3">
              <div class="">${createElements(word.synonyms)}</div>
            </div>
        </div>
    `;
  document.getElementById("open_modal").showModal();
};

const removeActive = () => {
  const allBtns = document.querySelectorAll(".lesson-btn");
  allBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const displayLevelWords = (words) => {
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";

  if (words.length === 0) {
    wordsContainer.innerHTML = `
            <div class="text-center col-span-full font-hindSiliguri space-y-3">
              <img class="mx-auto" src="./assets/alert-error.png" alt="">
              <p class="font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
              <h2 class="text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
        `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-2xl shadow py-10 px-5 text-center">
                <h2 class="text-2xl font-bold mb-4">${word.word}</h2>
                <p class="text-lg font-medium mb-5">Meaning /Pronounciation</p>

                <div class="text-xl font-semibold font-hindSiliguri">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between mt-12">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF] border-none"><i class="fa-solid fa-circle-info text-[#374957]"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF] border-none"><i class="fa-solid fa-volume-high text-[#374957]"></i></button>
                </div>
            </div>
        `;

    wordsContainer.appendChild(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  // 1. get the container
  const levelsContainer = document.getElementById("levels-container");
  levelsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const btndiv = document.createElement("div");
    btndiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i></i> Lesson - ${lesson.level_no}
            </button>
        `;
    levelsContainer.appendChild(btndiv);
  });
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  const inputField = document.getElementById("search-input");
  const inputValue = inputField.value.trim().toLowerCase();
  // console.log(inputValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((response) => response.json())
    .then((data) => {
      const allData = data.data;
      // console.log(allData);
      const filterWords = allData.filter(word => word.word.toLowerCase().includes(inputValue));
      displayLevelWords(filterWords);
      removeActive();
    });
  inputField.value = "";
});
