// variabel
let startButton;
let currentPage = "welcome";
let navButtons = [];
let pageRendered = false;

let navItems = [
  { label: "Materi", key: "materi" },
  { label: "Simulasi", key: "simulasi" },
  { label: "Quiz", key: "quiz" },
  { label: "Profile", key: "Profile" },
];

// quiz
let questions = [
  {
    q: "1. Pertumbuhan adalah ...",
    options: [
      "Perubahan bentuk yang reversibel",
      "Perubahan ukuran yang irreversible",
      "Proses penyusutan sel",
      "Perubahan bentuk sementara",
    ],
    answer: 1,
  },
  {
    q: "2. Perkembangan adalah ...",
    options: [
      "Perubahan kualitatif menuju kedewasaan",
      "Perubahan ukuran tubuh",
      "Penyusutan ukuran sel",
      "Proses respirasi sel",
    ],
    answer: 0,
  },
  {
    q: "3. Faktor internal yang memengaruhi pertumbuhan adalah ...",
    options: [
      "Suhu dan cahaya",
      "Genetik dan hormon",
      "Air dan mineral",
      "Ketersediaan oksigen",
    ],
    answer: 1,
  },
  {
    q: "4. Hormon yang berperan dalam pemanjangan sel adalah ...",
    options: ["Sitokinin", "Giberelin", "Auksin", "Etilen"],
    answer: 2,
  },
  {
    q: "5. Contoh pertumbuhan primer adalah ...",
    options: [
      "Penebalan batang",
      "Pemanjangan akar",
      "Pembentukan bunga",
      "Perkembangan buah",
    ],
    answer: 1,
  },
];
let currentQ = 0;
let quizContainer;
let quizProgress;

// animasi bubble & bunga
let bubbles = [];
let flowers = [];

// Class Bubble
class Bubble {
  constructor() {
    this.reset();
    this.r = random(20, 60);
    this.speed = random(0.5, 2);
    this.alpha = random(80, 160);
  }
  reset() {
    this.x = random(width);
    this.y = random(height);
  }
  move() {
    this.y -= this.speed;
    if (this.y < -this.r) {
      this.y = height + this.r;
      this.x = random(width);
    }
  }
  show() {
    noStroke();
    fill(255, 105, 180, this.alpha); 
    ellipse(this.x, this.y, this.r);
  }
}

