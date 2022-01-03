const input = document.querySelector("input");
let content = document.querySelector("#content");
const h1 = document.querySelector("h1");
const form = document.querySelector("form");

const url = "acd0722d5750b6362d5bd0312ca36726v";

let isLoading = false;

form.addEventListener("submit",(e) => {
        getValue(input.value);
        e.preventDefault();
})

async function getValue(value){
    const result = await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${url}`);
    
    const data = await result.json();
    content.innerHTML = "";
    input.value = "";
    getData(data.data.results);
}



window.addEventListener("load",async () => {
    if(input.value === ""){
    const result = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${url}`);
    
    const data = await result.json();
    
    getData(data.data.results);
    }
})

function getData(data){
    data.forEach(item => {
        if(isLoading){
            h1;
        }else{
            h1.classList.remove("d-flex");
            h1.classList.add("d-none");
        }

        const ul = document.createElement("ul");
        ul.classList.add("bg-dark","mt-3","h-50","rounded","d-flex","justify-content-space-between","align-items-center","overflow-auto");

        const img = document.createElement("img");
        img.src = `${item.thumbnail.path}/portrait_xlarge.jpg`;
        img.classList.add("img-fluid","w-40","mr-5","h-75","rounded")
        
        const li = document.createElement("li");
        li.classList.add("d-flex","flex-column","text-white");

        const h2 = document.createElement("h2");
        h2.innerHTML = `${item.name}`;
        h2.classList.add("mt-2");

        const strong = document.createElement("strong");
        strong.innerHTML = `Descripion: ${item.description === "" ? "None" : item.description}`;
        
        const small = document.createElement("small");
        small.innerHTML = `${item.modified}`;
        small.classList.add("float-right");

        li.appendChild(h2);
        li.appendChild(small);
        li.appendChild(strong);
        ul.appendChild(img);
        ul.appendChild(li);
        content.appendChild(ul);
    })
}
