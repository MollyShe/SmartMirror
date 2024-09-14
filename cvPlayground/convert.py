import tensorflow as tf
import tf2onnx
import onnx

# Load the model
model = tf.keras.models.load_model('model/handClassifier/keypoint_classifier.keras')
model.output_names = ["output"]
# Convert Keras model to ONNX
spec = (tf.TensorSpec((1, 42), tf.float32, name="input"),)
output_path = 'model/handClassifier/keypoint_classifier.onnx'
model_proto, _ = tf2onnx.convert.from_keras(model, input_signature=spec, opset=13)

# Save ONNX model
onnx.save_model(model_proto, output_path)
