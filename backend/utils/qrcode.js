import QRCode from 'qrcode';

export const generateQRCode = async (text) => {
  try {
    const qrCode = await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    return qrCode;
  } catch (error) {
    throw new Error('QR Code generation failed');
  }
};

export const generateQRCodeForMenu = async (baseUrl) => {
  const menuUrl = `${baseUrl}/menu`;
  return generateQRCode(menuUrl);
}; 