export default async (text: string, derivedKey: CryptoKey): Promise<string> => {
  try {
    const string = atob(text);

    const uintArray = new Uint8Array(
      Array.from(string).map((char) => char.charCodeAt(0))
    );

    const algorithm = {
      name: "AES-GCM",
      iv: new TextEncoder().encode("Initialization Vector"),
    };

    const decryptedData = await window.crypto.subtle.decrypt(
      algorithm,
      derivedKey,
      uintArray
    );

    return new TextDecoder().decode(decryptedData);
  } catch (e) {
    return `error decrypting message: ${e}`;
  }
};
