import keras
print("Loading Keras 3 model...")
model = keras.models.load_model('backend/BrainTumorModel.h5')
print("Exporting to SavedModel format...")
model.export('backend/saved_model_tfjs')
print("Export complete!")
