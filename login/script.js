function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Harap mengisi semua field pada formulir terlebih dahulu!");
    return false;
  }

  alert("Anda Berhasil Login");
}
