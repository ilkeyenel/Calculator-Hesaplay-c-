//inputlar
//ekle buton
//listeleyen eleman

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)

const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)

const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)

const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo)
const nameInput = document.getElementById("name-input");

const statusCheck = document.getElementById("status-input");

const selectFilter = document.getElementById("filter-select");

const harcamaKartlari = document.querySelector(".harcamaKArtlari");

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);

selectFilter.addEventListener("change", handleFilter);

const userName = localStorage.getItem("name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  // console.log(e.target.value)
  localStorage.setItem("name", e.target.value);
});

let toplam = 0;

function updateToplam(fiyatBilgisi) {
  toplam += Number(fiyatBilgisi);
  totalInfo.innerText = toplam;
}

function addExpense(e) {
  e.preventDefault();
  console.log("addExpense");

  if (!harcamaInput.value || !fiyatInput.value) {
    alert("tüm boş alanları doldurun");
  } else {
    const harcamaDiv = document.createElement("div");
    harcamaDiv.classList.add("expense");
    if (statusCheck.checked) {
      harcamaDiv.classList.add("payed");
    }
    harcamaDiv.innerHTML = `<h2>${harcamaInput.value}</h2>
    <h2 id='value'>${fiyatInput.value}</h2>
        <div class="buttons">
             <img id='payment' src="./img/pay.png" alt="">
             <img id='remove' src="./img/remove.png" alt="">
        </div>
 `;

    list.appendChild(harcamaDiv);
    //console.log(harcamaDiv);
    updateToplam(fiyatInput.value);
  }

  harcamaInput.value = "";
  fiyatInput.value = "";
}

function handleClick(e) {
  console.log(e.target);
  let tiklanilanEleman = e.target;
  if (tiklanilanEleman.id === "remove") {
    //console.log(tiklanilanEleman.parentElement.parentElement)
    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    updateToplam(-Number(deletedPrice));

    kapsayiciElement.remove();
  }
}

function handleFilter(e) {
  //console.log("filtre fonks")
  const items = list.childNodes;
  //console.log("items")
  const filterValue = e.target.value;

  harcamaKartlari.forEach((harcamaKarti) => {
    switch (filterValue) {
      case "all":
        harcamaKarti.style.display = "flex";
        break;

      case "payed":
        if (!harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }
        break;

      case "not-payed":
        if (harcamaKarti.classList.contains("payed")) {
          harcamaKarti.style.display = "none";
        } else {
          harcamaKarti.style.display = "flex";
        }
        break;
    }
  });
}
