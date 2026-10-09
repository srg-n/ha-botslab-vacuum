"""QUC login cryptographic primitives for Botslab."""
from __future__ import annotations

import base64
import hashlib
import json
import logging
import os
import random
import string
import urllib.parse

_LOGGER = logging.getLogger(__name__)
_ALPHANUM = string.ascii_letters + string.digits

# --- Standard DES Tables & Implementation in Pure Python ---
_PC1 = [
    56, 48, 40, 32, 24, 16, 8,
    0, 57, 49, 41, 33, 25, 17,
    9, 1, 58, 50, 42, 34, 26,
    18, 10, 2, 59, 51, 43, 35,
    62, 54, 46, 38, 30, 22, 14,
    6, 61, 53, 45, 37, 29, 21,
    13, 5, 60, 52, 44, 36, 28,
    20, 12, 4, 27, 19, 11, 3
]
_PC2 = [
    13, 16, 10, 23, 0, 4,
    2, 27, 14, 5, 20, 9,
    22, 18, 11, 3, 25, 7,
    15, 6, 26, 19, 12, 1,
    40, 51, 30, 36, 46, 54,
    29, 39, 50, 44, 32, 47,
    43, 48, 38, 55, 33, 52,
    45, 41, 49, 35, 28, 31
]
_SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1]
_IP = [
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8, 0,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6
]
_FP = [
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25,
    32, 0, 40, 8, 48, 16, 56, 24
]
_E = [
    31, 0, 1, 2, 3, 4,
    3, 4, 5, 6, 7, 8,
    7, 8, 9, 10, 11, 12,
    11, 12, 13, 14, 15, 16,
    15, 16, 17, 18, 19, 20,
    19, 20, 21, 22, 23, 24,
    23, 24, 25, 26, 27, 28,
    27, 28, 29, 30, 31, 0
]
_P = [
    15, 6, 19, 20, 28, 11, 27, 16,
    0, 14, 22, 25, 4, 17, 30, 9,
    1, 7, 23, 13, 31, 26, 2, 8,
    18, 12, 29, 5, 21, 10, 3, 24
]
_SBOX = [
    [
        14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
        0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
        4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
        15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
    ],
    [
        15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
        3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
        0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
        13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
    ],
    [
        10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
        13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
        13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
        1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
    ],
    [
        7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
        13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
        10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
        3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
    ],
    [
        2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
        14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
        4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
        11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
    ],
    [
        12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
        10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
        9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
        4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
    ],
    [
        4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
        13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
        1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
        6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
    ],
    [
        13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
        1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
        7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
        2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
    ]
]


def _bytes_to_bits(b: bytes) -> list[int]:
    bits = []
    for byte in b:
        for i in range(7, -1, -1):
            bits.append((byte >> i) & 1)
    return bits


def _bits_to_bytes(bits: list[int]) -> bytes:
    res = bytearray()
    for i in range(0, len(bits), 8):
        byte = 0
        for bit in bits[i : i + 8]:
            byte = (byte << 1) | bit
        res.append(byte)
    return bytes(res)


def _permute(bits: list[int], table: list[int]) -> list[int]:
    return [bits[pos] for pos in table]


def _des_generate_subkeys(key_bytes: bytes) -> list[list[int]]:
    key_bits = _bytes_to_bits(key_bytes)
    pc1_bits = _permute(key_bits, _PC1)
    c, d = pc1_bits[:28], pc1_bits[28:]
    subkeys = []
    for shift in _SHIFTS:
        c = c[shift:] + c[:shift]
        d = d[shift:] + d[:shift]
        subkeys.append(_permute(c + d, _PC2))
    return subkeys


def _des_round(r: list[int], subkey: list[int]) -> list[int]:
    expanded = _permute(r, _E)
    xored = [a ^ b for a, b in zip(expanded, subkey)]
    output_bits = []
    for i in range(8):
        chunk = xored[i * 6 : (i + 1) * 6]
        row = (chunk[0] << 1) | chunk[5]
        col = (chunk[1] << 3) | (chunk[2] << 2) | (chunk[3] << 1) | chunk[4]
        val = _SBOX[i][row * 16 + col]
        for b in range(3, -1, -1):
            output_bits.append((val >> b) & 1)
    return _permute(output_bits, _P)


def _des_block(block_bytes: bytes, subkeys: list[list[int]]) -> bytes:
    bits = _permute(_bytes_to_bits(block_bytes), _IP)
    l, r = bits[:32], bits[32:]
    for subkey in subkeys:
        f = _des_round(r, subkey)
        new_r = [a ^ b for a, b in zip(l, f)]
        l, r = r, new_r
    return _bits_to_bytes(_permute(r + l, _FP))


def des_cbc_encrypt(data: bytes, key: bytes, iv: bytes) -> bytes:
    """DES CBC PKCS#7 encryption."""
    subkeys = _des_generate_subkeys(key)
    pad = 8 - (len(data) % 8)
    padded = data + bytes([pad]) * pad
    out = bytearray()
    prev = iv
    for i in range(0, len(padded), 8):
        block = padded[i : i + 8]
        xored = bytes(a ^ b for a, b in zip(block, prev))
        enc = _des_block(xored, subkeys)
        out.extend(enc)
        prev = enc
    return bytes(out)


