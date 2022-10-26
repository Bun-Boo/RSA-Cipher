let p, q, e;
let m;
let c;
let kua;
let kra;
let n;
let fi;
let d;
function isPrimeNumber(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i == 0) return false;
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function checkValid() {
  p = document.getElementById("input_p").valueAsNumber;
  q = document.getElementById("input_q").valueAsNumber;
  e = document.getElementById("input_e").valueAsNumber;
  if (!p || !q || !e) return false;
  kua = document.getElementById("input_kua");
  kra = document.getElementById("input_kra");
  n = p * q;
  fi = (p - 1) * (q - 1);
  if (!isPrimeNumber(p)) return false;
  if (!isPrimeNumber(q)) return false;
  if (!isPrimeNumber(p)) return false;
  if (e <= 1 || e >= fi) return false;
  if (gcd(e, fi) !== 1) return false;
  return true;
}

function generate() {
  if (!checkValid()) return;
  kua.value = `{${e}:${n}}`;
  for (let i = 0; i < fi; i++) {
    if ((e * i) % fi == 1) {
      d = i;
      break;
    }
  }
  kra.value = `{${d}:${n}}`;
}

function encrypt() {
  m = document.getElementById("input_m").valueAsNumber;
  if (m) {
    document.getElementById("output-encrypt").innerHTML = Math.pow(m, e) % n;
  }
}

function decrypt() {
  // c = document.getElementById("input_c").valueAsNumber;
  // console.log(c, d, n, BigInt(74).modPow(51, 123));
  // if (c) {
  //   document.getElementById("output-decrypt").innerHTML =
  //     BigInt(c ** d) % BigInt(n);
  // }
  phantich(2, 173, 323);
}

function phantich(x, e, n) {
  let i = Math.floor(Math.log2(e));
  let arr = [];
  while (e > 0) {
    arr.push(2 ** i);
    e -= 2 ** i;
    while (e - 2 ** i < 0) i--;
  }
  arr = arr.reverse();
  console.log(arr);
  let arrMod = [];
  for (let i = 0; i <= Math.log2(arr[arr.length - 1]); i++) {
    // if (x ** arr[i] % n === x ** arr[i]) arrMod.push(x ** arr[i] % n);
    if (i === 0) arrMod.push(x ** arr[i] % n);
    else {
      arrMod.push(arrMod[i - 1] ** 2 % n);
    }
  }
  console.log(arrMod);
}
