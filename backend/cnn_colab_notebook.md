# Notebook CNN untuk Klasifikasi Tumor Otak

Dokumen ini berisi kode Python yang dapat Anda **salin-tempel (copy-paste)** secara berurutan ke dalam sel-sel (cells) di Google Colab. Kode ini telah disesuaikan agar membaca dataset seolah-olah sudah berada di Google Colab.

---

## 1. Import needed libraries

Buat sel kode baru di Colab dan masukkan kode berikut untuk memuat semua pustaka yang dibutuhkan.

```python
import os
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models

print("TensorFlow version:", tf.__version__)
```

---

## 2. Preprocessing

### 2.1 Load data

Tentukan direktori dataset yang ada di Google Colab. (Asumsi: Anda telah meletakkan dataset dalam folder `/content/Dataset` di Colab).

```python
# Tentukan path direktori dataset yang ada di Google Colab
# Sesuaikan '/content/Dataset' jika Anda mengunggahnya dengan nama/lokasi berbeda
base_dir = '/content/Dataset' 
train_dir = os.path.join(base_dir, 'Training')
test_dir = os.path.join(base_dir, 'Testing')

# Parameter hiper (hyperparameters) untuk pemuatan data
BATCH_SIZE = 32
IMG_SIZE = (150, 150)
```

### 2.2 Split data into train, test, valid

Kita akan menggunakan `image_dataset_from_directory`. Karena kita butuh Validation set, kita akan membagi folder `Training` menjadi 80% Train dan 20% Validation. Folder `Testing` akan sepenuhnya menjadi data Uji (Test).

```python
# Memuat data training (80% dari folder Training)
train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    shuffle=True,
    batch_size=BATCH_SIZE,
    image_size=IMG_SIZE,
    validation_split=0.2,
    subset='training',
    seed=42
)

# Memuat data validation (20% dari folder Training)
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    shuffle=True,
    batch_size=BATCH_SIZE,
    image_size=IMG_SIZE,
    validation_split=0.2,
    subset='validation',
    seed=42
)

# Memuat data testing dari folder Testing
test_dataset = tf.keras.utils.image_dataset_from_directory(
    test_dir,
    shuffle=False,
    batch_size=BATCH_SIZE,
    image_size=IMG_SIZE
)

class_names = train_dataset.class_names
print("Nama-nama kelas (label):", class_names)
```

### 2.3 Data preprocessing

Kita akan mengoptimalkan pembacaan dataset untuk melancarkan proses antrean (pipeline) I/O. Tahap normalisasi (rescaling) 0-1 tidak dilakukan di sini, melainkan akan langsung dimasukkan (diintegrasikan) sebagai layer di dalam model (lihat tahap 3).

```python
# Konfigurasi performa agar pembacaan data lebih efisien secara otomatis
AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)
test_dataset = test_dataset.prefetch(buffer_size=AUTOTUNE)
```

### 2.4 Getting samples from data

Mari kita lihat 9 contoh gambar pertama beserta labelnya dari dataset training.

```python
plt.figure(figsize=(10, 10))
for images, labels in train_dataset.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")
plt.show()
```

---

## 3. Building Deep Learning Model

Kita akan membangun model Convolutional Neural Network (CNN). Perhatikan bahwa `layers.Rescaling` ditambahkan sebagai lapisan pertama untuk melakukan normalisasi piksel gambar ke rentang [0, 1].

```python
num_classes = len(class_names)

model = models.Sequential([
    # Tahap normalisasi gambar menjadi nilai 0-1 (Rescaling)
    layers.Rescaling(1./255, input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)),
    
    # Layer Konvolusi dan Pooling
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    # Flatten untuk meratakan array ke 1D sebelum masuk ke Dense layer
    layers.Flatten(),
    
    # Dense layer untuk klasifikasi
    layers.Dense(512, activation='relu'),
    layers.Dropout(0.5), # Mencegah overfitting
    layers.Dense(num_classes, activation='softmax') # Softmax karena multikelas
])

# Menampilkan ringkasan arsitektur model
model.summary()
```

---

## 4. Training

Sekarang kita akan mengkompilasi model dan melakukan proses pelatihan (training) menggunakan data training dan validation.

```python
# Kompilasi Model
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])

# Proses Pelatihan (Fit)
EPOCHS = 15
print("Memulai proses pelatihan model...")
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS
)
```

### 4.1 Visualize model performance

Setelah pelatihan selesai, buatlah grafik untuk melihat riwayat akurasi dan loss (kerugian) pada setiap *epoch*.

```python
# Mengambil riwayat metrik
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(EPOCHS)

# Membuat Plot
plt.figure(figsize=(14, 5))

# Grafik Akurasi
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy', linewidth=2)
plt.plot(epochs_range, val_acc, label='Validation Accuracy', linewidth=2)
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

# Grafik Loss
plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss', linewidth=2)
plt.plot(epochs_range, val_loss, label='Validation Loss', linewidth=2)
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')

plt.show()
```

---

## 5. Testing and Evaluation

### 5.1 Evaluate

Sekarang mari evaluasi model dengan data pengujian (`test_dataset`) untuk mendapatkan performa sesungguhnya pada data yang belum pernah dilihat model sebelumnya.

```python
print("Mengevaluasi model pada test dataset:")
test_loss, test_accuracy = model.evaluate(test_dataset)

print(f"\nAkurasi pada data uji (Test Accuracy): {test_accuracy * 100:.2f}%")
print(f"Loss pada data uji (Test Loss): {test_loss:.4f}")
```

### 5.2 Testing

Terakhir, kita akan mengambil satu *batch* data dari data pengujian dan melakukan prediksi secara langsung, lalu menampilkan gambarnya beserta tebakan model dibandingkan label aslinya.

```python
# Melakukan prediksi pada 1 batch sampel test dataset
for test_images, test_labels in test_dataset.take(1):
    predictions = model.predict(test_images)
    break

# Visualisasikan 9 hasil prediksi
plt.figure(figsize=(12, 12))
for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    
    # Ambil nilai probabilitas tertinggi sebagai tebakan kelas
    predicted_class = np.argmax(predictions[i])
    actual_class = test_labels[i].numpy()
    
    # Tampilkan gambar
    plt.imshow(test_images[i].numpy().astype("uint8"))
    
    # Beri warna hijau jika tebakan benar, merah jika salah
    title_color = "green" if predicted_class == actual_class else "red"
    
    plt.title(f"Tebakan: {class_names[predicted_class]}\nAsli: {class_names[actual_class]}", 
              color=title_color)
    plt.axis("off")

plt.tight_layout()
plt.show()
```