// Class Flower
class Flower {
  constructor() {
    this.reset();
    this.r = random(15, 30);
    this.angle = random(TWO_PI);
    this.rotSpeed = random(-0.01, 0.01);
  }
  reset() {
    this.x = random(width);
    this.y = random(height);
  }
  move() {
    this.angle += this.rotSpeed;
    this.y -= 0.3;
    if (this.y < -this.r * 2) {
      this.y = height + this.r;
      this.x = random(width);
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(255, 105, 180, 180); 
    for (let i = 0; i < 6; i++) {
      ellipse(this.r, 0, this.r, this.r * 1.5);
      rotate(PI / 3);
    }
    fill(255, 182, 193);
    ellipse(0, 0, this.r * 1.2);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // Tombol START
  startButton = createButton("START");
  startButton.class("start-btn");
  positionStartButton();
  startButton.mousePressed(startGame);

  // Tombol Navigasi
  for (let item of navItems) {
    let btn = createButton(item.label);
    btn.class("nav-btn");
    btn.hide();
    btn.mousePressed(() => changePage(item.key));
    navButtons.push(btn);
  }

  // isi array animasi
  for (let i = 0; i < 25; i++) {
    bubbles.push(new Bubble());
  }
  for (let i = 0; i < 12; i++) {
    flowers.push(new Flower());
  }
}

function draw() {
  background("#ffb6c1");

  // animasi
  for (let b of bubbles) {
    b.move();
    b.show();
  }
  for (let f of flowers) {
    f.move();
    f.show();
  }

  // tampil halaman
  if (currentPage === "welcome") {
    drawWelcomePage();
  } else if (currentPage === "materi") {
    drawMateriPage();
  } else if (currentPage === "simulasi") {
    drawSimulasiPage();
  } else if (currentPage === "quiz") {
    drawQuizPage();
  } else if (currentPage === "Profile") {
    drawProfilePage();
  }
}


//welcome page
function drawWelcomePage() {
  textSize(40);
  textStyle(BOLD);
  fill(0);
  textFont("Poppins");
  text("Pertumbuhan &", width / 2, height / 2 - 70);
  text("Perkembangan Tumbuhan", width / 2, height / 2 - 25);
}

//materi page
function drawMateriPage() {
  if (!pageRendered) {
    renderMateriPage();
    pageRendered = true;
  }
}

function renderMateriPage() {
  selectAll(".materi-container").forEach((el) => el.remove());

  let materiDiv = createDiv().class("materi-container");
  materiDiv.style("position", "absolute");
  materiDiv.style("top", "100px");
  materiDiv.style("left", "50%");
  materiDiv.style("transform", "translateX(-50%)");
  materiDiv.style("width", "98%");
  materiDiv.style("max-width", "1100px");
  materiDiv.style("margin-top", "20px");
  materiDiv.style("padding-top", "30px");
  materiDiv.style("font-family", "'Poppins', sans-serif");

  // Selamat Datang
  let welcomeSection = createDiv().class("welcome-section");
  welcomeSection.html(`
    <h1 style="font-size:42px; font-weight:700; color:#ff4081; margin-bottom:10px; text-align:center;">
      🌱 Selamat Datang!
    </h1>
    <p style="font-size:20px; color:#444; margin-bottom:30px; line-height:1.6; text-align:center;">
      Yuk kita pelajari bersama <span style="color:#ff4081; font-weight:600;">Pertumbuhan & Perkembangan Tumbuhan</span> 🌸<br>
      Disajikan dengan materi menarik dan video interaktif biar makin mudah dipahami ✨
    </p>
    <hr style="border: none; height: 3px; background: linear-gradient(to right, #ff80ab, #ffb6c1); width: 70%; margin: 0 auto 40px auto; border-radius: 2px;">
  `);
  materiDiv.child(welcomeSection);

  // Pertumbuhan
  let card1 = createDiv().class("card");
  card1.html(`
    <h2>Pertumbuhan</h2>
    <p>
    Pertumbuhan adalah proses bertambahnya ukuran, volume, massa, atau panjang organisme secara <strong>kuantitatif</strong> dan <strong>irreversibel</strong>, artinya perubahan ini bersifat permanen dan tidak dapat kembali ke kondisi semula. 
    Pertumbuhan mencerminkan peningkatan jumlah dan ukuran sel, yang berkontribusi pada perkembangan fisik organisme.<br><br>
    Tahap utama pertumbuhan meliputi:<br>
    1. <strong>Pembelahan sel (mitosis):</strong> proses di mana sel membagi diri menjadi dua sel anak yang identik, sehingga jumlah sel bertambah.<br>
    2. <strong>Pembesaran sel:</strong> sel-sel yang baru terbentuk mengalami pembesaran sehingga meningkatkan volume jaringan.<br>
    3. <strong>Pemanjangan sel:</strong> sel mengalami perpanjangan, khususnya pada jaringan meristem pada tumbuhan, sehingga menyebabkan pertumbuhan batang dan akar.<br>
    4. <strong>Pertumbuhan sekunder:</strong> peningkatan diameter atau ketebalan organ, misalnya batang pohon yang semakin membesar karena aktivitas kambium.<br><br>
    Pertumbuhan dipengaruhi oleh faktor internal, seperti <strong>hormon tumbuhan (auksin, giberelin, sitokinin)</strong>, serta faktor eksternal seperti <strong>air, cahaya, nutrisi, dan suhu</strong>. 
    Kombinasi faktor-faktor ini memastikan organisme tumbuh secara optimal dan siap menjalani proses perkembangan selanjutnya.
  </p>
    <iframe 
      style="width:560px; height:315px; border-radius:15px; display:block; margin:0 auto;"
      src="https://www.youtube.com/embed/qflTCWocfbQ?si=sPtncEa52mC923CL"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  `);
  styleCard(card1);
  materiDiv.child(card1);

  // Perkembangan
  let card2 = createDiv().class("card");
  card2.html(`
    <h2>Perkembangan</h2>
    <p>
    Perkembangan adalah proses perubahan <strong>kualitatif</strong> yang terjadi secara bertahap menuju kedewasaan, dimana struktur, fungsi, dan kemampuan organisme menjadi lebih matang dan kompleks. 
    Proses ini bukan hanya melibatkan pertumbuhan fisik, tetapi juga perubahan internal yang memungkinkan organisme berfungsi secara optimal di lingkungan sekitarnya.<br><br>
    Contoh perkembangan pada organisme antara lain:<br>
    1. <strong>Diferensiasi sel:</strong> proses sel-sel muda berubah menjadi tipe sel khusus dengan fungsi tertentu, misalnya sel daun, sel akar, atau sel saraf.<br>
    2. <strong>Pembentukan organ reproduksi:</strong> organ seperti bunga pada tumbuhan atau gonad pada hewan berkembang agar organisme dapat bereproduksi.<br>
    3. <strong>Pematangan fungsi:</strong> kemampuan fisiologis dan biokimia tubuh menjadi optimal, misalnya kemampuan fotosintesis pada tumbuhan dewasa atau fungsi hormon pada hewan.<br>
    4. <strong>Adaptasi struktur:</strong> perubahan bentuk atau struktur tubuh agar organisme lebih sesuai dengan lingkungannya, seperti akar yang tumbuh lebih panjang untuk menyerap air di tanah kering.<br><br>
    Proses perkembangan dipengaruhi oleh faktor internal seperti <strong>genetik</strong> dan hormon, serta faktor eksternal seperti <strong>cahaya, suhu, air, dan nutrisi</strong>. Dengan adanya perkembangan, organisme dapat bertahan hidup, beradaptasi, dan bereproduksi dengan baik.
  </p>
    <iframe 
      style="width:560px; height:315px; border-radius:15px; display:block; margin:0 auto;"
      src="https://www.youtube.com/embed/qflTCWocfbQ?si=sPtncEa52mC923CL"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  `);
  styleCard(card2);
  materiDiv.child(card2);
}

function styleCard(card) {
  card.style("background-color", "white");
  card.style("border", "1px solid #ddd");
  card.style("border-radius", "25px");
  card.style("padding", "50px");
  card.style("margin", "40px 25px");
  card.style("box-shadow", "0 8px 16px rgba(0,0,0,0.2)");
  card.style("font-family", "'Poppins', sans-serif");
}

//quiz
function drawQuizPage() {
  if (!pageRendered) {
    renderQuizPage();
    pageRendered = true;
  }
}

function renderQuizPage() {
  selectAll(".quiz-container").forEach((el) => el.remove());

  quizContainer = createDiv().class("quiz-container");
  quizContainer.style("position", "absolute");
  quizContainer.style("top", "120px");
  quizContainer.style("left", "50%");
  quizContainer.style("transform", "translateX(-50%)");
  quizContainer.style("width", "90%");
  quizContainer.style("max-width", "800px");

  quizProgress = createDiv().id("progress");
  quizContainer.child(quizProgress);

  showQuestion();
}

function showQuestion() {
  quizContainer.html("");

  let q = questions[currentQ];

  let card = createDiv().addClass("card");
  let qText = createP(q.q);
  card.child(qText);

  q.options.forEach((opt, i) => {
    let btn = createButton(opt);
    btn.class("option");
    btn.mousePressed(() => checkAnswer(btn, i, q.answer));
    card.child(btn);
  });

  quizContainer.child(card);
  quizContainer.child(quizProgress);
  quizProgress.html(`Soal ${currentQ + 1} dari ${questions.length}`);
}

function checkAnswer(btn, chosen, correct) {
  if (chosen === correct) {
    btn.addClass("correct");
    setTimeout(nextQuestion, 800);
  } else {
    btn.addClass("wrong");
  }
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    quizContainer.html(`
      <div class="card" style="text-align:center;">
        <h2 style="color:rgb(255,164,164)">🎉 Selamat! Semua soal selesai!</h2>
        <p style="margin-top:10px; color:pink;">Kamu akan diarahkan ke halaman utama...</p>
      </div>
    `);
    quizProgress.html("");

    setTimeout(() => {
      changePage("materi");
    }, 2000);
  }
}

// simulasi page 
let pohonList = [];
let animating = false;
let lastUpdate = 0;
const delay = 200; 

class Pohon {
  constructor(x) {
    this.x = x;
    this.tahap = 0;
    this.tinggi = 0;
    this.daun = 0;
    this.bunga = false;
  }

