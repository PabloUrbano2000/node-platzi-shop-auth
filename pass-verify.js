const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$wJpvrkm47/vuxE8W5aDJa.yoNqqnSdTxww5Snp/c/v6GIjyF1.Zqi';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