def des_cbc_decrypt(data: bytes, key: bytes, iv: bytes) -> bytes:
    """DES CBC PKCS#7 decryption."""
    subkeys = _des_generate_subkeys(key)[::-1]
    out = bytearray()
    prev = iv
    for i in range(0, len(data), 8):
        block = data[i : i + 8]
        dec = _des_block(block, subkeys)
        xored = bytes(a ^ b for a, b in zip(dec, prev))
        out.extend(xored)
        prev = block
    pad = out[-1]
    if pad < 1 or pad > 8:
        raise ValueError(f"Invalid PKCS padding: {pad}")
    return bytes(out[:-pad])


# --- RSA PKCS1 Encryption ---
def rsa_encrypt_pkcs1(plaintext: bytes, pubkey_b64: str) -> bytes:
    """Encrypt plaintext using RSA public key with PKCS#1 v1.5 padding."""
    der = base64.b64decode(pubkey_b64)
    # Parse SubjectPublicKeyInfo DER to extract modulus (n) and exponent (e)
    # Standard format: SEQUENCE { SEQUENCE { OID, NULL }, BIT STRING { SEQUENCE { INTEGER n, INTEGER e } } }
    idx = der.find(b"\x02\x81\x81\x00")
    if idx != -1:
        n_bytes = der[idx + 4 : idx + 4 + 128]
        idx2 = idx + 4 + 128
        assert der[idx2] == 0x02
        e_len = der[idx2 + 1]
        e_bytes = der[idx2 + 2 : idx2 + 2 + e_len]
        n = int.from_bytes(n_bytes, "big")
        e = int.from_bytes(e_bytes, "big")
    else:
        # Fallback to known Qihoo QUC RSA 1024-bit modulus
        n = int(
            "bda0d6470d7c86c4d35f0617e4ffe580b635444f5b0b590ada0c12c7774f36d4ec38ca9ea9fb3bc707ac9749412ddbf94b556ed0d3f4551eec67c2d83a70a61d0c89ea3339d22c82a35cf91de837dfb7c9f3f2f90e752525cd0b44dd3e1dbda6a06c7efa941181db0b8b34e5740f651c532bd1bb6a6e2ad623803366fced1aa5",
            16,
        )
        e = 65537

    k = 128  # 1024 bits = 128 bytes
    m_len = len(plaintext)
    if m_len > k - 11:
        raise ValueError(f"Message too long for RSA 1024: {m_len} bytes")

    ps_len = k - m_len - 3
    ps = bytearray()
    while len(ps) < ps_len:
        b = os.urandom(1)[0]
        if b != 0:
            ps.append(b)

    em = b"\x00\x02" + bytes(ps) + b"\x00" + plaintext
    m_int = int.from_bytes(em, "big")
    c_int = pow(m_int, e, n)
    return c_int.to_bytes(k, "big")


def md5_hex(text: str) -> str:
    """Lowercase hex MD5 of a UTF-8 string."""
    return hashlib.md5(text.encode("utf-8")).hexdigest()


def rand_str(n: int, alphabet: str = _ALPHANUM) -> str:
    """Generate a random alphanumeric string."""
    return "".join(random.choice(alphabet) for _ in range(n))


def gen_key_material() -> str:
    """Generate random 117-char string (last 8 chars form DES key & iv)."""
    return rand_str(117)


def des_key_from_material(a117: str) -> bytes:
    """Derive 8-byte DES key/iv from key material."""
    return a117[-8:].encode("utf-8")


def compute_sig(params: dict[str, str], msigkey: str) -> str:
    """Compute QUC MD5 signature."""
    concat = "".join(f"{k}={params[k]}" for k in sorted(params) if k != "sig")
    return md5_hex(concat + msigkey)


def encrypt_params(params: dict[str, str], a117: str) -> str:
    """DES-encrypt urlencoded params and return base64 string."""
    key = des_key_from_material(a117)
    plaintext = urllib.parse.urlencode(params).encode("utf-8")
    enc = des_cbc_encrypt(plaintext, key, key)
    return base64.b64encode(enc).decode("utf-8")


def encrypt_key_material(a117: str, pubkey_b64: str) -> str:
    """RSA-encrypt key material and return base64 string."""
    enc = rsa_encrypt_pkcs1(a117.encode("utf-8"), pubkey_b64)
    return base64.b64encode(enc).decode("utf-8")


def decrypt_response(ret_b64: str, a117: str) -> dict:
    """Decrypt QUC response and parse as JSON."""
    key = des_key_from_material(a117)
    ciphertext = base64.b64decode(ret_b64)
    dec = des_cbc_decrypt(ciphertext, key, key)
    return json.loads(dec.decode("utf-8"))
