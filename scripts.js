document.getElementById("add-to-cart").addEventListener("click", () => {
  const barangSelect = document.getElementById("barang");
  const jumlahInput = document.getElementById("jumlah");

  if (!barangSelect.value || jumlahInput.value < 1) {
    alert("Pilih barang dan masukkan jumlah yang valid.");
    return;
  }

  const barangName =
    barangSelect.options[barangSelect.selectedIndex].text.split(" - ")[0];
  const barangPrice = parseInt(
    barangSelect.options[barangSelect.selectedIndex].getAttribute("data-price")
  );
  const jumlah = parseInt(jumlahInput.value);

  const totalPrice = barangPrice * jumlah;

  const tableBody = document.getElementById("cart-body");
  const row = document.createElement("tr");

  row.innerHTML = `  
    <td>${barangName}</td>
    <td>${jumlah}</td>
    <td>Rp ${barangPrice.toLocaleString()}</td>
    <td>Rp ${totalPrice.toLocaleString()}</td>
    <td><button class="btn btn-danger btn-sm remove-item">Hapus</button></td>
  `;

  row.querySelector(".remove-item").addEventListener("click", () => {
    row.remove();
  });

  tableBody.appendChild(row);

  // Reset jumlah ke 1 setelah item ditambahkan
  jumlahInput.value = 1;
});

document.getElementById("checkout").addEventListener("click", () => {
  const tableBody = document.getElementById("cart-body");

  if (tableBody.children.length === 0) {
    alert("Keranjang belanja kosong!");
    return;
  }

  // Inisialisasi ringkasan
  let summary = "Ringkasan Belanja:\n";
  let grandTotal = 0;

  Array.from(tableBody.children).forEach((row) => {
    const barangName = row.children[0].textContent;
    const jumlah = row.children[1].textContent;
    const totalPrice = row.children[3].textContent;

    summary += `- ${barangName}, Jumlah: ${jumlah}, Total: ${totalPrice}\n`;
    grandTotal += parseInt(totalPrice.replace(/[^0-9]/g, ""));
  });

  // Tampilkan grand total
  summary += `\nGrand Total: Rp ${grandTotal.toLocaleString()}`;

  alert(summary);

  // Tanyakan apakah ingin menambah barang lagi
  const addMore = confirm("Apakah Anda ingin menambahkan barang lagi?");

  if (addMore) {
    document.getElementById("barang").focus();
    return; // Berhenti di sini agar bisa menambahkan barang lagi
  }

  // Jika selesai checkout, proses konfirmasi
  alert("Terima kasih atas belanja Anda! Transaksi selesai.");

  // Kosongkan keranjang setelah checkout selesai
  tableBody.innerHTML = "";

  // Menampilkan form checkout melayang setelah checkout
  document.getElementById("formCheckout").style.display = "block";
});

// Fungsi untuk form checkout (input nama, alamat, no hp)
document.getElementById("formPembeli").addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("namaPembeli").value;
  const alamat = document.getElementById("alamatPembeli").value;
  const nohp = document.getElementById("nohpPembeli").value;

  // Pastikan semua data sudah diisi
  if (!nama || !alamat || !nohp) {
    alert("Semua data harus diisi.");
    return;
  }

  // Finalisasi transaksi
  alert(
    `Terima kasih, ${nama}! Transaksi selesai. Pengiriman akan dilakukan ke alamat berikut: ${alamat}. No. HP: ${nohp}`
  );

  // Kosongkan form dan keranjang setelah konfirmasi selesai
  document.getElementById("cart-body").innerHTML = "";
  document.getElementById("formPembeli").reset();
  document.getElementById("formCheckout").style.display = "none";
});
