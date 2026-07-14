/**
 * Utility to generate and print PDF layout for "Daftar Penilaian Pelaksanaan Pekerjaan"
 * following UIKA Bogor official format.
 */

const toRoman = (num: number): string => {
  const romanMap: { [key: number]: string } = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X"
  };
  return romanMap[num] || String(num);
};

const formatBobotLabel = (bobot: string | number | null) => {
  if (bobot === null || bobot === undefined) return "";
  const val = parseFloat(String(bobot));
  if (val === 0 || isNaN(val)) return "";
  const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
  return ` (${formatted}%)`;
};

const formatIndonesianNumber = (val: any) => {
  if (val === null || val === undefined) return "-";
  const num = parseFloat(String(val));
  if (isNaN(num)) return "-";
  return num.toFixed(2).replace(".", ",");
};

const getSebutanTotal = (scoreVal: any) => {
  if (scoreVal === null || scoreVal === undefined) return "-";
  const score = parseFloat(String(scoreVal));
  if (isNaN(score)) return "-";
  if (score >= 91) return "Sangat Baik";
  if (score >= 76) return "Baik";
  if (score >= 61) return "Cukup";
  if (score >= 46) return "Kurang";
  return "Buruk";
};

const getFootnote = (templateName: string, itemName: string) => {
  if (!templateName || !itemName) return null;
  const tName = templateName.trim();
  const iName = itemName.trim();
  if (tName.toLowerCase() === "staff" && iName.toLowerCase() === "kehadiran") {
    return "* Sebagai syarat penilaian Tugas Pokok";
  }
  return null;
};

const formatPeriode = (startStr: string, endStr: string) => {
  if (!startStr || !endStr) return "-";
  try {
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return `${startStr} s.d. ${endStr}`;
    }

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = months[start.getMonth()];
    const endMonth = months[end.getMonth()];

    if (startYear === endYear) {
      return `${startMonth} s.d. ${endMonth} ${startYear}`;
    } else {
      return `${start.getDate()} ${startMonth} ${startYear} s.d. ${end.getDate()} ${endMonth} ${endYear}`;
    }
  } catch (error) {
    return `${startStr} s.d. ${endStr}`;
  }
};

