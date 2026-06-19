import os
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf

# Inisialisasi aplikasi Flask
app = Flask(__name__)
CORS(app)

# Konfigurasi Model
MODEL_PATH = 'BrainTumorModel.h5'
IMG_SIZE = (150, 150) # Harus sama dengan ukuran saat training

# Daftar kelas berdasarkan urutan folder dataset (biasanya alfabetis)
CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']

# Muat model secara global agar tidak perlu dimuat ulang setiap ada request
print(f"Memuat model dari {MODEL_PATH}...")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model berhasil dimuat!")
except Exception as e:
    print(f"Gagal memuat model: {e}")
    model = None

def preprocess_image(image_bytes):
    """
    Fungsi untuk memproses gambar agar sesuai dengan input model
    """
    # Buka gambar menggunakan PIL
    img = Image.open(io.BytesIO(image_bytes))
    
    # Konversi ke RGB (jika gambar grayscale atau memiliki alpha channel)
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    # Resize gambar sesuai input model
    img = img.resize(IMG_SIZE)
    
    # Konversi ke array numpy
    img_array = np.array(img)
    
    # Tambahkan dimensi batch (karena model menerima input berupa batch)
    # Shape berubah dari (150, 150, 3) menjadi (1, 150, 150, 3)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "Brain Tumor Classification API is running. Gunakan endpoint /predict untuk klasifikasi."
    })

@app.route('/predict', methods=['POST'])
def predict():
    # Pastikan model berhasil dimuat sebelumnya
    if model is None:
        return jsonify({"status": "error", "message": "Model tidak tersedia."}), 500

    # Cek apakah ada file dalam request
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "Tidak ada file gambar yang dikirimkan."}), 400
        
    file = request.files['file']
    
    # Cek apakah nama file kosong
    if file.filename == '':
        return jsonify({"status": "error", "message": "Tidak ada gambar yang dipilih."}), 400

    try:
        # Baca byte gambar
        image_bytes = file.read()
        
        # Preprocessing gambar
        processed_image = preprocess_image(image_bytes)
        
        # Lakukan prediksi
        predictions = model.predict(processed_image)
        
        # Dapatkan index dengan nilai probabilitas tertinggi
        predicted_class_index = np.argmax(predictions[0])
        predicted_class_name = CLASS_NAMES[predicted_class_index]
        
        # Dapatkan nilai probabilitasnya (confidence score)
        confidence = float(predictions[0][predicted_class_index])
        
        # Kembalikan response JSON
        return jsonify({
            "status": "success",
            "prediction": predicted_class_name,
            "confidence": f"{confidence * 100:.2f}%",
            "all_scores": {CLASS_NAMES[i]: float(predictions[0][i]) for i in range(len(CLASS_NAMES))}
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Jalankan server di port 8080 untuk menghindari konflik
    app.run(host='0.0.0.0', port=8080, debug=True)