  update() {
    if (this.tahap === 0) {
      this.tahap = 1;
    } else if (this.tahap === 1) {
      if (this.tinggi < 120) {
        this.tinggi += 2;
      } else {
        this.tahap = 2;
      }
    } else if (this.tahap === 2) {
      if (this.daun < 5) {
        this.daun++;
      } else {
        this.tahap = 3;
      }
    } else if (this.tahap === 3) {
      this.bunga = true;
    }
  }

  gambar() {
    // tanah
    fill("#8d6e63");
    rect(0, height - 50, width, 50);

    // biji
    fill("#6d4c41");
    ellipse(this.x, height - 50, 16, 16);

    // batang
    if (this.tahap >= 1) {
      fill("#2e7d32");
      rect(this.x - 4, height - 50 - this.tinggi, 8, this.tinggi);
    }

    // daun
    if (this.tahap >= 2) {
      fill("#43a047");
      stroke("#2e7d32");
      strokeWeight(2);
      for (let i = 0; i < this.daun; i++) {
        let posY = height - 70 - i * 20;
        let arah = i % 2 === 0 ? 1 : -1;
        ellipse(this.x + arah * 20, posY, 30, 20);
        line(this.x, posY, this.x + arah * 20, posY);
      }
      noStroke();
    }

    // bunga
    if (this.bunga) {
      this.gambarBunga(this.x, height - 50 - this.tinggi);
    }
  }

