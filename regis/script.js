function handleRegister(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validasi input
  if (password !== confirmPassword) {
    alert("Password tidak sesuai! Silakan coba lagi.");
    return false;
  }

  alert(`Pendaftaran berhasil!\nSelamat datang, ${fullname}!`);
  // Alihkan ke halaman login atau dashboard
  window.location.href = "../login/index.html";
}