export const printEvaluasiKinerja = (data: any) => {
  if (!data) return;

  const dinilai = data.pegawaiDinilai || {};
  const penilai = data.pegawaiPenilai || {};
  const atasan = data.pegawaiAtasan || {};

  const dinilaiNama = dinilai.nama || "-";
  const dinilaiNip = dinilai.nip || "-";
  const dinilaiPangkat = dinilai.pangkat?.nama || "-";
  const dinilaiJabatan = dinilai.jabatan_struktural?.singkatan || "-";
  const dinilaiUnit = dinilai.unit_kerja?.nama || "-";

  const penilaiNama = penilai.nama || "-";
  const penilaiNip = penilai.nip || "-";
  const penilaiPangkat = penilai.pangkat?.nama || "-";
  const penilaiJabatan = penilai.jabatan_struktural?.singkatan || "-";
  const penilaiUnit = penilai.unit_kerja?.nama || "-";

  const atasanNama = atasan.nama || "-";
  const atasanNip = atasan.nip || "-";
  const atasanPangkat = atasan.pangkat?.nama || "-";
  const atasanJabatan = atasan.jabatan_struktural?.singkatan || "-";
  const atasanUnit = atasan.unit_kerja?.nama || "-";

  const templateName = data.EvaluasiTemplate?.name || "";
  const isDosen = templateName.toLowerCase().includes("dosen");

  const logoUrl = window.location.origin + "/images/logo/uika-logo.jpg";

  // Build scoring rows
  const details = data.details || [];
  const topLevelItems = details
    .filter((d: any) => !d.item.parent_id)
    .sort((a: any, b: any) => (a.item?.urutan || 0) - (b.item?.urutan || 0));

  let romanIndex = 1;
  let rowsHtml = "";

  topLevelItems.forEach((parent: any) => {
    const roman = toRoman(romanIndex++);
    const bobotLabel = formatBobotLabel(parent.bobot_persen);
    const parentName = `${roman}. ${parent.item?.name || ""}${bobotLabel}`;

    const children = parent.children || [];
    if (children.length === 0) {
      rowsHtml += `
        <tr>
          <td class="unsur-cell font-bold">${parentName}</td>
          <td class="text-center font-bold">${formatIndonesianNumber(parent.nilai)}</td>
          <td class="text-center font-bold">${parent.sebutan || "-"}</td>
        </tr>
      `;
      const footnote = getFootnote(templateName, parent.item?.name);
      if (footnote) {
        rowsHtml += `
          <tr>
            <td colspan="3" class="footnote-cell">${footnote}</td>
          </tr>
        `;
      }
    } else {
      rowsHtml += `
        <tr>
          <td class="unsur-cell font-bold">${parentName}</td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
      `;

      const sortedChildren = [...children].sort((a: any, b: any) => (a.item?.urutan || 0) - (b.item?.urutan || 0));
      let childSum = 0;

      sortedChildren.forEach((child: any, idx: number) => {
        const childVal = child.nilai !== null ? parseFloat(child.nilai) : 0;
        childSum += childVal;

        rowsHtml += `
          <tr>
            <td class="unsur-cell child-unsur">${idx + 1}. ${child.item?.name || ""}</td>
            <td class="text-center">${formatIndonesianNumber(child.nilai)}</td>
            <td class="text-center">${child.sebutan || "-"}</td>
          </tr>
        `;
      });

      const childCount = sortedChildren.length;
      const avgVal = childCount > 0 ? (childSum / childCount) : 0;

      rowsHtml += `
        <tr class="sub-total-row">
          <td class="unsur-cell child-unsur font-semibold" style="padding-left: 20px;">Jumlah</td>
          <td class="text-center font-semibold">${formatIndonesianNumber(childSum)}</td>
          <td class="text-center"></td>
        </tr>
        <tr class="sub-total-row">
          <td class="unsur-cell child-unsur font-semibold" style="padding-left: 20px;">Rata-Rata</td>
          <td class="text-center font-semibold">${formatIndonesianNumber(avgVal)}</td>
          <td class="text-center font-semibold">${parent.sebutan || "-"}</td>
        </tr>
      `;
    }
  });

  const totalRoman = toRoman(romanIndex);
  rowsHtml += `
    <tr class="total-row">
      <td class="unsur-cell font-bold">${totalRoman}. Total Nilai</td>
      <td class="text-center font-bold">${formatIndonesianNumber(data.total_skor)}</td>
      <td class="text-center font-bold">${getSebutanTotal(data.total_skor)}</td>
    </tr>
  `;

  // Create printable document
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Gagal membuka jendela cetak. Pastikan pop-up blocker dimatikan.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Daftar Penilaian Pelaksanaan Pekerjaan - ${dinilaiNama}</title>
      <style>
        @page {
          size: A4;
          margin: 0.6cm 0.8cm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          margin: 0;
          padding: 0;
          background-color: white;
          color: black;
          font-size: 8.5pt;
          line-height: 1.25;
        }
        
        /* Toolbar */
        .print-toolbar {
          padding: 8px 12px;
          background: #f4f4f5;
          border-bottom: 1px solid #e4e4e7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin-bottom: 10px;
        }
        .print-toolbar-title {
          font-weight: 600;
          font-size: 13px;
          color: #27272a;
        }
        .print-btn {
          padding: 5px 12px;
          background: #004680;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 12px;
          margin-right: 6px;
        }
        .print-btn:hover {
          background: #003360;
        }
        .close-btn {
          padding: 5px 12px;
          background: #e4e4e7;
          color: #27272a;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 12px;
        }
        .close-btn:hover {
          background: #d4d4d8;
        }

        /* Kop Surat */
        .header-container {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        .logo-box {
          width: 50px;
          margin-right: 12px;
        }
        .logo-img {
          width: 45px;
          height: auto;
          display: block;
        }
        .title-box {
          flex-grow: 1;
        }
        .uika-title {
          font-size: 11pt;
          font-weight: bold;
          margin: 0;
          line-height: 1.15;
        }
        .uika-subtitle {
          font-size: 8pt;
          margin: 1px 0 0 0;
          line-height: 1.15;
        }
        .header-line {
          border: none;
          border-top: 1.5px dashed black;
          margin: 3px 0 6px 0;
        }

        /* Judul Dokumen */
        .doc-title-container {
          text-align: center;
          margin-bottom: 10px;
        }
        .rahasia-text {
          font-size: 9.5pt;
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom: 2px;
          text-decoration: underline;
        }
        .doc-title {
          font-size: 9.5pt;
          font-weight: bold;
          margin: 0;
          line-height: 1.2;
        }
        .doc-subtitle {
          font-size: 9.5pt;
          font-weight: bold;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }
        .period-text {
          font-size: 8.5pt;
          font-weight: bold;
          margin: 3px 0 0 0;
        }

        /* Main Table Layout */
        .main-layout-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid black;
          margin-top: 6px;
        }
        .profile-col-cell {
          width: 44%;
          vertical-align: top;
          border-right: 1px solid black;
          padding: 0;
        }
        .profile-col-cell-1 {
          border-bottom: 1px solid black;
        }
        .profile-col-cell-2 {
          border-bottom: 1px solid black;
        }
        .profile-col-cell-3 {
          border-bottom: none;
        }
        .scoring-col-cell {
          width: 56%;
          vertical-align: top;
          padding: 0;
        }

        /* Profile Tables */
        .profile-inner-table {
          width: 100%;
          border-collapse: collapse;
        }
        .profile-inner-table td {
          padding: 3px 5px;
          vertical-align: top;
        }
        .section-header-row {
          font-weight: bold;
          border-bottom: 1px solid black;
          background-color: #f2f2f2;
        }
        .bullet-cell {
          width: 15px;
          text-align: center;
        }
        .label-cell {
          width: 100px;
        }
        .value-cell {
          word-break: break-word;
        }

        /* Scoring Table */
        .scoring-inner-table {
          width: 100%;
          height: 100%;
          border-collapse: collapse;
        }
        .scoring-inner-table th {
          border-bottom: 1px solid black;
          padding: 4px 5px;
          font-weight: bold;
          text-align: left;
          background-color: #f2f2f2;
        }
        .scoring-inner-table th:not(:last-child),
        .scoring-inner-table td:not(:last-child) {
          border-right: 1px solid black;
        }
        .scoring-inner-table td {
          border-bottom: 1px solid black;
          padding: 3px 5px;
          vertical-align: top;
        }
        .scoring-inner-table tr:last-child td {
          border-bottom: none;
        }

        /* Utility classes */
        .unsur-cell {
          padding-left: 5px;
        }
        .child-unsur {
          padding-left: 18px;
        }
        .font-bold {
          font-weight: bold;
        }
        .font-semibold {
          font-weight: bold;
        }
        .text-center {
          text-align: center;
        }
        .footnote-cell {
          font-size: 7.5pt;
          font-style: italic;
          color: #333;
          padding-left: 20px;
          border-bottom: 1px solid black;
        }
        .sub-total-row td {
          background-color: #fafafa;
        }
        .total-row td {
          background-color: #f2f2f2;
          font-weight: bold;
          border-top: 1px solid black;
          border-bottom: none;
          vertical-align: middle;
        }
        .total-row {
          height: 100%;
        }

        /* Signatures */
        .signatures-section {
          margin-top: 12px;
          page-break-inside: avoid;
        }
        .signatures-table {
          width: 100%;
          border-collapse: collapse;
        }
        .signatures-table td {
          vertical-align: top;
          padding: 4px;
        }
        .sig-date-line {
          margin-bottom: 3px;
        }
        .sig-role {
          font-weight: normal;
          margin-bottom: 35px;
          height: auto;
        }
        .sig-name {
          font-weight: bold;
          text-decoration: underline;
        }
        .sig-nip {
          margin-top: 1px;
        }

        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-toolbar no-print">
        <span class="print-toolbar-title">Pratinjau Cetak Evaluasi Kinerja</span>
        <div>
          <button class="print-btn" onclick="window.print()">Cetak / Simpan PDF</button>
          <button class="close-btn" onclick="window.close()">Tutup</button>
        </div>
      </div>

      <div style="padding: 10px;">
        <!-- Kop Surat -->
        <div class="header-container">
          <div class="logo-box">
            <img src="${logoUrl}" alt="Logo" class="logo-img" onerror="this.style.display='none'" />
          </div>
          <div class="title-box">
            <h1 class="uika-title">UNIVERSITAS IBN KHALDUN BOGOR</h1>
            <p class="uika-subtitle">Jalan KH. Sholeh Iskandar Km. 2 Bogor</p>
          </div>
        </div>
        <hr class="header-line" />

        <!-- Judul -->
        <div class="doc-title-container">
          <div class="rahasia-text">RAHASIA</div>
          <h2 class="doc-title">DAFTAR PENILAIAN PELAKSANAAN PEKERJAAN</h2>
          <h2 class="doc-subtitle">PEGAWAI (${isDosen ? "TENAGA PENDIDIK" : "TENAGA KEPENDIDIKAN"}) UNIVERSITAS IBN KHALDUN BOGOR</h2>
          <p class="period-text">JANGKA WAKTU PENILAIAN: ${formatPeriode(data.periode_start, data.periode_end)}</p>
        </div>

        <!-- Layout Grid/Table -->
        <table class="main-layout-table">
          <tr>
            <td class="profile-col-cell profile-col-cell-1">
              <!-- YANG DINILAI -->
              <table class="profile-inner-table">
                <tr class="section-header-row">
                  <td colspan="3">1. YANG DINILAI</td>
                </tr>
                <tr>
                  <td class="bullet-cell">a.</td>
                  <td class="label-cell">Nama</td>
                  <td class="value-cell">: <strong>${dinilaiNama}</strong></td>
                </tr>
                <tr>
                  <td class="bullet-cell">b.</td>
                  <td class="label-cell">NIK / NIP</td>
                  <td class="value-cell">: ${dinilaiNip}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">c.</td>
                  <td class="label-cell">Pangkat/Golongan</td>
                  <td class="value-cell">: ${dinilaiPangkat}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">d.</td>
                  <td class="label-cell">Jabatan/Pekerjaan</td>
                  <td class="value-cell">: ${dinilaiJabatan}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">e.</td>
                  <td class="label-cell">Unit Kerja</td>
                  <td class="value-cell">: ${dinilaiUnit}</td>
                </tr>
              </table>
            </td>
            
            <td rowspan="3" class="scoring-col-cell">
              <!-- 4. PENILAIAN -->
              <table class="scoring-inner-table">
                <thead>
                  <tr>
                    <th>4. UNSUR YANG DINILAI</th>
                    <th style="width: 75px; text-align: center;">ANGKA</th>
                    <th style="width: 100px; text-align: center;">SEBUTAN</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </td>
          </tr>
          
          <tr>
            <td class="profile-col-cell profile-col-cell-2">
              <!-- PEJABAT PENILAI -->
              <table class="profile-inner-table">
                <tr class="section-header-row">
                  <td colspan="3">2. PEJABAT PENILAI</td>
                </tr>
                <tr>
                  <td class="bullet-cell">a.</td>
                  <td class="label-cell">Nama</td>
                  <td class="value-cell">: <strong>${penilaiNama}</strong></td>
                </tr>
                <tr>
                  <td class="bullet-cell">b.</td>
                  <td class="label-cell">NIK / NIP</td>
                  <td class="value-cell">: ${penilaiNip}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">c.</td>
                  <td class="label-cell">Pangkat/Golongan</td>
                  <td class="value-cell">: ${penilaiPangkat}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">d.</td>
                  <td class="label-cell">Jabatan/Pekerjaan</td>
                  <td class="value-cell">: ${penilaiJabatan}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">e.</td>
                  <td class="label-cell">Unit Kerja</td>
                  <td class="value-cell">: ${penilaiUnit}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td class="profile-col-cell profile-col-cell-3">
              <!-- ATASAN PEJABAT PENILAI -->
              <table class="profile-inner-table">
                <tr class="section-header-row">
                  <td colspan="3">3. ATASAN PEJABAT PENILAI</td>
                </tr>
                <tr>
                  <td class="bullet-cell">a.</td>
                  <td class="label-cell">Nama</td>
                  <td class="value-cell">: <strong>${atasanNama}</strong></td>
                </tr>
                <tr>
                  <td class="bullet-cell">b.</td>
                  <td class="label-cell">NIK / NIP</td>
                  <td class="value-cell">: ${atasanNip}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">c.</td>
                  <td class="label-cell">Pangkat/Golongan</td>
                  <td class="value-cell">: ${atasanPangkat}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">d.</td>
                  <td class="label-cell">Jabatan/Pekerjaan</td>
                  <td class="value-cell">: ${atasanJabatan}</td>
                </tr>
                <tr>
                  <td class="bullet-cell">e.</td>
                  <td class="label-cell">Unit Kerja</td>
                  <td class="value-cell">: ${atasanUnit}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Signatures Section -->
        <div class="signatures-section">
          <table class="signatures-table">
            <tr>
              <td style="width: 50%; text-align: center;">
                <div class="sig-date-line">Diterima Tanggal: ........................</div>
                <div class="sig-role">Pegawai UIKA Yang Dinilai,</div>
                <div class="sig-space"></div>
                <div class="sig-name">( ${dinilaiNama} )</div>
                <div class="sig-nip">NIP/NIK. ${dinilaiNip}</div>
              </td>
              <td style="width: 50%; text-align: center;">
                <div class="sig-date-line">Dibuat Tanggal: ........................</div>
                <div class="sig-role">${penilaiJabatan || "Pejabat Penilai"},</div>
                <div class="sig-space"></div>
                <div class="sig-name">( ${penilaiNama} )</div>
                <div class="sig-nip">NIP/NIK. ${penilaiNip}</div>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; padding-top: 30px;">
                <div class="sig-date-line">Diterima Tanggal: ........................</div>
                <div class="sig-role" style="margin-top: 5px;">Mengetahui,<br/>${atasanJabatan || "Atasan Pejabat Penilai"}</div>
                <div class="sig-space"></div>
                <div class="sig-name">( ${atasanNama} )</div>
                <div class="sig-nip">NIP/NIK. ${atasanNip}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      
      <script>
        // Auto trigger browser print dialog on load
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 300);
        });
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
};