  gambarBunga(x, y) {
    let kelopak = 6;
    let radiusKelopak = 15;
    fill("#f06292");
    noStroke();
    for (let i = 0; i < kelopak; i++) {
      let angle = (TWO_PI / kelopak) * i;
      let px = x + cos(angle) * radiusKelopak;
      let py = y + sin(angle) * radiusKelopak;
      ellipse(px, py, 20, 20);
    }
    fill("#ffebee");
    ellipse(x, y, 14, 14);
  }
}

function drawSimulasiPage() {
  if (!pageRendered) {
    renderSimulasiPage();
    pageRendered = true;
  }

  if (animating) {
    if (millis() - lastUpdate > delay) {
      updateSemua();
      lastUpdate = millis();
    }
  }

  gambarSemua();
}

function renderSimulasiPage() {
  selectAll(".simulasi-container").forEach((el) => el.remove());

  let simDiv = createDiv().class("simulasi-container");
  simDiv.style("position", "absolute");
  simDiv.style("top", "100px");
  simDiv.style("left", "50%");
  simDiv.style("transform", "translateX(-50%)");
  simDiv.style("width", "90%");
  simDiv.style("max-width", "800px");
  simDiv.style("text-align", "center");

  let title = createElement("h2", "Animasi Pertumbuhan & Perkembangan Tumbuhan 🌸");
  title.parent(simDiv);

  let controls = createDiv().class("simulasi-controls");
  controls.parent(simDiv);

  let btnMulai = createButton("Mulai");
  btnMulai.class("simulasi-btn start");
  btnMulai.mousePressed(() => mulai());
  btnMulai.parent(controls);

  let btnReset = createButton("Reset");
  btnReset.class("simulasi-btn reset");
  btnReset.mousePressed(() => reset());
  btnReset.parent(controls);

  reset();
}

function gambarSemua() {
  // gambar semua pohon
  for (let p of pohonList) {
    p.gambar();
  }
}

function updateSemua() {
  pohonList.forEach((p) => p.update());
  if (pohonList.every((p) => p.bunga)) {
    animating = false;
  }
}

function mulai() {
  reset();
  animating = true;
  lastUpdate = millis();
}

function reset() {
  animating = false;
  pohonList = [new Pohon(width / 4), new Pohon(width / 2), new Pohon((3 * width) / 4)];
}



//profile page
function drawProfilePage() {
  if (!pageRendered) {
    renderProfilePage();
    pageRendered = true;
  }
}

function renderProfilePage() {
  selectAll(".profile-container").forEach((el) => el.remove());

  let profileDiv = createDiv().class("profile-container");

  let team = [
    {
      nama: "Nur Aini Ramadhani",
      nim: "2305176025",
      foto: "images/aini.jpg",
      deskripsi: "Pendidikan Komputer 2023 A",
    },
    {
      nama: "Chusnul Khatimah",
      nim: "2305176034",
      foto: "images/imaa.jpg",
      deskripsi: "Pendidikan Komputer 2023 A",
    },
    {
      nama: "Yunita Takarina",
      nim: "2305176038",
      foto: "images/rina.jpg",
      deskripsi: "Pendidikan Komputer 2023 A",
    },
    {
      nama: "Giska Aswadinah",
      nim: "2305176039",
      foto: "images/giska.jpg",
      deskripsi: "Pendidikan Komputer 2023 A",
    },
  ];

  team.forEach((member) => {
    let card = createDiv().class("profile-card");
    card.html(`
      <img src="${member.foto}">
      <h2>${member.nama}</h2>
      <p><strong>NIM:</strong> ${member.nim}</p>
      <p>${member.deskripsi}</p>
    `);
    profileDiv.child(card);
  });
}

//utilitas
function textPage(txt) {
  textSize(40);
  textStyle(BOLD);
  fill(0);
  textFont("Poppins");
  text(txt, width / 2, height / 2);
}

function startGame() {
  currentPage = "materi";
  startButton.hide();

  let navBar = createDiv().class("nav-container");
  for (let btn of navButtons) {
    btn.show();
    navBar.child(btn);
  }
  pageRendered = false;
}

function changePage(page) {
  currentPage = page;
  selectAll(".materi-container").forEach((el) => el.remove());
  selectAll(".simulasi-container").forEach((el) => el.remove());
  selectAll(".quiz-container").forEach((el) => el.remove());
  selectAll(".profile-container").forEach((el) => el.remove());
  pageRendered = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (currentPage === "welcome") positionStartButton();
}

function positionStartButton() {
  startButton.position(width / 2 - 60, height / 2 + 30);
}
