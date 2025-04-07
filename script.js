let timer;
let waktu = 0;

function startTimer() {
    clearInterval(timer);
    const alarmSound = document.getElementById("alarmSound");
    const endTimeInput = document.getElementById("waktuSelesai").value;
    if (!endTimeInput) {
        alert("Silakan pilih jam selesai fokus.");
        return;
    }

    const [hour, minute] = endTimeInput.split(":").map(Number);
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(hour, minute, 0, 0);

    if (endTime <= now) {
        alert("Jam selesai harus lebih dari waktu sekarang.");
        return;
    }

    waktu = Math.floor((endTime - now) / 1000); // dalam detik
    document.getElementById("timer").style.color = "#28a745";

    timer = setInterval(() => {
        const notif = document.createElement("div");
        if (waktu <= 1) {
        clearInterval(timer);
        document.getElementById("timer").style.color = "#dc3545";
        document.getElementById("timer").innerText = "00:00";
        alarmSound.play();
        notif.innerText = "🎉 Waktu fokus selesai!";
        notif.style.background = "#ffc107";
        notif.style.color = "#000";
        notif.style.padding = "1rem";
        notif.style.marginTop = "1rem";
        notif.style.borderRadius = "10px";
        notif.style.fontWeight = "bold";
        notif.style.textAlign = "center";

        document.querySelector(".timer-section").appendChild(notif);
        } else {
        waktu--;
        const menit = Math.floor(waktu / 60);
        const detik = waktu % 60;
        document.getElementById("timer").innerText = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`;
        }
    }, 1000);
}  

function validateForm() {
  const task = document.getElementById("task").value;
  const deadline = document.getElementById("deadline").value;
  const time = document.getElementById("time").value;

  if (task === "" || deadline === "" || time === "") {
    alert("Mohon isi semua field tugas.");
    return false;
  }

  const table = document.getElementById("taskTableBody");
  const row = table.insertRow();
  const no = table.rows.length;
  row.insertCell(0).innerText = no;
  row.insertCell(1).innerText = task;
  row.insertCell(2).innerText = `${deadline} ${time}`;

  document.getElementById("taskForm").reset();
  return false;
}

window.onload = () => {
  const today = new Date();
  const greeting = document.getElementById("greeting");
  if (greeting) {
    const jam = today.getHours();
    if (jam < 12) greeting.innerText = "Selamat pagi! Siap fokus hari ini?";
    else if (jam < 18) greeting.innerText = "Selamat siang! Fokus yuk!";
    else greeting.innerText = "Selamat malam! Jangan lupa tetap fokus.";
  }
};
